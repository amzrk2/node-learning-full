export default [
  {
    path: '/items/create',
    component: () => import(/* webpackChunkName: "contentm" */ '../views/ItemEdit.vue'),
  },
  {
    path: '/items/list',
    component: () => import(/* webpackChunkName: "contentm" */ '../views/ItemList.vue'),
  },
  {
    path: '/items/edit/:id',
    component: () => import(/* webpackChunkName: "contentm" */ '../views/ItemEdit.vue'),
    props: true,
  },
  {
    path: '/heroes/create',
    component: () => import(/* webpackChunkName: "contentm" */ '../views/HeroEdit.vue'),
  },
  {
    path: '/heroes/list',
    component: () => import(/* webpackChunkName: "contentm" */ '../views/HeroList.vue'),
  },
  {
    path: '/heroes/edit/:id',
    component: () => import(/* webpackChunkName: "contentm" */ '../views/HeroEdit.vue'),
    props: true,
  },
  {
    path: '/articles/create',
    component: () => import(/* webpackChunkName: "contentm" */ '../views/ArticleEdit.vue'),
  },
  {
    path: '/articles/list',
    component: () => import(/* webpackChunkName: "contentm" */ '../views/ArticleList.vue'),
  },
  {
    path: '/articles/edit/:id',
    component: () => import(/* webpackChunkName: "contentm" */ '../views/ArticleEdit.vue'),
    props: true,
  },
];
