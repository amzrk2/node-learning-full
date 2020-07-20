export default [
  {
    path: '/ads/create',
    component: () => import(/* webpackChunkName: "servicem" */ '../views/AdEdit.vue'),
  },
  {
    path: '/ads/list',
    component: () => import(/* webpackChunkName: "servicem" */ '../views/AdList.vue'),
  },
  {
    path: '/ads/edit/:id',
    component: () => import(/* webpackChunkName: "servicem" */ '../views/AdEdit.vue'),
    props: true,
  },
];
