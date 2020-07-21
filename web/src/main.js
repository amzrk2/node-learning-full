import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

import 'normalize.css';
import './scss/global.scss';
import './scss/classes.scss';
import './scss/spirit.scss';

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
