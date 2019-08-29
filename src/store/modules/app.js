import {
  SET_LAYOUT,
  TOGGLE_RESIZABLE,
  TOGGLE_SIDEBAR
} from "../mutations.type";

const state = {
  resizable: false,
  layout: [
    {"x":0,"y":0,"w":4,"h":1,"i":"left"},
    {"x":4,"y":0,"w":6,"h":1,"i":"right"},
  ],
  sidebar: true
}

const getters = {
  resizable(state) {
    return state.resizable;
  },
  layout(state) {
    return state.layout
  },
  sidebar(state) {
    return state.sidebar;
  }
}

const mutations = {
  [SET_LAYOUT](state, layout) {
    state.layout = layout;
  },
  [TOGGLE_RESIZABLE](state) {
    state.resizable = !state.resizable;
  },
  [TOGGLE_SIDEBAR](state) {
    state.sidebar = !state.sidebar;
    if(!state.sidebar) { // sidebar will hide => increase columns
      state.layout = state.layout.map(c => {
        c["w"] = c["w"] + 1;
        if(c["x"]) c["x"] = c["x"] + 1;
        return c; 
      });
    } else { // sidebar will show => decrease columns
      state.layout = state.layout.map(c => {
        c["w"] = c["w"] - 1;
        if(c["x"]) c["x"] = c["x"] - 1;
        return c; 
      });
    }
  }
}

export default {
  state,
  getters,
  mutations
}