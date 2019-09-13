import ApiService from "@/common/api.service";

import {
  FETCH_USER_INVITATIONS,
  UPDATE_USER_INVITATION,
  CREATE_ALERT
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
  async [FETCH_USER_INVITATIONS](context) {
    context.commit(SET_USER_INVITATIONS, []);
    const { data } = await ApiService.query("invitations");
    context.commit(SET_USER_INVITATIONS, data);
  },
  async [UPDATE_USER_INVITATION](context, params) {
    const { data } = await ApiService.update("invitations", params.id, { invitation: params });
    context.commit(SET_USER_INVITATIONS, data);

    if(params.accepted) {
      context.dispatch(CREATE_ALERT, ["Invitation accepted.", "success"]);
    } else {
      context.dispatch(CREATE_ALERT, ["Invitation declined.", "success"]);
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