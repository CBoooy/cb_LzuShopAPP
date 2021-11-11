<template>
  <div class="address">
    <div class="title">
      <div
        class="title__back iconfont"
        @click="back"
      >&#xe681;</div>
      <div class="title__text">管理收获地址</div>
      <div
        class="title__title__create"
        @click='createAddress'
      >新建</div>

    </div>

    <div class="address__container">
      <div
        class="address__container__item"
        v-for="(item,index) in message"
        @click='editItem(index)'
      >
        <div class="item__message">
          <span class="item__message__name">{{item.name}}</span>
          <span class="item__message__tel">{{item.tel}}</span>
        </div>
        <div class="item__address">
          <div class="item__address__site">
            {{item.address}}</div>
          <div class="item__address__icon iconfont">&#xe677;</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  let linkAddress = () => {
    let router2 = useRouter();
    let store2 = useStore();
    let { reactive,ref } = require('vue');
    let editingIndex = ref()

    let message = reactive([
    {
      name: '小李',
      tel: 1234567890,
      address: '甘肃省兰州市夏官营镇镇立大学'
    },
    {
      name: '小王',
      tel: 1234567890,
      address: '甘肃省兰州市兰州大学榆中校区甘肃省兰州市兰州大学榆中校区甘肃省兰州市兰州大学榆中校区'
    },
    {
      name: '小张',
      tel: 1234567890,
      address: '国立榆中夏官营大学'
    }, ])

    let createAddress = () => {
      router2.push({
        name: 'createAddress'
      })
    }

    let receiveCreateAddress = () => {

      if(!sessionStorage.address){
      return;
      }
      if (sessionStorage.address !== "{}") {
        let createAddress = JSON.parse(sessionStorage.address);

        let addressString =
          createAddress['所在城市'] + "" + createAddress["小区/学校"] +
          "" +
          createAddress['楼号-门牌号'];

        let item = {
          name: createAddress['收货人'],
          tel: createAddress['联系电话'],
          address: addressString
        }

        message.push(item)
        // sessionStorage.removeItem("address")

      }
    }

    let editItem = (index) => { 
      router2.push({
        name: 'editAddress'
      }) 

      editingIndex.value = index;

    }

    let receiveEditingAddress =(index)=>{

      if(!sessionStorage.editingAddress){
         return;
      }
      let data =JSON.parse(sessionStorage.editingAddress);
      let newAddress = {
        name:data['收货人'],
        tel:data['联系电话'],
        address:data['所在城市']+""+data['小区/学校']+""+data['楼号-门牌号']
      }
        
        
        message.splice(index,1,newAddress)
        // sessionStorage.removeItem('editingAddress') 

    }
    return {
      createAddress,
      receiveCreateAddress,
      receiveEditingAddress,
      message,
      editItem,
      editingIndex
    }
  }
  export default {
    name: "ManageAddress",
    setup() {
      let router3 = useRouter()

      let { createAddress, receiveCreateAddress,
      receiveEditingAddress,message, editItem
      ,editingIndex} =
      linkAddress();

      receiveCreateAddress()
      receiveEditingAddress(editingIndex)



      let back = () => {
        router3.back()
      }

      return {
        message,
        createAddress,
        back,
        editItem
      }
    }
  }
</script>

<style
  lang="scss"
  scoped
>
  .address {
    background: #f5f5f5;
    min-height: 6.67rem;

    .title {
      line-height: .44rem;
      display: flex;
      padding: 0 .18rem;
      background: #ffffff;

      &__back {
        font-size: .16rem;
        color: #B6B6B6;
      }

      &__text {
        flex-grow: 1;
        text-align: center;
        font-size: .16rem;
      }

      &__create {
        font-size: .14rem;
      }

    }

    &__container {
      position: absolute;
      top: .44rem;
      bottom: 0;
      right: 0;
      left: 0;
      overflow-y: scroll;

      &__item {
        margin: .16rem .18rem;
        background: #ffffff;
        padding: .18rem .16rem;

        .item__message {
          font-size: .14rem;
          color: #999999;
          margin-bottom: .08rem;

          &__tel {
            margin-left: .66rem;
          }





        }

        .item__address {
          display: flex;

          &__site {
            flex-basis: 2.6rem;
            line-height: .2rem;
            font-size: .14rem;

          }

          &__icon {
            flex-grow: 1;
            text-align: right;
            font-size: .2rem;
            color: #999999;
          }

        }
      }
    }
  }
</style>
