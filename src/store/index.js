import { createStore } from 'vuex'





let store = createStore({
  state: {
    cart: {},
    orderList: {}
    // 第一层，商铺名：在这个商铺购买的所有商品
    // 第二层，商品名：这个商品的具体信息

  },

  mutations: {
    increaseCount(state, payload) {
      let { shops, goodsMessage } = payload;
      // 从组件中得到了去修改state的请求，并传入了shops和goods重要信息。此时应该怎么做？
      // 如果state的cart中有shops，那直1:{}接在其中加入goods，没有，则新加入一个shops

      // 同理，如果shops中有goods，则直接在goods的count中++，没有，则新加入一个goods
      if (state.cart[shops]) {
        if (state.cart[shops][goodsMessage._id]) {

          console.log("第二次加入同一个商品会弹出");
          // 通过层层判断car中是否有商铺和商品
          state.cart[shops][goodsMessage._id].count++

        } else {
          console.log("第一次加入新商品会弹出");
          goodsMessage.count = 0;
          state.cart[shops][goodsMessage._id] = goodsMessage;
          state.cart[shops][goodsMessage._id].count++;
        }
      } else {
        state.cart[shops] = {};
        goodsMessage.count = 0;
        state.cart[shops][goodsMessage._id] = goodsMessage;
        state.cart[shops][goodsMessage._id].count++;
        console.log("第一次加入shops和goodsMessage会弹出");
      }

      state.cart[shops][goodsMessage._id].checked = true;

      console.log("点击increase后store中的cart：", state.cart);
    },
    decreaseCount(state, payload) {
      let { shops, goodsMessage } = payload;
      if (state.cart[shops]) {
        if (state.cart[shops][goodsMessage._id]) {
          if (state.cart[shops][goodsMessage._id].count !== 0) {
            state.cart[shops][goodsMessage._id].count--;
            if (state.cart[shops][goodsMessage._id].count === 0) {
              delete state.cart[shops][goodsMessage._id]
            }

          }


        }
        for (let item in state.cart[shops]) {
          return
        }
        delete state.cart[shops]
      }


      console.log("减去后的state cart：", state.cart);
    },



    // 下面是checked的部分

    handleChecked(state, payload) {
      let { shopsid, goodsMessage, isChecked } = payload;
      if (typeof state.cart[shopsid][goodsMessage._id].checked !=
        "boolean") {
        state.cart[shopsid][goodsMessage._id].checked = false;
      } else {
        state.cart[shopsid][goodsMessage._id].checked = !state
          .cart[shopsid][goodsMessage._id].checked
      }

      isChecked.value = state.cart[shopsid][goodsMessage._id]
        .checked;


      console.log(state.cart[shopsid]);
    },

    handleAllChecked(state, payload) {
      let { shopsid, isAll } = payload;
      if (isAll.value === true) {
        // 如果全选按钮已经被点击了，那么，将所有的设置为false
        for (let item in state.cart[shopsid]) {
          state.cart[shopsid][item].checked = false;

        }
      } else {
        for (let item in state.cart[shopsid]) {
          state.cart[shopsid][item].checked = true;
        }
      }
      isAll.value = !isAll.value
      console.log(1111, state.cart[shopsid]);
    },

    clearCart(state, payload) {
      let { shopsid } = payload;


      // let keys = Reflect.ownKeys(state.cart[shopsid]);
      // for (let item of keys) {
      //   delete state.cart[shopsid][item]
      // }

      delete state.cart[shopsid]
    },

    // 下面是order的部分

    commitOrder(state, payload) {
      let { orders, shopsid, orderIdentifier } = payload;
      if (!state.orderList[shopsid]) {
        state.orderList[shopsid] = {};
      }
      state.orderList[shopsid][orderIdentifier] = orders;
    }
  },
  actions: {},
  getters: {

    // 下面是checked的部分
    getChecked(state) {
      return function (payload) {
        let { shopsid, goodsMessage } = payload;
        if (typeof state.cart[shopsid][goodsMessage._id]
          .checked != "boolean") {
          return true;
        } else {
          return state.cart[shopsid][goodsMessage._id].checked
        }

      }
    },

    // 下面是confirmorder组件的部分

    getOrderData(state) {
      return function (payload) {
        let { shopsid } = payload;
        let sum = {
          goods: [],
          allPrice: 0
        };
        for (let item in state.cart[shopsid]) {
          // console.log(state.cart[shopsid]);
          if (state.cart[shopsid][item].checked === true) {

            sum.goods.push(state.cart[shopsid][item])
            sum.allPrice += (state.cart[shopsid][item].price *
              state
              .cart[shopsid][item].count)
          }
        }
        return sum;
      }

    },

    // 下面是订单页，所有orderlist的部分

    getOrderList(state) {

      function emerge(obj1, obj2) {

        for (let item in obj2) {
          if (obj1[item]) {
            for (let item2 in obj2[item]) {
              obj1[item][item2] = obj2[item][item2]
              // console.log(obj2[item][item2]);
            }
          } else {
            obj1[item] = obj2[item]
            for (let item2 in obj2[item]) {
              obj1[item][item2] = obj2[item][item2]
              // console.log(obj2[item][item2]);
            }
          }
        }

        return obj1
      }

      let orderDataFromVuexStore = state.orderList;
      let orderDataFromLoaclStorage = sessionStorage
        .orderList ? JSON.parse(sessionStorage
          .orderList) : {};

      return emerge(orderDataFromVuexStore,
        orderDataFromLoaclStorage)

    },

    // 下面是获取购物车的所有数据：

    getAllCartList(state) {
       
      return state.cart
 
    },
 

  },
  modules: {}
})

window.addEventListener('beforeunload', () => {
  function emerge(obj1, obj2) {

    for (let item in obj2) {
      if (obj1[item]) {
        for (let item2 in obj2[item]) {
          obj1[item][item2] = obj2[item][item2]
          // console.log(obj2[item][item2]);
        }
      } else {
        obj1[item] = obj2[item]
        for (let item2 in obj2[item]) {
          obj1[item][item2] = obj2[item][item2]
          // console.log(obj2[item][item2]);
        }
      }
    }

    return obj1
  }

  // 将新orderList合并入旧订单,调用函数之前，先将其转换为对象
  if (!store.state.orderList) {
    store.state.orderList = {}
  }
  let orderList = {};
  if (!!sessionStorage.orderList) {
    orderList = emerge(JSON.parse(sessionStorage
      .orderList), store.state.orderList)
  } else {
    sessionStorage.orderList = "{}";
    orderList = emerge(JSON.parse(sessionStorage
      .orderList), store.state.orderList)
  } 
  sessionStorage.orderList = JSON.stringify(orderList)

    // 关闭页面之前，将上一个购物车的信息，放到session
  // 在进入到页面的时候，将session的cart取出来，放到store
  // 任何时候,取购物车信息,都只能从store中取.
  sessionStorage.cart = store.state.cart ? JSON.stringify(store
    .state.cart) : "{}";
});

store.state.cart = JSON.parse(sessionStorage.cart)
// store.state.cart = sessionStorage.cart;
 
export default store;
