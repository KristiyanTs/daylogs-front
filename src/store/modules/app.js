import {
  CREATE_ALERT
} from "../actions.type";

import {
  TOGGLE_RESIZABLE,
} from "../mutations.type";

const state = {
  resizable: false
}

const getters = {
  resizable(state) {
    return state.resizable;
  }
}

const mutations = {
  [TOGGLE_RESIZABLE](state) {
    state.resizable = !state.resizable;
  }
}

export default {
  state,
  getters,
  mutations
}