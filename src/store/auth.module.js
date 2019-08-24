import ApiService from "@/common/api.service";
import JwtService from "@/common/jwt.service";

import {
  LOGIN,
  LOGOUT,
  CHECK_AUTH,
  UPDATE_USER,
  CREATE_ALERT
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
        .catch(response => { //probably not working
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
          context.commit(SET_ERROR, response.data.errors); //probably not working
        });
    } else {
      context.commit(PURGE_AUTH);
    }
  },
  [UPDATE_USER](context, payload) { // should be redone
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