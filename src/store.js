import Vue from "vue/dist/vue.js";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    signedIn: false,
    admin: "",
    id: "",
    alerts: []
  },
  mutations: {
    SIGNED_IN(state, [token, userId, admin]) {
      this.$axios.defaults.headers.common["Authorization"] = token;
      state.signedIn = true;
      state.admin = admin;
      state.userId = userId;
    },
    SIGNED_OUT(state) {
      window.$cookies.remove("jwt");
      window.$cookies.remove("userId");
      window.$cookies.remove("admin");
      state.signedIn = false;
      state.userId = "";
      state.admin = false;
      this.$axios.defaults.headers.common["Authorization"] = null;
    },
    ADD_ALERT(state, [message, status]) {
      let self = this;
      state.alerts.push([message, status]);
      setTimeout(
        () => self.commit("REMOVE_ALERT", message),
        700 + message.length * 70
      );
    },
    REMOVE_ALERT(state, message) {
      state.alerts = state.alerts.filter(([msg, _status]) => msg != message);
    }
  },
  actions: {
    signedIn(_state, [token, userId, admin]) {
      window.$cookies.set("jwt", token);
      window.$cookies.set("userId", userId);
      window.$cookies.set("admin", admin);
      this.commit("SIGNED_IN", [token, userId, admin]);
    },
    signedOut(_state) {
      let self = this;
      self.commit("SIGNED_OUT");
      this.$axios
        .delete("/api/logout")
        .then(_response => {
          self.commit("ADD_ALERT", ["You logged out successfully.", "success"]);
        })
        .catch(_error =>
          self.commit("ADD_ALERT", ["Something went wrong.", "warning"])
        );
    }
  }
});