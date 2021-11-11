 import {
  createRouter,
  createWebHashHistory
} from 'vue-router';

import Home from '../views/home/Home.vue';
import Login from '../views/login/Login.vue';
import Signup from '../views/signup/Signup.vue';

const routes = [
{
  path: '',
  redirect: '/login'
},
{
  path: '/home',
  name: 'home',
  component: Home,
  beforeEnter: (to, from, next) => {
    if (sessionStorage.isLogin) {
      next();
    } else {
      next({ name: 'login' });
    }
  }
},
{
  path: '/login',
  name: 'login',
  component: Login,
  beforeEnter: (to, from, next) => {
    if (sessionStorage.isLogin) {
      next({ name: 'home' });
    } else {
      next();
    }
  }
},
{
  path: '/signup',
  name: 'signup',
  component: Signup,
  beforeEnter: (to, from, next) => {
    if (from.name !== 'login') {
      next({ name: from.name });
    } else {
      next();
    }
  }
},
{
  path: '/shop/shops/:id',
  name: 'shop',
  component: () => import('../views/shop/Shop.vue')
},
{
  path: '/orderConfirm/:id',
  name: 'orderConfirm',
  component: () => import('../views/order/OrderConfirm.vue')

},
{
  path: '/shoppingCart',
  name: 'shoppingCart',
  component: () => import('../views/order/ShoppingCart.vue')
},
{
  path: '/orderList',
  name: 'orderList',
  component: () => import('../views/order/OrderList.vue')
  }, {
  path: '/editAddress',
  name: 'editAddress',
    component:()=> import('../views/address/EditAddress')
  }, {
  path: '/createAddress',
  name: 'createAddress',
    component:()=>import('../views/address/CreateAddress')
  },
  {
    path: '/manageAddress',
    name: 'manageAddress',
    component:()=> import('../views/address/ManageAddress')
  }, {
    path: '/profile',
    name: 'profile',
    component:()=>import('../views/profile/Profile')
  }

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  mode: 'history'
});


export default router;
