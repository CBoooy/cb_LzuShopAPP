<template>
  <div v-show="isShowToast">

    <div class="mask"></div>
    <div class="toast">
      <div class="toast__one">确认要离开收银台？</div>
      <div class="toast__two">请尽快完成支付，否则将被取消</div>
      <div class="toast__button">

        <div
          class="cancel"
          @click="cancelOrder"
        >取消订单</div>
        <div
          class="confirm"
          @click="confirmOrder"
        >确认支付</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Axios from 'axios';
  import { useStore } from 'vuex';
  import {useRouter} from 'vue-router'

  // import postOrder from '../../publicjs/postOrder.js'
  let linkButton = (props) => { 
    let store2 = useStore();
    let router2 = useRouter();
    let cancelOrder = () => {
       router2.back()
    }

    let confirmOrder = () => {
      // let postOrder = async () => {
      //   let result = await Axios({
      //     method: 'post',
      //     url: `https://www.fastmock.site/mock/6ce9d2ceaed88cae5a13592139cd7aaa/study/order`,
      //     params: {
      //       name: 'cboy'
      //     }
      //   })
      //   if (result.data.error === 0) {


      //     let clearCart = () => {
      //       store2.commit('clearCart', {
      //         shopsid: props.shopsid
      //       })
      //     }
      //     clearCart()
      //     ctx.$root.$router.back()

      //   }

      // }
      // postOrder()

      // 上面这一堆，是写给order的post接口的

      // 下面这一堆，是用vuex模拟服务器的。

      let orderIdentifier = Math.floor(Math.random()*10000)
      store2.commit('commitOrder', {
        orders: props.dataList.item,
        shopsid: props.shopsid,
        orderIdentifier,
      })
      let clearCart = () => {
        store2.commit('clearCart', {
          shopsid: props.shopsid
        })
      }
      clearCart()

      router2.push({
        name:'orderList'
      })
      


    }
    return {
      cancelOrder,
      confirmOrder
    }
  }

  export default {
    name: 'BackToast',
    props: ['isShowToast', 'shopsid', 'dataList'],
    setup(props) {

      let {
        cancelOrder,
        confirmOrder
      } = linkButton(props);

      return {
        cancelOrder,
        confirmOrder
      }
    }
  }
</script>

<style
  lang='scss'
  scoped
>
  .mask {
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.50);
  }

  .toast {
    position: absolute;
    z-index: 3;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background: #ffffff;
    border-radius: .04rem;
    width: 3rem;
    height: 1.57rem;

    &__one {
      line-height: .25rem;
      font-size: .18rem;
      font-weight: bold;
      text-align: center;
      margin: .24rem 0 .08rem 0;
    }

    &__two {
      line-height: .2rem;
      font-size: .14rem;
      text-align: center;
    }

    &__button {
      display: flex;
      justify-content: center;

      .cancel,
      .confirm {
        flex-basis: .8rem;
        line-height: .32rem;
        font-size: .14rem;
        text-align: center;
        color: #0091FF;
        border: .01rem solid #0091FF;
        margin: .24rem .12rem;

        border-radius: .16rem .18rem;
      }

    }


  }
</style>
