<template>
  <div>

    <div class="mask"></div>
    <div class="toast">
      <div
        class="toast__close iconfont"
        @click='closeOrderToast'
      >&#xe629;</div>
      <div class="toast__icon iconfont">&#xe650;</div>
      <div class="toast__text">支付成功，等待配送</div>
    </div>
  </div>
</template>

<script>
  let { useRouter } = require('vue-router')
  let { useStore } = require('vuex');
  export default {
    name: "SuccessToast",
    props: ['shopsid'],
    setup(props) {
      let router2 = useRouter();
      let store2 = useStore();
      let closeOrderToast = () => {
        router2.push({
          name:'orderList'
        })
        let clearCart = () => {
          store2.commit('clearCart', {
            shopsid:props.shopsid
          })
        }

        clearCart()
      }
      return {
        closeOrderToast
      }
    },

  }
</script>

<style
  lang='scss'
  scoped
>
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

    &__close {
      text-align: right;
      margin: .12rem;
      font-size: .14rem;

    }

    &__icon {
      text-align: center;
      font-size: .4rem;
      margin: .16rem;

    }

    &__text {
      text-align: center;
      font-size: .18rem;

    }
  }

  .mask {
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.50);
  }
</style>
