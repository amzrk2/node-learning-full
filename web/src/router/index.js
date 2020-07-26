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
        path: '/article/:id',
        name: 'Article', // 文章详情页
        component: () => import(/* webpackChunkName: "article" */ '../views/Article.vue'),
        props: true,
      },
      {
        path: '/strategy',
        name: 'Strategy', // 攻略中心
        component: () => import(/* webpackChunkName: "other" */ '../views/Home.vue'),
      },
      {
        path: '/match',
        name: 'Match', // 赛事中心
        component: () => import(/* webpackChunkName: "other" */ '../views/Home.vue'),
      },
    ],
  },
  {
    path: '/hero/:id', // 英雄页面，注意层级
    name: 'Hero',
    component: () => import(/* webpackChunkName: "hero" */ '../views/Hero.vue'),
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.path === '/') {
      return savedPosition; // 记录主页滚动到的位置
    } else {
      return { x: 0, y: 0 }; // 前往非主页则返回顶部
    }
  },
});

export default router;
