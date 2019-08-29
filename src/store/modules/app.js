import {
  SET_LAYOUT,
  TOGGLE_RESIZABLE,
} from "../mutations.type";

const state = {
  resizable: false,
  layout: [
    {"x":0,"y":0,"w":4,"h":1,"i":"0"},
    {"x":4,"y":0,"w":6,"h":1,"i":"1"},
  ]
}

const getters = {
  resizable(state) {
    return state.resizable;
  },
  layout(state) {
    return state.layout
  }
}

const mutations = {
  [SET_LAYOUT](state, layout) {
    state.layout = layout;
  },
  [TOGGLE_RESIZABLE](state) {
    state.resizable = !state.resizable;
  }
}

export default {
  state,
  getters,
  mutations
}