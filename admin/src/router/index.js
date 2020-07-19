import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../views/Main.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/categories/create',
        component: () => import(/* webpackChunkName: "cttmngmt" */ '../views/CategoryEdit.vue'),
      },
      {
        path: '/categories/list',
        component: () => import(/* webpackChunkName: "cttmngmt" */ '../views/CategoryList.vue'),
      },
      {
        path: '/categories/edit/:id',
        component: () => import(/* webpackChunkName: "cttmngmt" */ '../views/CategoryEdit.vue'),
        props: true,
      },
      {
        path: '/items/create',
        component: () => import(/* webpackChunkName: "cttmngmt" */ '../views/ItemEdit.vue'),
      },
      {
        path: '/items/list',
        component: () => import(/* webpackChunkName: "cttmngmt" */ '../views/ItemList.vue'),
      },
      {
        path: '/items/edit/:id',
        component: () => import(/* webpackChunkName: "cttmngmt" */ '../views/ItemEdit.vue'),
        props: true,
      },
      {
        path: '/heroes/create',
        component: () => import(/* webpackChunkName: "cttmngmt" */ '../views/HeroEdit.vue'),
      },
      {
        path: '/heroes/list',
        component: () => import(/* webpackChunkName: "cttmngmt" */ '../views/HeroList.vue'),
      },
      {
        path: '/heroes/edit/:id',
        component: () => import(/* webpackChunkName: "cttmngmt" */ '../views/HeroEdit.vue'),
        props: true,
      },
      {
        path: '/articles/create',
        component: () => import(/* webpackChunkName: "cttmngmt" */ '../views/ArticleEdit.vue'),
      },
      {
        path: '/articles/list',
        component: () => import(/* webpackChunkName: "cttmngmt" */ '../views/ArticleList.vue'),
      },
      {
        path: '/articles/edit/:id',
        component: () => import(/* webpackChunkName: "cttmngmt" */ '../views/ArticleEdit.vue'),
        props: true,
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
