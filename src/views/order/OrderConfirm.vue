<template>
  <div>
    <SuccessToast
      v-show="isShowSuccessToast"
      :shopsid='shopsid'
    />
    <BackToast
      :isShowToast='isShowToast'
      :shopsid='shopsid'
      :dataList='dataList'
    />
    <div class="confirm">
      <div class="confirm__bg">
        <div
          class="confirm__title"
          @click='backToShop'
        >
          <div class="confirm__title__back iconfont">
            &#xe681;
          </div>
          <div class="confirm__title__text">确认订单</div>
        </div>

        <div class="confirm__address">
          <div class="confirm__address__title">收货地址</div>
          <div
            class="confirm__address__name"
            @click="editAddress"
          >
            <span>兰州大学榆中校区天山堂1楼</span>
            <span class="iconfont">&#xe677;</span>
          </div>
          <div class="confirm__address__tel">尼古拉斯赵四（先生） 123****8900
          </div>
        </div>
      </div>

      <div class="confirm__order">
        <Order
          :dataList='dataList.item'
          :shopsid='shopsid'
        />
      </div>


      <div class="confirm__bottom">
        <div class="confirm__bottom__total">实付金额
          <span class="allPrice">￥{{allPrice}}</span>
        </div>
        <div
          class="confirm__bottom__commit"
          @click="confirmOrder"
        >提交订单</div>
      </div>
    </div>
  </div>





</template>

<script>
  import Docker from '../home/Docker.vue';
  import Order from './Order.vue';
  import SuccessToast from './SuccessToast.vue'

  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router'

  import BackToast from './BackToast.vue'

  let linkOrder = () => {
    let { ref, reactive, getCurrentInstance } = require('vue');
    let { ctx } = getCurrentInstance()
    let store2 = useStore()

    let shopsid = ctx.$root.$route.params.id
    let dataList = reactive({
      item: []
    })
    let allPrice = ref()
    let isShowSuccessToast = ref(false);

    let getOrderData = () => {

      let sum = store2.getters.getOrderData({
        shopsid,
      })
      dataList.item = sum.goods;

      allPrice.value = sum.allPrice
    }
    getOrderData()

    let confirmOrder = () => {
      // 点击提交，弹出successToast
      isShowSuccessToast.value = true;
      let orderIdentifier = Math.floor(Math.random() * 10000)

      // 并且：向vuex

      store2.commit('commitOrder', {
        orders: dataList.item,
        shopsid,
        orderIdentifier,
      })
    }

    return {
      dataList,
      shopsid,
      allPrice,
      confirmOrder,
      isShowSuccessToast

    }
  };

  let linkGoBack = () => {
    let { ref } = require('vue')
    let { getCurrentInstance } = require('vue');
    let { ctx } = getCurrentInstance()

    let isShowToast = ref(false)

    let backToShop = () => {
      isShowToast.value = true;
    }
    return {
      backToShop,
      isShowToast
    }
  }

  let linkEditAddress = () => {
    // let { getCurrentInstance } = require('vue')
    // let { ctx } = getCurrentInstance()
    let router2 = useRouter();

    let editAddress = () => {
      // let router2 = useRouter();
      router2.push({
        name: 'manageAddress'
      }) 
    }
    return {
      editAddress,
    }
  }


  export default {
    name: 'OrderConfirm',
    components: {
      Docker,
      Order,
      BackToast,
      SuccessToast
    },
    setup() {

      let { backToShop, isShowToast } = linkGoBack();
      let {
        dataList,
        shopsid,
        allPrice,
        confirmOrder,
        isShowSuccessToast
      } = linkOrder()

      let { editAddress } = linkEditAddress()

      return {
        backToShop,
        isShowToast,


        dataList,
        shopsid,
        allPrice,
        confirmOrder,
        isShowSuccessToast,


        editAddress
      }
    }

  }
</script>

<style
  lang='scss'
  scoped
>
  .confirm {

    background: #F5F5F5;
    min-height: 6.67rem;

    &__bg {
      background-image: linear-gradient(to bottom, #0091FF 0,
          #F5F5F5 100%);
    }

    &__title {
      line-height: .22rem;
      margin: 0 0 .22rem .18rem;
      padding-top: .41rem;
      display: flex;



      &__text {
        flex-grow: 1;
        text-align: center;
        position: relative;
        right: .2rem;
        font-size: .16rem;

      }
    }

    &__address {
      margin: 0 .18rem .16rem .18rem;
      border-radius: .04rem;
      background: #ffffff;

      &__title {
        padding-top: .16rem;
        margin: 0 0 .16rem .16rem;
        font-size: 16px;
        color: #333333;
      }

      &__name {
        font-size: 14px;
        color: #333333;
        margin: .16rem;
        display: flex;
        justify-content: space-between;

      }

      &__tel {
        font-size: 12px;
        color: #666666;
        padding: 0 .16rem .16rem .16rem;
      }
    }

    &__order {

      overflow-y: scroll;
      padding-bottom: .5rem;

    }

    &__bottom {
      display: flex;
      position: fixed;
      z-index: 1;
      bottom: 0;
      right: 0;
      left: 0;
      line-height: .5rem;
      background: #ffffff;

      &__total {
        flex-grow: 1;
        font-size: 14px;
        color: #333333;
        margin-left: .24rem;

        .allPrice {
          font-size: 18px;
          color: #E93B3B;
        }

      }

      &__commit {
        flex-basis: 1rem;
        background-color: #4FB0F9;
        color: #ffffff;
        font-size: .14rem;
        text-align: center;


      }
    }
  }
</style>
