export default [
  {
    path: '/categories/create',
    component: () => import(/* webpackChunkName: "systemm" */ '../views/CategoryEdit.vue'),
  },
  {
    path: '/categories/list',
    component: () => import(/* webpackChunkName: "systemm" */ '../views/CategoryList.vue'),
  },
  {
    path: '/categories/edit/:id',
    component: () => import(/* webpackChunkName: "systemm" */ '../views/CategoryEdit.vue'),
    props: true,
  },
  {
    path: '/user-admin/create',
    component: () => import(/* webpackChunkName: "systemm" */ '../views/UserAdminEdit.vue'),
  },
  {
    path: '/user-admin/list',
    component: () => import(/* webpackChunkName: "systemm" */ '../views/UserAdminList.vue'),
  },
  {
    path: '/user-admin/edit/:id',
    component: () => import(/* webpackChunkName: "systemm" */ '../views/UserAdminEdit.vue'),
    props: true,
  },
];
