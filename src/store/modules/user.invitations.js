import ApiService from "@/common/api.service";

import {
  FETCH_USER_INVITATIONS,
  UPDATE_USER_INVITATION,
  CREATE_ALERT,
  FETCH_PROJECTS
} from "../actions.type";

import {
  SET_USER_INVITATIONS
} from "../mutations.type";

const state = { 
  user_invitations: []
}

const getters = {
  user_invitations(state) {
    return state.user_invitations;
  }
}

const actions = {
  async [FETCH_USER_INVITATIONS]({ commit }) {
    commit(SET_USER_INVITATIONS, []);
    const { data } = await ApiService.query("users/invitations");
    commit(SET_USER_INVITATIONS, data);
  },
  async [UPDATE_USER_INVITATION]({ commit, dispatch}, params) {
    const { data } = await ApiService.update("users/invitations", params.id, { invitation: params });
    commit(SET_USER_INVITATIONS, data);

    if(params.accepted) {
      dispatch(FETCH_PROJECTS);
      dispatch(CREATE_ALERT, ["Invitation accepted.", "success"]);
    } else {
      dispatch(CREATE_ALERT, ["Invitation declined.", "success"]);
    }
  }
}

const mutations = {
  [SET_USER_INVITATIONS](state, invitations) {
    state.user_invitations = invitations;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}