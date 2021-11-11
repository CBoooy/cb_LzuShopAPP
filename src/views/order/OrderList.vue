<template>
  <div>
    <div class="orderlist">
      <div class="orderlist__title">我的订单</div>

      <div class="orderlist__content"> 
        <div v-for="(item1,index1) in orderList.data">
          <div
            class="orderlist__content__item"
            v-for="(item2,index2) in item1"
          >
            <div class="item__shopsMessage">
              <div class="item__shopsMessage__shopsname">商店{{index1}}
              </div>
              <div class="item__shopsMessage__orderStatus">
                订单编号：{{index2}}
              </div>

            </div>
            <div class="item__imgAndPrice">
              <div class="item__imgAndPrice__imgBox">
                <img
                  v-for="item3 in item2"
                  :src=" item3.imgUrl"
                  class="imgBox__img"
                >
              </div>

              <div class="item__imgAndPrice__price">
                <div class="total">￥{{getTotalPrice(item2)}}</div>
                <div class="sum">共{{getTotalCounts(item2)}}件</div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>

    <Docker :highLight="toDocker" />
  </div>
</template>

<script>
  import Docker from '../home/Docker.vue'
  import { useStore } from 'vuex';
  export default {
    name: "OrderList",
    components: {
      Docker,
    },
    setup() {
      let store2 = useStore()
      let { ref, reactive, computed } = require('vue');

      let toDocker = '订单';
      let orderList = reactive({
        data: {}
      })

      let getOrderList = () => {

         orderList.data = store2.getters.getOrderList;
      }
      getOrderList()

      // 正常的逻辑是：店铺或者购物车点击提交后，向order接口
      // 发送一个post，让服务器记录订单。
      // 我选择先在vuex里面记录orderList，模拟从order接口
      // 存取数据的过程。

      let getTotalCounts = (data) => {
        let sum = 0
        for (let item of data) {
          sum += item.count;
        }

        return sum;
      }

      let getTotalPrice = (data) => {
        let sum = 0
        for (let item of data) {
          sum += (item.count * item.price);
        }

        return sum;
      }

      return {
        orderList,
        getTotalPrice,
        getTotalCounts,
        toDocker
      }
    }

  }
</script>

<style
  lang='scss'
  scoped
>
  .orderlist {
    min-height: 6.67rem;
    background: #F5F5F5;

    &__title {
      line-height: .44rem;
      text-align: center;
      font-size: .16rem;
      color: #333333;
      background: #ffffff;
    }

    &__content {
      position:absolute;
      top:.44rem;
      bottom: .5rem;
      right:0;
      left: 0;
      overflow-y: scroll;

      &__item {
        background: #ffffff;
        margin: .16rem .18rem;
        padding: .16rem .16rem .16rem .16rem;


        .item__shopsMessage {
          display: flex;
          justify-content: space-between;

          &__shopsname {
            font-size: 16px;
            color: #333333;
          }

          &__orderStatus {
            font-size: 14px;
            color: #999999;
          }
        }

        .item__imgAndPrice {
          display: flex;
          justify-content: space-between;
          margin: .16rem 0 0 0;

          &__imgBox {
            flex-basis: 2.5rem;
            overflow-x: scroll;
            white-space: nowrap;

            .imgBox__img {
              width: .4rem;
              height: .4rem;
              margin-right: .12rem;
            }
          }

          &__price {

            .total {
              font-size: 14px;
              color: #E93B3B;
              margin-bottom: .04rem;
            }
          }

        }
      }
    }
  }
</style>
