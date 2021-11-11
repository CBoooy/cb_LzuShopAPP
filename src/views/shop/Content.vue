<template>
  <div class="content">
    <div class="content__left">
      <div
        v-for="(item, index) in category"
        :class="{
          content__left__item: true,
          'content__left__item--active': isLight === item.tag
        }"
        :key="index"
        @click="handleCategory(item.tag)"
      >
        {{ item.name }}
      </div>
    </div>

    <div class="content__right">
      <div class="content__right__items">
        <div
          class="content__right__items__item"
          v-for="item in dataList.item"
          :key="item._id"
        >
          <img
            :src="item.imgUrl"
            class="content__right__items__item__img"
          />
          <div class="item__show">
            <div class="item__show__name">
              {{ item.name }}
            </div>
            <div class="item__show__count">月售{{ item.sales }}件</div>
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
                  <!-- {{getCount(item)}} -->
                  {{ data.cart?.[shopsid]?.[item._id]?.count || 0 }}
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
</template>

<script>
  import Axios from 'axios';
  import { useStore } from 'vuex';

  let LinkGoodsCount = () => {
    let { ref, reactive, getCurrentInstance } = require('vue');
    let { ctx } = getCurrentInstance();

    let shops = ctx.$root.$route.params.id;
    let increase = (goodsMessage) => {
      ctx.$root.$store.commit('increaseCount', {
        shops: shops,
        goodsMessage: goodsMessage
      });
    };
    let decrease = (goodsMessage) => {
      ctx.$root.$store.commit('decreaseCount', {
        shops,
        goodsMessage
      });
    };
    let getCount = (goodsMessage) => {
      ctx.$root.$store.commit('getCount', {
        shops: shops,
        goodsMessage: goodsMessage
      });
    };
    return {
      // 商品count++
      increase,
      // 商品count--
      decrease,
      getCount
    };
  };



  export default {
    name: 'Content',
    setup(props, context) {
      let store2 = useStore();
      let { ref, reactive, getCurrentInstance } = require('vue');
      let { ctx } = getCurrentInstance();

      let { increase, decrease, getCount } = LinkGoodsCount();
      let data = reactive({ cart: store2.state.cart });
      let shopsid = ref(ctx.$root.$route.params.id);

      let dataList = reactive({
        item: []
      });
      let category = reactive([
      {
        name: '全部商品',
        tag: 'all'
      },
      {
        name: '秒杀',
        tag: 'seckill'
      },
      {
        name: '新鲜水果',
        tag: 'fruit'
      },
      {
        name: '休闲零食',
        tag: 'snacks'
      },
      {
        name: '蔬菜',
        tag: 'vegetable'
      },
      {
        name: '肉蛋奶',
        tag: 'milk'
      }]);


      Axios({
        method: 'get',
        url: `https://www.fastmock.site/mock/6ce9d2ceaed88cae5a13592139cd7aaa/study/shop/shops/:id/products?tab=all`
      }).then((v) => {
        if (v.data.error === 0 && v.data.data.length !== 0) {
          dataList.item = v.data.data;
        }
      });
      
      let isLight = ref('all');
      let handleCategory = (tag) => {
        isLight.value = tag;
        Axios({
          method: 'get',
          url: `https://www.fastmock.site/mock/6ce9d2ceaed88cae5a13592139cd7aaa/study/shop/shops/:id/products?tab=${tag}`
        }).then((v) => {
          if (v.data.error === 0 && v.data.data.length !== 0) {
            dataList.item = v.data.data;
          }
        });
      };

      return {
        dataList,
        category,
        isLight,
        handleCategory,
        // getCount,
        increase,
        decrease,
        data,
        shopsid
      };
    }
  };
</script>

<style
  lang="scss"
  scoped
>
  .content {
    display: flex;
    position: absolute;
    top: 1.7rem;
    bottom: 0.5rem;
    right: 0;
    left: 0;

    &__left {
      width: 0.76rem;
      flex-shrink: 0;
      background: #f5f5f5;
      overflow-y: scroll;

      &__item {
        line-height: 0.4rem;
        text-align: center;
        font-size: 0.14rem;
        color: #333333;

        &--active {
          background: #ffffff;
        }
      }
    }

    &__right {
      flex-grow: 1;
      margin: 0 0.18rem 0 0.16rem;
      overflow-y: scroll;

      &__items {
        &__item {
          margin: 0.12rem 0 0 0;
          padding-bottom: 0.12rem;
          border-bottom: 0.01rem solid #f1f1f1;
          display: flex;

          &__img {
            width: 0.68rem;
            height: 0.68rem;
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
                right: 0;
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
  }
</style>
