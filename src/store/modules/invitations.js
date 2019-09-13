import {
  InvitationService
} from "@/common/api.service";

import {
  FETCH_INVITATIONS,
  CREATE_INVITATION,
  UPDATE_INVITATION,
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
    const { data } = await InvitationService.all(rootState.project.id);
    commit(SET_INVITATIONS, data);
  },
  async [CREATE_INVITATION]({rootState, commit, dispatch}, params) {
    const { data } = await InvitationService.create(rootState.project.id, params);
    commit(REMOVE_INVITATION, "");
    commit(ADD_INVITATION, data);
    dispatch(CREATE_ALERT, ["Invitation sent", "success"]);
  },
  async [UPDATE_INVITATION](context, params) {
    const { data } = await InvitationService.update(params);
    context.commit(SET_INVITATION, data);
    context.dispatch(CREATE_ALERT, ["Response saved", "success"]);
  },
  async [DESTROY_INVITATION](context, invitation) {
    await InvitationService.delete(invitation.node_id, invitation.id);
    context.commit(REMOVE_INVITATION, invitation.id);
    context.dispatch(CREATE_ALERT, ["Invitation withdrawn", "success"]);
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