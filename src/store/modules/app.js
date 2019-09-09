import {
  TOGGLE_NOTIFICATIONS
} from "../actions.type";

import {
  SET_LAYOUT,
  TOGGLE_RESIZABLE,
  TOGGLE_SIDEBAR,
  TOGGLE_SIDEBARRIGHT
} from "../mutations.type";

const state = {
  resizable: false,
  layout2x1: [
    {"x":0,"y":0,"w":4,"h":1,"i":"left"},
    {"x":4,"y":0,"w":6,"h":1,"i":"right"},
  ],
  layout3x2: [
    {"x":0,"y":0,"w":4,"h":2,"i":"1"},
    {"x":4,"y":0,"w":4,"h":2,"i":"2"},
    {"x":8,"y":0,"w":4,"h":2,"i":"3"},
    {"x":0,"y":1,"w":4,"h":3,"i":"4"},
    {"x":4,"y":1,"w":4,"h":3,"i":"5"},
    {"x":8,"y":1,"w":4,"h":3,"i":"6"},
  ],
  sidebar: true,
  sidebarRight: false,
  notificationsOpen: false,
  messagesOpen: false
}

const getters = {
  resizable(state) {
    return state.resizable;
  },
  layout2x1(state) {
    return state.layout2x1
  },
  layout3x2(state) {
    return state.layout3x2;
  },
  sidebar(state) {
    return state.sidebar;
  },
  sidebarRight(state) {
    return state.sidebarRight
  }
}

const actions = {
  [TOGGLE_NOTIFICATIONS]({state, commit}) {
    if(state.notificationsOpen) {
      commit(TOGGLE_NOTIFICATIONS, false);
      commit(TOGGLE_SIDEBARRIGHT, false);
    } else {
      commit(TOGGLE_NOTIFICATIONS, true);
      commit(TOGGLE_SIDEBARRIGHT, true);
    }
  }
}

const mutations = {
  [SET_LAYOUT](state, layout) {
    state.layout2x1 = layout;
  },
  [TOGGLE_RESIZABLE](state) {
    state.resizable = !state.resizable;
  },
  [TOGGLE_SIDEBAR](state) {
    state.sidebar = !state.sidebar;
    if(!state.sidebar) { // sidebar will hide => increase columns
      state.layout2x1 = state.layout2x1.map(c => {
        c["w"] = c["w"] + 1;
        if(c["x"]) c["x"] = c["x"] + 1;
        return c; 
      });
    } else { // sidebar will show => decrease columns
      state.layout2x1 = state.layout2x1.map(c => {
        c["w"] = c["w"] - 1;
        if(c["x"]) c["x"] = c["x"] - 1;
        return c; 
      });
    }
  },
  [TOGGLE_NOTIFICATIONS](state, open) {
    state.notificationsOpen = open;
  },
  [TOGGLE_SIDEBARRIGHT](state, open) {
    state.sidebarRight = open;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}