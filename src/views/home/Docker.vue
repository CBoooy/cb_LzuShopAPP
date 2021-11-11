<template>
  <div class="docker"> 
    <div
      v-for=" item in dockerList"
      :class="{ docker__item:true,
                'docker__item--active':item.text===textHighLight}"
      :key="item.icon" 
    >

      <router-link :to="item.to">
        <div
          class="iconfont"
          v-html="item.icon"
        ></div>
        <div class="docker__title">{{ item.text }}</div>
      </router-link>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Docker",
    props:['highLight'],
    setup(props) {
      let { reactive, ref } = require("vue");
      let textHighLight = ref(props.highLight);
      let dockerList = reactive([
        { icon: "&#xe734", text: "首页", to: { "path": '/home' } },
        { icon: "&#xe641;", text: "购物车", to: { "path": '/shoppingCart'
        } },
        { icon: "&#xe612;", text: "订单", to: { "path": '/orderList' } },
        { icon: "&#xe610;", text: "我的", to: { "path": '/profile' } },
      ]);
 

      return {
        dockerList,
        textHighLight, 
      };
    },
  };
</script>

<style
  lang="scss"
  scoped
>
  @import "../../style/variable.scss";
  @import "../../style/mixins.scss";

  .docker {
    display: flex;
    box-sizing: border-box;
    padding: 0 0.18rem;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0.49rem;
    border-top: 0.01rem solid $content-bgColor;
    color: $content-fontColor;

    background: #ffffff;

    &__item {
      flex-grow: 1;
      text-align: center;

      a {
        text-decoration: none;
        color: #333333;
      }

      .iconfont {
        margin: 0.07rem 0 0.02rem 0;
        font-size: 0.2rem;
      }

      &--active a {
        color: #1fa4fc;
      }
    }

    &__title {
      font-size: 0.2rem;
      transform: scale(0.5, 0.5);
      transform-origin: center top;
    }
  }
</style>
