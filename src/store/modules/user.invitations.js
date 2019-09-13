import ApiService from "@/common/api.service";

import {
  FETCH_USER_INVITATIONS,
  UPDATE_USER_INVITATION,
  CREATE_ALERT
} from "../actions.type";

import {
  SET_USER_INVITATIONS,
  SET_USER_INVITATION
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
  async [FETCH_USER_INVITATIONS](context) {
    const { data } = await ApiService.query("invitations");
    context.commit(SET_USER_INVITATIONS, data);
  },
  async [UPDATE_USER_INVITATION](context, params) {
    const { data } = await ApiService.update("invitations", params.id, { invitation: params });
    context.commit(SET_USER_INVITATION, data);
    context.dispatch(CREATE_ALERT, ["Response saved", "success"]);
  }
}

const mutations = {
  [SET_USER_INVITATIONS](state, invitations) {
    state.user_invitations = invitations;
  },
  [SET_USER_INVITATION](state, invitation) {
    let idx = state.user_invitations.findIndex(i => i.id == invitation.id);
    state.user_invitations.splice(idx, 1, invitation);
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}