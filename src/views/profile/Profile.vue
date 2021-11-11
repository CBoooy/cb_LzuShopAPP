<template>
  <div>
    <div class="bgimg">
      <div class="bgimg__one"></div>
      <div class="bgimg__two"></div>
    </div>

    <div class="profile">
      <div class="profile__titleIcon iconfont"> &#xe615;</div>
      <div class="profile__card">
        <div class="profile__card__headPic">
        </div>

        <div class="profile__card__userName">
          尼古拉斯赵四 
        </div>
        <div class="profile__card__userId">ID:1347047479</div>
        <div class="profile__card__coupons">
          <div class="coupon">
            <div class="coupon__name">红包</div>
            <div class="coupon__count">293</div>
          </div>
          <div class="coupon">
            <div class="coupon__name">优惠券</div>
            <div class="coupon__count">3999</div>
          </div>
          <div class="coupon">
            <div class="coupon__name">赵豆</div>
            <div class="coupon__count">200</div>
          </div>
          <div class="coupon">
            <div class="coupon__name">白条</div>
            <div class="coupon__count">20w+</div>
          </div>
        </div>
      </div>

      <div class="profile__function">
        <div class="profile__function__item" >
          <div class="item__left">
            <span class="iconfont">&#xe6b9;</span>
            <span class="text">我的钱包</span>
          </div>
          <div class="item__right iconfont">&#xe677;</div>
        </div>
        <div class="profile__function__item" @click="myAddress">
          <div class="item__left">
            <span class="iconfont">&#xe63d;</span>
            <span class="text">我的地址</span>
          </div>
          <div class="item__right iconfont">&#xe677;</div>
        </div>
        <div class="profile__function__item">
          <div class="item__left">
            <span class="iconfont">&#xf135;</span>
            <span class="text">客服与帮助</span>
          </div>
          <div class="item__right iconfont">&#xe677;</div>
        </div>
      </div>

    </div>


    <Docker :highLight="toDocker" />
  </div>
</template>

<script>
  import Docker from '../home/Docker.vue'
  import {useRouter} from 'vue-router';
  export default {
    name: "Profile",
    components: {
      Docker,
    },
    setup() {
      let router2 = useRouter();
      let toDocker = '我的'


        let myAddress = () =>{
          router2.push({
            name:'manageAddress'
          })
        }
      return {
        toDocker,myAddress
      }
    }

  }
</script>

<style
  lang='scss'
  scoped
>
  .bgimg {
    position: absolute;
    z-index: 0;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    &__one {
      height: 2.5rem;
      background-image: linear-gradient(to bottom, #3A6FF3 0%, #50C7FB 50%, #ffffff 100%);
    }
  }

  .profile {
    position: absolute;
    z-index: 1;
    top: .57rem;
    bottom: 1.94rem;
    left: .18rem;
    right: .18rem;

    &__titleIcon {
      text-align: right;
      margin-right: .03rem;
      font-size: .2rem;
      color: #ffffff;
      padding-bottom: .32rem;


    }

    &__card {
      position: relative;
      z-index: 3;
      background: #ffffff;
      box-shadow: 0 .08rem .16rem 0 rgba(0, 0, 0, 0.08);
      border-radius: .08rem;


      &__headPic {
        width: .94rem;
        height: .94rem;
        background-image: url(../../images/douzi.png);
        background-position: 50% 50%;
        background-size: cover;
        background-repeat: no-repeat;
        border-radius: 50%;

        position: absolute;
        z-index: 4;

        left: 50%;
        transform: translate(-50%, -50%);


      }

      &__userName {
        line-height: .36rem;
        padding-top: .59rem;
        text-align: center;
        font-size: .24rem;
        letter-spacing: 0.02rem;
        position: relative;
 
      }

      &__userId {
        margin: .02rem 0 0;
        padding-bottom: .12rem;
        text-align: center;
        font-size: .14rem;
        color: #C1C0C9;
        border-bottom: .01rem solid #F1F1F1;
      }

      &__coupons {
        display: flex;

        .coupon {
          flex-grow: 1;
          text-align: center;

          &__name {
            font-size: 12px;
            color: #C1C0C9;
            margin: .12rem 0 .03rem 0;
          }

          &__count {
            font-size: 20px;
            color: #262628;

            margin-bottom: .16rem;
          }
        }
      }

    }

    &__function {
      margin: .16rem 0 0 0;
      border-radius: .08rem;
      box-shadow: 0 .08rem .16rem rgba(0, 0, 0, 0.08);

      &__item {
        display: flex;
        padding: .13rem .16rem;
        display: flex;
        justify-content: space-between;

        .item__left {

          .iconfont {
            font-size: .25rem;
          }

          .text {
            position: relative;
            bottom: .04rem;

            font-size: 14px;
            color: #262626;
            padding-left: .12rem;

          }
        }

        .item__right {
          font-size: .18rem;
          color: #C2C4CA;
        }


      }
    }
  }
</style>
