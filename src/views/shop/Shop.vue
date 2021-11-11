<template>
  <div class="wrapper">
    <div class="search">
      <div
        class="search__back iconfont"
        @click="backHandle"
      >
        &#xe64e;
      </div>
      <div class="search__content">
        <div class="search__content__icon iconfont">
          &#xe60c;</div>
        <input
          class="search__content__input"
          type="text"
          placeholder="请输入商品名称"
        />
      </div>
    </div>
    <Shopinfo
      :item="data.item"
      :borderBottom="borderBottom"
    />

    <Content />
    <Cart :shopsid="shopsid"  />
  </div>
</template>

<script>
  import Shopinfo from '../../components/Shopinfo.vue';
  import Content from './Content.vue';
  import Cart from './Cart.vue';
  import Axios from 'axios';

  import { useRoute } from 'vue-router';
  import {useStore} from 'vuex'
  export default {
    name: 'Shop',
    components: {
      Shopinfo,
      Content,
      Cart
    },
    setup() {
      let { ref, reactive } = require('vue');
      let borderBottom = ref(false);
      let data = reactive({ item: {} });
      let router2 = useRoute();
      let store2 = useStore()
      let shopsid = ref(router2.params.id);

      Axios({
        method: 'get',
        url: `https://www.fastmock.site/mock/6ce9d2ceaed88cae5a13592139cd7aaa/study/shop/shops/${shopsid}`
      }).then((v) => {
        data.item = v.data.data[0]; 
      });
 
        
      return {
        borderBottom,
        data,
        shopsid
      };
    },

    methods: {
      backHandle() {
        this.$router.back();
        // this.$router.push({name:'home'})
          }
    }
  };
</script>

<style
  lang="scss"
  scoped
>
  .wrapper {
    margin: 0.16rem 0.18rem 0 0.18rem;

    .search {
      display: flex;
      margin-bottom: 0.04rem;

      &__back {
        font-size: 0.25rem;
        position: relative;
        top: 0.02rem;
        color: #b6b6b6;
      }

      &__content {
        display: flex;
        flex-grow: 1;
        margin-left: 0.12rem;
        border-radius: 0.16rem;
        background: #f5f5f5;

        &__icon {
          font-size: 0.16rem;
          margin: 0 0.12rem;
          text-align: center;
          position: relative;
          top: 0.07rem;
          color: #b7b7b7;
        }

        &__input {
          border: none;
          background: #f5f5f5;
          font-size: 0.14rem;
          color: #333333;
          height: 0.32rem;
          padding: 0;

          &:focus {
            border: none;
            outline: none;
          }
        }
      }
    }
  }
</style>
