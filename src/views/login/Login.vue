<template>
  <div>
    <div class="wrapper">
      <img
        class="wrapper__img"
        src="http://www.dell-lee.com/imgs/vue3/user.png"
        alt=""
      />
      <div class="wrapper__input">
        <input
          type="text"
          class="wrapper__input__content"
          placeholder="请输入账号"
          v-model="data.username"
        />
      </div>
      <div class="wrapper__input">
        <input
          type="password"
          class="wrapper__input__content"
          placeholder="请输入密码"
          v-model="data.password"
        />
      </div>
      <div
        class="wrapper__login-button"
        @click="handleLogin"
      >登录</div>
      <div
        class="wrapper__signup"
        @click="handleSignup"
      >
        立即注册
      </div>
    </div>
    <Toast
      v-if="data.showToast"
      :message="data.message"
    />
  </div>
</template>

<script>
  import Axios from 'axios';
  import Toast from '../../components/Toast.vue';

  Axios.defaults.headers.post['Content-type'] = 'application/json';

  export default {
    name: 'Login',
    setup() {
      let { ref, reactive } = require('vue');
      let data = reactive({
        username: '',
        password: '',
        showToast: false,
        message: '',
      });

      return {
        data,
      };
    },
    methods: {
      handleLogin() {
        Axios({
            method: 'post',
            url: 'https://www.fastmock.site/mock/6ce9d2ceaed88cae5a13592139cd7aaa/study/user/login',
            data: {
              username: this.data.username,
              password: this.data.password,
            },
          })
          .then((v) => {
            sessionStorage.isLogin = true;
            this.$router.push({ path: '/home' });
          })
          .catch((v) => {
            this.data.showToast = true;
            this.data.message = '登录失败';

            setTimeout(() => {
              this.data.showToast = false;
            }, 2000);
          });
      },
      handleSignup() {
        this.$router.push({ name: 'signup' });
      },
    },

    components: {
      Toast,
    },
  };
</script>

<style
  lang="scss"
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
      width: 0.66rem;
      height: 0.66rem;
      margin: 0 auto 0.4rem auto;
    }

    &__input {
      height: 0.48rem;
      box-sizing: border-box;
      margin: 0 0.4rem 0.16rem 0.4rem;
      padding: 0 0.16rem;
      border: 1px solid rgba(0, 0, 0, 0.1);
      background: #f9f9f9;
      border-radius: 0.06rem;

      &__content {
        width: 100%;
        height: 100%;
        background: #f9f9f9;
        border: none;
        outline: none;
        // line-height:.48rem;
        font-size: 0.16rem;

        &::placeholder {
          color: $content-notice-fontColor;
        }
      }
    }

    &__login-button {
      //  width:100%;
      background: #0091ff;
      margin: 0.32rem 0.4rem 0.16rem 0.4rem;
      height: 0.48rem;
      text-align: center;
      border-radius: 0.04rem;
      box-shadow: 0 0.04rem 0.08rem rgba(0, 145, 255, 0.32);
      font-size: 0.16rem;
      line-height: 0.48rem;
      color: #fff;
    }

    &__signup {
      font-size: 0.14rem;
      color: $content-notice-fontColor;
      text-align: center;
    }
  }
</style>
