<template>
  <div>
    <div class="create">

      <div class="create__title">
        <div
          class="create__title__back iconfont"
          @click='back'
        >&#xe681;</div>
        <div class="create__title__text">
          <slot name="title">编辑收获地址</slot>
        </div>
        <slot name='save'>
          <div
            class="create__title__save"
            @click="save"
          >保存</div>
        </slot>

      </div>

      <div class="create__content">
        <div
          class="create__content__item"
          v-for="(item,index) in data"
        >
          <span>{{item.span}} :</span>
          <input
            type="text"
            :placeholder="item.placeholder"
            v-model="result[item.span]"
          >
        </div>


      </div>
    </div>
  </div>
</template>


<script>
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router'
  let linkSave = () => {
    let store2 = useStore();
    let router2 = useRouter();
    let { reactive } = require('vue');
    let data = reactive([
    {
      span: "所在城市",
      placeholder: "如甘肃省兰州市"
    },
    {
      span: "小区/学校",
      placeholder: "如兰州大学榆中校区"
    },
    {
      span: "楼号-门牌号",
      placeholder: "A号楼B层"
    },
    {
      span: "收货人",
      placeholder: "请填写收货人的姓名"
    },
    {
      span: "联系电话",
      placeholder: "请填写收货手机号"
    }])
    let result = reactive({})

    let save = () => {
      sessionStorage.editingAddress =JSON.stringify(result);
    }

    let back = () => {
      router2.back()
    }

    return {
      save,
      data,
      result,
      back
    }
  }
  export default {
    name: "EditAddress",
    setup() {
      let { save, data, result, back } = linkSave();

      return {
        save,
        data,
        result,
        back
      }
    }

  }
</script>

<style
  lang='scss'
  scoped
>
  .create {
    background: #f5f5f5;
    min-height: 6.67rem;

    &__title {
      line-height: .44rem;
      display: flex;
      padding: 0 .18rem;
      background: #ffffff;


      &__back {
        color: #B6B6B6;
        font-size: .16rem;
      }

      &__text {
        flex-grow: 1;
        text-align: center;
        font-size: 16px;
        color: #333333;
      }

      &__save {
        font-size: 14px;
        color: #333333;
      }
    }

    &__content {
      background: #ffffff;
      padding: 0 .18rem;
      margin-top: .12rem;

      &__item {
        box-sizing: border-box;
        padding: .12rem 0;

        font-size: 14px;
        color: #666666;

        border-bottom: .01rem solid #F1F1F1;

        span {
          padding-right: .05rem;
          color: #333333;
        }

        input {
          outline: none;
          border: none;

          &::placeholder {
            font-size: .12rem;
          }

        }
      }

    }
  }
</style>
