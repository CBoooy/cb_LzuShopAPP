<template>
  <div>

    <div
      :class="{mask:isMaskAndTrolleyShow}"
      @click='cartHandle'
    ></div>
    <div
      class="trolley"
      v-show="isMaskAndTrolleyShow"
    >
      <div class="trolley__title">
        <div
          class="trolley__title__icon iconfont "
          @click='handleAllChecked()'
        >
          <span :class="{i2:true,isAll:isAll}">&#xe668;</span> 全选
        </div>
        <div
          class="trolley__title__clear"
          @click='clearCart'
        >清空购物车</div>

      </div>
      <div class="trolley__right">

        <div class="trolley__right__items">
          <div
            class="trolley__right__items__item"
            v-for=" item  in dataList.items"
            :key="item._id"
          >
            <div class="trolley__right__items__item__icon iconfont ">
              <span
                :class="{i2:getChecked(item)}"
                @click='handleChecked(item)'
              >&#xe668;</span>
            </div>
            <img
              :src="item.imgUrl"
              class="trolley__right__items__item__img"
            />
            <div class="item__show">
              <div class="item__show__name">
                {{ item.name }}
              </div>
              <div class="item__show__price">
                <span
                  class="item__show__price__now">${{ item.price }}</span>
                <span
                  class="item__show__price__pre">${{ item.oldPrice }}</span>
                <span class="item__show__price__num">
                  <span
                    class="dec iconfont"
                    @click="decrease(item)"
                  >&#xe611;</span>
                  <span class="number">
                    {{item.count}}
                  </span>
                  <span
                    class="inc iconfont"
                    @click="increase(item)"
                  >&#xe61d;</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cart">

      <div
        class="cart__total"
        @click=" cartHandle"
      >
        <div class="cart__total__imgbox">
          <img
            src="../../images/basket@2x.png"
            class="cart__total__imgbox__img"
          >
          <span :class="{'cart__total__imgbox__tip':isShow,
          'cart__total__imgbox__tip2':!isShow}">
            {{allCount}}</span>
        </div>
        <div class="cart__total__price">总计：

          <span class="allPrice">￥{{allPrice}}</span>


        </div>
      </div>
      <div
        class="cart__settle"
        v-if="allPrice !== 0"
      >
        <router-link :to="{path:`/orderConfirm/${shopsid}`}">
          去结算
        </router-link>
      </div>

    </div>
  </div>


</template>

<script>
  import { useStore } from 'vuex';

  let LinkGoodsCount = (params) => {
    let { ref, reactive, watch, getCurrentInstance } = require(
      'vue');
    let { shopsid } = params;
    let store2 = useStore();
    let allCount = ref();
    let allPrice = ref();
    let isShow = ref(false);
    let dataList = reactive({
      items: []
    })

    // 实验watch的用法

    watch(store2.state.cart, (newV, oldV) => {
      dataList.items = [];
      allCount.value = 0
      allPrice.value = 0
      if(!newV){
        return 

        // 如果没有这一步，
      }

      for (let item in newV[shopsid]) {
        dataList.items.push(newV[shopsid][item])
        allCount.value += newV[shopsid][item].count;
        if (newV[shopsid][item].checked === true || typeof newV[
            shopsid][item].checked === 'undefined') {
          // 为什么要判断是否为undefined？
          // 因为，第一次将goods数据加入cart中，是没有checked属性的。
          // 因此，需要判断。
          allPrice.value += (newV[shopsid][item].count * newV[
            shopsid][item].price)

        }
      }
      // setsessionStorage(store2.state)

      if (allCount.value === 0) {
        isShow.value = false;
      } else {
        isShow.value = true;
      }
    }, {
      deep: true,
      immediate: true
    });
 
    

    let increase = (goodsMessage) => {
      store2.commit('increaseCount', {
        shops: shopsid,
        goodsMessage: goodsMessage
      });

    };
    let decrease = (goodsMessage) => {
      store2.commit('decreaseCount', {
        shops: shopsid,
        goodsMessage
      });
    };

    // getsessionStorage();
    return {
      increase, //点击增加
      decrease, //点击减少 
      isShow, //是否显示红标
      allCount, //所有的加入购物车的商品总数
      allPrice, //计算总价
      dataList, //当前商店中的商品列表


    };
  };

  let linkChecked = (parmas) => {
    let { shopsid } = parmas;
    let store2 = useStore();
    let { ref } = require('vue')
    let isAll = ref(true);
    let isChecked = ref(true)
    let isMaskAndTrolleyShow = ref(false)

    let handleChecked = (item) => {
      store2.commit('handleChecked', {
        shopsid,
        goodsMessage: item,
        isChecked,
      })
    }

    let getChecked = (item) => {
      return store2.getters.getChecked({
        shopsid,
        goodsMessage: item
      })
    }
    let handleAllChecked = () => {
      store2.commit('handleAllChecked', {
        shopsid,
        isAll
      })
    }

    let clearCart = () => {
      store2.commit('clearCart', {
        shopsid,
      })
    }


    let cartHandle = () => {
      isMaskAndTrolleyShow.value = !isMaskAndTrolleyShow.value;
    }

    return {
      handleChecked,
      getChecked,
      handleAllChecked,
      isAll,
      isMaskAndTrolleyShow,
      clearCart,
      cartHandle
    }
  }

  export default {
    name: 'Cart',
    props: ['shopsid', ],
    setup(props) {
      let shopsid = props.shopsid;

      let {
        increase, //点击增加
        decrease, //点击减少 
        isShow, //是否显示红标
        allCount, //所有的加入购物车的商品总数
        allPrice, //计算总价
        dataList, //当前商店中的商品列表


      } = LinkGoodsCount({ shopsid: shopsid });

      let {
        handleChecked, //点击勾勾，取消勾勾
        getChecked, //获取当前商品是否被勾勾
        handleAllChecked, //全选，取消全选
        clearCart, //清空购物车
        isAll, //一个boolean，用来控制全选的那个勾勾的class,
        isMaskAndTrolleyShow,
        cartHandle
      } = linkChecked({ shopsid: shopsid, });

      return {
        // 这排数据用来控制勾勾
        handleChecked, //点击勾勾，取消勾勾
        getChecked, //获取当前商品是否被勾勾
        handleAllChecked, //全选，取消全选
        clearCart, //清空购物车
        isAll, //一个boolean，用来控制全选的那个勾勾的class,
        isMaskAndTrolleyShow,
        cartHandle,

        // 这牌数据用来控制购物车中的数据
        increase, //点击增加
        decrease, //点击减少 
        isShow, //是否显示红标
        allCount, //所有的加入购物车的商品总数
        allPrice, //计算总价
        dataList, //当前商店中的商品列表

      }
    },



  }
</script>

<style
  lang='scss'
  scoped
>
  .mask {
    background: rgba(0, 0, 0, 0.50);
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 2;
  }

  .cart {
    position: absolute;
    z-index: 3;
    bottom: 0;
    left: 0;
    right: 0;
    height: .5rem;
    display: flex;
    outline: 1px solid #4FB0F9;
    background: #ffffff;


    &__total {
      flex-grow: 1;
      display: flex;

      &__imgbox {
        margin: .11rem .32rem 0 .24rem;
        position: relative;

        &__img {
          width: .28rem;
          height: .26rem;
        }

        &__tip {
          display: block;
          width: 1rem;
          height: 1rem;
          line-height: 1rem;
          background: red;
          color: #ffffff;
          text-align: center;
          border-radius: 50% 50%;
          font-size: .8rem;
          transform: scale(10%, 10%);
          transform-origin: top right;
          position: absolute;
          top: -.05rem;
          right: -.05rem;

        }

        &__tip2 {
          display: none;
        }
      }


      &__price {
        line-height: .5rem;
        font-size: .12rem;
        color: #333333;

        .allPrice {
          font-size: .18rem;
          color: #E93B3B;
        }


      }
    }

    &__settle {
      flex-shrink: 0;
      flex-basis: 1rem;
      line-height: .5rem;
      font-size: .14rem;
      text-align: center;
      background: #4FB0F9;


      a {
        color: #FFFFFF;
        text-decoration: none;
      }

    }

  }

  .trolley {
    position: absolute;
    z-index: 3;
    bottom: .5rem;
    left: 0;
    right: 0;
    /* border-bottom: solid 1px #4FB0F9; */
    background: #ffffff;

    &__title {
      line-height: .52rem;
      display: flex;
      border-bottom: 1px solid #F1F1F1;

      &__icon {
        width: .7rem;
        text-align: center;
        font-size: .14rem;
        color: #333333;

        .i2 {
          position: relative;
          top: .03rem;

          font-size: .2rem;
          margin-right: .03rem;


        }

        .isAll {
          color: #4FB0F9;
        }
      }

      &__clear {
        padding-right: .18rem;
        flex-grow: 1;
        text-align: right;
        font-size: .14rem;
      }

    }

    &__right__items {

      &__item {
        margin: .16rem 0 0.16rem 0;
        display: flex;

        &__icon {
          line-height: .46rem;
          width: .54rem;
          text-align: center;
          font-size: .2rem;
        }

        .i2 {
          color: #4FB0F9;
        }


        &__img {
          width: 0.46rem;
          height: 0.46rem;
          margin-right: 0.16rem;
        }

        .item__show {
          width: 100%;
          overflow: hidden;

          &__name {
            width: 100%;
            font-size: 0.14rem;
            line-height: 0.2rem;
            color: #333333;
            margin-bottom: 0.06rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          &__count {
            font-size: 0.12rem;
            line-height: 0.16rem;
            color: #333333;
            margin-bottom: 0.06rem;
          }

          &__price {
            position: relative;

            &__now {
              font-size: 0.14rem;
              font-weight: bold;
              color: #e97d3f;
              margin-right: 0.06rem;
            }

            &__pre {
              font-size: 10px;
              color: #999999;
              text-decoration: line-through;
            }

            &__num {
              position: absolute;
              right: .18rem;
              bottom: -0.04rem;
              color: #666666;

              .dec {
                font-size: 0.25rem;
                padding: 0;
                padding-right: 0.05rem;
              }

              .number {
                font-size: 0.14rem;
                position: relative;
                bottom: 0.04rem;
              }

              .inc {
                font-size: 0.25rem;
                padding: 0;
                padding-left: 0.05rem;
                color: #0091ff;
              }
            }
          }
        }
      }
    }

  }
</style>
