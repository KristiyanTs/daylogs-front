import ApiService from "@/common/api.service";

import {
  FETCH_INVITATIONS,
  CREATE_INVITATION,
  DESTROY_INVITATION,
  CREATE_ALERT
} from "../actions.type";

import {
  SET_INVITATIONS,
  SET_INVITATION,
  ADD_INVITATION,
  REMOVE_INVITATION
} from "../mutations.type";

const state = { 
  invitations: [],
  new_invitation: {
    id: "",
    email: "",
    role_id: "",
    editing: true
  }
}

const getters = {
  invitations(state) {
    return state.invitations;
  }
}

const actions = {
  async [FETCH_INVITATIONS]({ rootState, commit }) {
    const { data } = await ApiService.query(`/nodes/${rootState.projects.project.id}/invitations`);
    commit(SET_INVITATIONS, data);
  },
  async [CREATE_INVITATION]({rootState, commit, dispatch}, params) {
    const { data } = await ApiService.post(`/nodes/${rootState.projects.project.id}/invitations`, { invitation: params });
    commit(REMOVE_INVITATION, "");
    commit(ADD_INVITATION, data);
    dispatch(CREATE_ALERT, ["Invitation sent", "success"]);
  },
  async [DESTROY_INVITATION]({rootState, commit, dispatch}, invitation) {
    await ApiService.delete(`/nodes/${rootState.projects.project.id}/invitations`, invitation.id);
    commit(REMOVE_INVITATION, invitation.id);
    dispatch(CREATE_ALERT, ["Invitation withdrawn", "success"]);
  }
}

const mutations = {
  [SET_INVITATIONS](state, invitations) {
    state.invitations = invitations;
  },
  [SET_INVITATION](state, invitation) {
    let idx = state.invitations.findIndex(i => i.id == invitation.id);
    state.invitations.splice(idx, 1, invitation);
  },
  [ADD_INVITATION](state, invitation) {
    state.invitations.push(invitation || { ...state.new_invitation })
  },
  [REMOVE_INVITATION](state, invitation_id) {
    state.invitations = state.invitations.filter(i => i.id != invitation_id)
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}