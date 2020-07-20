import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userdata: {
      username: '',
      userid: '',
    },
  },
  mutations: {
    modUserData(state, userdata) {
      state.userdata.username = userdata.username;
      state.userdata.userid = userdata.userid;
    },
  },
});
