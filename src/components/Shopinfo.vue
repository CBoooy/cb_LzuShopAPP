<template>
  <div class="shop__item">
    <img
      :src="item.imgUrl"
      class="shop__item__img"
    />
    <div :class="{
        'shop__item__content':true,
        'shop__item__content--borderBottom':borderBottom
        }">
      <div class="shop__item__content__title">{{item.name}}</div>
      <div class="shop__item__content__tags">
        <span class="shop__item__content__tags__tag">
          月售：{{item.sales}}
        </span>
        <span class="shop__item__content__tags__tag">
          起送：{{item.expressLimit}}
        </span>
        <span class="shop__item__content__tags__tag">
          基础运费：{{item.expressPrice}}
        </span>
      </div>
      <div class="shop__item__content__highlight">{{item.slogan}}
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'Shopinfo',
    props: ['item', 'borderBottom'],

  }
</script>

<style
  lang='scss'
  scoped
>
  @import "../style/variable.scss";
  @import "../style/mixins.scss";



  .shop {

    &__item {
      display: flex;
      padding: 0.12rem 0 0 0;

      &__img {
        margin-right: 0.16rem;
        width: 0.56rem;
        height: 0.56rem;
      }

      &__content {
        flex-grow: 1;

        &--borderBottom {
          border-bottom: 1px solid #f1f1f1;
        }

        padding-bottom: 0.12rem;

        &__title {
          line-height: 0.22rem;
          font-size: 0.16rem;
          color: $content-fontColor;
        }

        &__tags {
          margin: 0.08rem 0.16rem 0 0;

          &__tag {
            margin-right: 0.08rem;
            line-height: 0.18rem;
            font-size: 0.13rem;
            color: $content-fontColor;
          }
        }

        &__highlight {
          margin: 0.08rem 0 0 0;
          line-height: 0.18rem;
          font-size: 0.13rem;
          color: #e93b3b;
        }
      }
    }


  }
</style>