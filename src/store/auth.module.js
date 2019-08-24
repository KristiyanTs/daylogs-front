import ApiService from "@/common/api.service";
import JwtService from "@/common/jwt.service";

import {
  LOGIN,
  LOGOUT,
  UPDATE_USER,
  ADD_ALERT
} from "./actions.type";

import {
  SET_AUTH,
  PURGE_AUTH,
  SET_ERROR
} from "./mutations.type";

const state = {
  isAuthenticated: false,
  user: {},
  errors: {}
}

const getters = { }

const actions = {
  [LOGIN](context, credentials) {
    return new Promise(resolve => {
      ApiService.post("/api/login", { user: credentials })
        .then(response => {
          context.dispatch(ADD_ALERT, ["You logged in successfully.", "success"]);
          context.commit(SET_AUTH, [response.headers.authorization, response.data]);
          resolve(response.data);
        })
        .catch(error  => {
          context.commit(SET_ERROR, error);
        });
    });
  },
  [LOGOUT](context) {
    return new Promise(resolve => {
      ApiService.delete("/api/logout")
        .then(() => {
          context.dispatch(ADD_ALERT, ["You logged out successfully.", "success"]);
          context.commit(PURGE_AUTH, data.data);
          this.$router.push("/");
          resolve();
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
        });
    });
  },
  // should be redone
  [UPDATE_USER](context, payload) {
    const { email, username, password, image, bio } = payload;
    const user = {
      email,
      username,
      bio,
      image
    };
    if (password) {
      user.password = password;
    }

    return ApiService.put("user", user).then(({ data }) => {
      context.commit(SET_AUTH, data.user);
      return data;
    });
  }
}

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, [token, user]) {
    state.isAuthenticated = true;
    state.user = user;
    state.errors = {};
    window.$cookies.set("jwt", token);
    window.$cookies.set("user", user);
    JwtService.saveToken(token);
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    state.admin = false;
    state.id = null;
    JwtService.destroyToken();
    this.$axios.defaults.headers.common["Authorization"] = null;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}