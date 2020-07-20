import Vue from 'vue';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';
import Main from '../views/Main.vue';

Vue.use(VueRouter);

import content from './content';
import service from './service';
import system from './system';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      isPublic: true,
    },
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/',
        name: 'Intro',
        component: () => import(/* webpackChunkName: "login" */ '../views/Intro.vue'),
      },
      ...content,
      ...service,
      ...system,
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // If need auth
  if (!to.meta.isPublic && !Cookies.get('token')) {
    Vue.prototype.$message({
      type: 'error',
      message: '未登陆账户',
    });
    next('/login');
  } else {
    next();
  }
});

export default router;
