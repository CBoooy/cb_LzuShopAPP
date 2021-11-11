<template>
  <div>
    <SuccessToast v-show="false" />

    <div class="cart">
      <div class="cart__title">我的购物车</div>
      <div class="cart__content">
        <router-link
          v-for="(item,index) in dataList.data"
          :to="{path:`/shop/shops/${index}`}"
        >
          <Order
            :dataList="item"
            :shopsid="index"
          />
        </router-link>
      </div>


      <Docker :highLight="toDocker" />
    </div>



  </div>

</template>

<script>
  import SuccessToast from './SuccessToast.vue'
  import Order from '../order/Order.vue'
  import Docker from '../home/Docker.vue'

  import { useStore } from 'vuex'

  let linkCartData = () => {
    let { ref, reactive } = require('vue');
    let dataList = reactive({
      data: {}
    })

    let getAllCartList = () => {
      let store2 = useStore(); 
        dataList.data = store2.getters.getAllCartList
 
      
    }
    getAllCartList()

    return {
      dataList,
      // shopsid
    }
  }
  export default {
    name: 'ShoppingCart',
    components: {
      SuccessToast,
      Order,
      Docker
    },
    setup() {
      let toDocker = "购物车"
      let { dataList, } = linkCartData();

      return {
        dataList,
        toDocker
      }
    }
  }
</script>

<style
  lang="scss"
  scoped
>
  .cart {

    background: #f5f5f5;
    min-height: 6.67rem;

    a {
      text-decoration: none;
    }

    &__title {
      font-size: 16px;
      color: #333333;
      line-height: .44rem;
      text-align: center;
      background: #ffffff;
    }

    &__content {
      position: absolute;
      top: .44rem;
      bottom: .5rem;
      right: 0;
      left: 0;
      overflow-y: scroll;
    }

  }
</style>
