import ApiService from "@/common/api.service";
import JwtService from "@/common/jwt.service";

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
  [LOGIN](context, credentials) {
    return new Promise(resolve => {
      ApiService.post("login", { user: credentials })
        .then(response => {
          context.dispatch(CREATE_ALERT, ["You logged in successfully.", "success"]);
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
      ApiService.delete("logout")
        .then(() => {
          context.dispatch(CREATE_ALERT, ["You logged out successfully.", "success"]);
          context.commit(PURGE_AUTH);
          resolve();
        })
        .catch(response => {
          context.commit(SET_ERROR, response.data.errors);
        });
    });
  },
  [CHECK_AUTH](context) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("profile")
        .then(response => {
          context.commit(SET_AUTH, [response.config.headers.Authorization, response.data]);
        })
        .catch(response => {
          context.commit(SET_ERROR, response.data.errors);
        });
    } else {
      context.commit(PURGE_AUTH);
    }
  },
  [REGISTER](context, user) {
    return new Promise(resolve => {
      ApiService.post("signup", {user: user})
        .then(response => {
          resolve(response.data);
        })
        .catch(error  => {
          context.commit(SET_ERROR, error);
        });
    });
  },
  async [UPDATE_USER](context, user) { // should be tested when the back-end is rewritten
    const { data } = await UserService.update(user);
    context.commit(SET_AUTH, data.user);
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