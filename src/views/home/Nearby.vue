<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <router-link
      v-for="item in nearbyList"
      :key="item._id"
      :to="`/shop/shops/${item._id}`"
    >
      <Shopinfo
        :item="item"
        :borderBottom="borderBottom"
      />
    </router-link>
  </div>
</template>

<script>
  import Axios from 'axios';
  import Shopinfo from '../../components/Shopinfo.vue';
  export default {
    name: 'Nearby',

    data() {
      return {
        nearbyList: [],
        borderBottom: true
      };
    },
    components: {
      Shopinfo
    },
    mounted() {
      Axios({
        method: 'get',
        url: 'https://www.fastmock.site/mock/6ce9d2ceaed88cae5a13592139cd7aaa/study/shop/hot-list'
      }).then((v) => {
        // if(v.data.error === 0 && v.data.data.length !==0){
        // console.log(v);
        this.nearbyList = v.data.data;
        // }
      });
    }
  };
</script>

<style
  lang="scss"
  scoped
>
  @import '../../style/variable.scss';
  @import '../../style/mixins.scss';

  .nearby {
    &__title {
      margin: 0.16rem 0 0.02rem 0;
      font-size: 0.18rem;
      font-weight: normal;
      color: $content-fontColor;
    }

    a {
      text-decoration: none;
    }
  }
</style>