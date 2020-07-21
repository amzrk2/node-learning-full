import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../views/Main.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/', // 首页架构
    component: Main,
    children: [
      {
        path: '/',
        name: 'Home', // 主页内容
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
      },
      {
        path: '/strategy',
        name: 'Strategy', // 攻略中心
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
      },
      {
        path: '/match',
        name: 'Match', // 赛事中心
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
