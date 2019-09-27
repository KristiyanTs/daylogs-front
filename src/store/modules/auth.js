import ApiService from "@/common/api.service";
import JwtService from "@/common/jwt.service";
import router from '@/router';

import {
  UserService
} from "@/common/api.service";

import {
  LOGIN,
  LOGOUT,
  CHECK_AUTH,
  REGISTER,
  UPDATE_USER,
  CREATE_ALERT
} from "../actions.type";

import {
  SET_AUTH,
  PURGE_AUTH,
  SET_ERROR
} from "../mutations.type";

const state = {
  isAuthenticated: false,
  user: {},
  errors: {}
}

const getters = {
  current_user(state) {
    return state.user;
  },
  formatted_name(state) {
    let user = state.user;
    if(!user || !user.name) return "";
    return user.name.split(" ").map((n, idx) => {
      if(idx > 0 && n.length) {
        return n[0].toUpperCase() + ".";
      } else {
        return n;
      }
    }).join(" ");
  }
}

const actions = {
  [LOGIN]({ commit, dispatch }, credentials) {
    return new Promise(resolve => {
      ApiService.post("login", { user: credentials })
        .then(response => {
          dispatch(CREATE_ALERT, ["You logged in successfully.", "success"]);
          commit(SET_AUTH, [response.headers.authorization, response.data]);
          resolve(response.data);
        })
        .catch(error  => {
          commit(SET_ERROR, error);
        });
    });
  },
  [LOGOUT]({ commit, dispatch }) {
    return new Promise(resolve => {
      ApiService.delete("logout")
        .then(() => {
          dispatch(CREATE_ALERT, ["You logged out successfully.", "success"]);
          commit(PURGE_AUTH);
          resolve();
        })
        .catch(response => {
          commit(SET_ERROR, response.data.errors);
        });
    });
  },
  [CHECK_AUTH]({ commit, dispatch }) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("profile")
        .then(response => {
          if(response.data == null) {
            commit(PURGE_AUTH);
            router.push('/login');
            dispatch(CREATE_ALERT, ["Please, log in first"]);
          } else {
            commit(SET_AUTH, [response.config.headers.Authorization, response.data]);
          }
        })
        .catch(response => {
          commit(PURGE_AUTH);
          commit(SET_ERROR, response.data.errors);
          router.push('/login');
          dispatch(CREATE_ALERT, ["Please, log in first"]);
        });
    } else {
      commit(PURGE_AUTH);
      router.push('/login');
      dispatch(CREATE_ALERT, ["Please, log in first"]);
    }
  },
  [REGISTER]({ commit }, user) {
    return new Promise(resolve => {
      ApiService.post("signup", {user: user})
        .then(response => {
          resolve(response.data);
        })
        .catch(error  => {
          commit(SET_ERROR, error);
        });
    });
  },
  async [UPDATE_USER]({ commit }, user) { // should be tested when the back-end is rewritten
    const { data } = await UserService.update(user);
    commit(SET_AUTH, data.user);
    return data;
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
    JwtService.saveToken(token);
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    state.admin = false;
    state.id = null;
    JwtService.destroyToken();
    ApiService.setHeader();
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}