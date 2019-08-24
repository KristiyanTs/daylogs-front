import Vue from "vue";
import Vuex from "vuex";
// import createPersistedState from "vuex-persistedstate";

import alerts from "./alerts.module";
import auth from "./auth.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    alerts,
    auth
  },
  // plugins: [createPersistedState()]
})