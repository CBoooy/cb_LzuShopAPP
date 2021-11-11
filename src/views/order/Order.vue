<template>
  <div class="order">

    <div class="order__shopName" v-show="!!shopsid">商店：{{shopsid}}</div>
    <div
      class="order__item"
      v-for="item in dataList"
    >
      <img
        :src="item.imgUrl"
        class="order__item__img"
      >

      <div class="order__item__price">
        <div class="order__item__price__name">{{item.name}}</div>
        <div class="order__item__price__total">
          <span
            class="priceAndCount">￥{{item.price}} x {{item.count}}</span>
          <span
            class="totalPrice">￥{{Number.parseFloat(item.price)*Number.parseFloat(item.count)}}</span>
        </div>

      </div>
    </div>

  </div>

</template>

<script>
  import Axios from 'axios';

  export default {
    name: 'Order',
    props: ['dataList', 'shopsid'],
    setup(props) {
      // let { ref } = require('vue');
      // let shopsname = ref('')
      // Axios({
      //   method: 'get',
      //   url: `https://www.fastmock.site/mock/6ce9d2ceaed88cae5a13592139cd7aaa/study/shop/shops/${props.shopsid}`
      // }).then((v) => {
      //   shopsname.value = v.data.data[0].name
      // })

      // console.log('打印order组件的datalist看看：',props.dataList);

      // return { shopsname } 

    }
  }
</script>

<style
  lang='scss'
  scoped
>
  .order {
    margin: 0.16rem .18rem;
    box-sizing: border-box;
    padding: .16rem;
    background: #ffffff;

    text-decoration: none;


    .order__shopName {
      line-height: .22rem;
      font-size: .16rem;
      color: #333333;
      font-weight: bold;
    }

    .order__item {
      margin: .16rem 0;
      display: flex;

      &__img {
        width: .46rem;
        height: .46rem;
        margin-right: .16rem;

      }

      &__price {
        flex-grow: 1;

        &__name {
          line-height: .2rem;
          font-size: .14rem;
          color: #333333;
        }

        &__total {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin: .06rem 0;

          .priceAndCount{
            color: #E93B3B;
          }


        }
      }
    }

    .order__shrink {
      margin: .16rem .16rem 0 .16rem;
      text-align: center;
      background: #F5F5F5;
      line-height: .28rem;
      font-size: .14rem;
      color: #999999;

      .iconfont {
        margin-left: .08rem;
        position: relative;
        top: .02rem;

      }
    }
  }
</style>
