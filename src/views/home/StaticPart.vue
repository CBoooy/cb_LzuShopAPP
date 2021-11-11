<template>
  <div>
    <div class="position">
      <span class="iconfont position__icon">&#xe62f;</span>
      兰州大学榆中校区天山堂兰州大学榆中校区天山堂兰州大学榆中校区天山堂兰州大学榆中校区天山堂
      <span class="iconfont position__notice">&#xe628;</span>
    </div>

    <div class="search">
      <span class="iconfont">&#xe60c;</span>
      山姆会员优惠产品
    </div>

    <div class="banner">
      <img
        class="banner__img"
        src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
        alt=""
      />
    </div>

    <div class="icons">
      <div
        class="icons__item"
        v-for="(item, index) in category"
        :key="index"
      >
        <img
          :src="`http://www.dell-lee.com/imgs/vue3/${item.a}.png`"
          alt=""
          class="icons__item__img"
        />
        <p class="icons__item__desc">{{ item.text }}</p>
      </div>
    </div>

    <div class="gap"></div>
  </div>
</template>

<script>
  export default {
    name: 'StaticPart',
    setup() {
      let { reactive } = require('vue');
      const category = reactive([
        { a: '超市', text: '超市便利' },
        { a: '菜市场', text: '菜市场' },
        { a: '水果店', text: '水果店' },
        { a: '鲜花', text: '鲜花绿植' },
        { a: '医药健康', text: '医药健康' },
        { a: '家居', text: '家具时尚' },
        { a: '蛋糕', text: '蛋糕' },
        { a: '签到', text: '签到' },
        { a: '大牌免运', text: '大牌' },
        { a: '红包', text: '红包' }
      ]);

      return {
        category
      };
    }
  };
</script>

<style
  lang="scss"
  scoped
>
  @import '../../style/variable.scss';
  @import '../../style/mixins.scss';

  .position {
    position: relative;
    padding: 0.16rem 0.3rem 0.16rem 0;
    line-height: 0.22rem;
    font-size: 0.16rem;
    color: $content-fontColor;

    // 省略号：
    @include ellipsis;

    &__icon {
      position: relative;
      top: 0.01rem;
      font-size: 0.2rem;
    }

    &__notice {
      position: absolute;
      top: 0.17rem;
      right: 0;
      font-size: 0.2rem;
    }
  }

  .search {
    line-height: 0.32rem;
    background: #f5f5f5;
    color: #b7b7b7;
    border-radius: 0.16rem;
    font-size: 0.14rem;
    margin-bottom: 0.12rem;

    .iconfont {
      font-size: 0.2rem;
      padding: 0 0.12rem 0 0.16rem;
    }
  }

  .banner {
    height: 0;
    overflow: hidden;
    padding-bottom: 25.4%;

    &__img {
      width: 100%;
    }
  }

  .icons {
    margin: 0.12rem 0;
    display: flex;
    flex-wrap: wrap;

    &__item {
      width: 20%;

      &__img {
        width: 0.4rem;
        height: 0.4rem;
        display: block;
        margin: 0 auto;
      }

      &__desc {
        text-align: center;
        margin: 0.06rem 0;
        color: $content-fontColor;
      }
    }
  }

  .gap {
    height: 0.1rem;
    background: $content-bgColor;
    margin: 0 -0.18rem;
  }
</style>