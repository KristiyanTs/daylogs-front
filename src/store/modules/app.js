import {
  TOGGLE_NOTIFICATIONS,
  TOGGLE_INVITATIONS_DIALOG,
  FETCH_USER_INVITATIONS
} from "../actions.type";

import {
  SET_LAYOUT,
  TOGGLE_RESIZABLE,
  TOGGLE_SIDEBAR,
  TOGGLE_SIDEBARRIGHT,
  SET_INVITATIONS_DIALOG
} from "../mutations.type";

const state = {
  resizable: false,
  layout2x1: [
    {"x":0,"y":0,"w":5,"h":1,"i":"left"},
    {"x":5,"y":0,"w":7,"h":1,"i":"right"},
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
  messagesOpen: false,
  invitationsOpen: false
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
  sidebar(state, _, rootState) {
    return state.sidebar && rootState.projects.project.hasOwnProperty('id');
  },
  sidebarRight(state) {
    return state.sidebarRight;
  },
  invitationsDialog(state) {
    return state.invitationsOpen;
  }
}

const actions = {
  [TOGGLE_NOTIFICATIONS]({ commit }) {
    if(state.notificationsOpen) {
      commit(TOGGLE_NOTIFICATIONS, false);
      commit(TOGGLE_SIDEBARRIGHT, false);
    } else {
      commit(TOGGLE_NOTIFICATIONS, true);
      commit(TOGGLE_SIDEBARRIGHT, true);
    }
  },
  [TOGGLE_INVITATIONS_DIALOG]({ commit, dispatch }, open) {
    if(open) {
      dispatch(FETCH_USER_INVITATIONS);
    }
    commit(SET_INVITATIONS_DIALOG, open);
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
  },
  [TOGGLE_NOTIFICATIONS](state, open) {
    state.notificationsOpen = open;
  },
  [TOGGLE_SIDEBARRIGHT](state, open) {
    state.sidebarRight = open;
  },
  [SET_INVITATIONS_DIALOG](state, open) {
    state.invitationsOpen = open;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}