<template>
  <div class="wrapper">
    <img
      class="wrapper__img"
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      alt=""
    >
    <div class="wrapper__input">
      <input
        type="text"
        class="wrapper__input__content"
        placeholder="请输入账号"
      >
    </div>
    <div class="wrapper__input">
      <input
        type="password"
        class="wrapper__input__content"
        placeholder="请输入密码"
      >
    </div>
    <div class="wrapper__input">
      <input
        type="password"
        class="wrapper__input__content"
        placeholder="请确认密码"
      >
    </div>
    <div
      class="wrapper__login-button"
      @click='handleSignup'
    >注册</div>
    <div
      class="wrapper__signup"
      @click='returnLogin'
    >已有账号去登录</div>

  </div>
</template>

<script>
  export default {
    name: 'Signup',
    methods: {
      handleSignup() {
        sessionStorage.isLogin = true;
        this.$router.push({ name: 'home' })
      },
      returnLogin() {
        this.$router.push({ name: 'login' })
      }
    }

  }
</script>

<style
  lang='scss'
  scoped
>
  @import '../../style/variable.scss';

  .wrapper {
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    transform: translate(0, -50%);

    &__img {
      display: block;
      width: .66rem;
      height: .66rem;
      margin: 0 auto .4rem auto;
    }

    &__input {
      height: .48rem;
      box-sizing: border-box;
      margin: 0 .4rem .16rem .4rem;
      padding: 0 .16rem;
      border: 1px solid rgba(0, 0, 0, .1);
      background: #f9f9f9;
      border-radius: .06rem;

      &__content {
        width: 100%;
        height: 100%;
        background: #f9f9f9;
        border: none;
        outline: none;
        // line-height:.48rem;
        font-size: .16rem;

        &::placeholder {
          color: $content-notice-fontColor;

        }
      }
    }

    &__login-button {
      //  width:100%;
      background: #0091ff;
      margin: .32rem .4rem .16rem .4rem;
      height: .48rem;
      text-align: center;
      border-radius: .04rem;
      box-shadow: 0 .04rem .08rem rgba(0, 145, 255, .32);
      font-size: .16rem;
      line-height: .48rem;
      color: #fff;

    }

    &__signup {
      font-size: .14rem;
      color: $content-notice-fontColor;
      text-align: center;
    }
  }
</style>
