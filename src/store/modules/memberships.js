import ApiService from "@/common/api.service";

import {
  FETCH_MEMBERSHIPS,
  UPDATE_MEMBERSHIP,
  DESTROY_MEMBERSHIP,
  CREATE_ALERT
} from "../actions.type";

import {
  SET_MEMBERSHIPS,
  SET_MEMBERSHIP,
  ADD_MEMBERSHIP,
  REMOVE_MEMBERSHIP
} from "../mutations.type";

const state = { 
  memberships: []
}

const getters = {
  memberships(state) {
    return state.memberships;
  }
}

const actions = {
  async [FETCH_MEMBERSHIPS]({ commit, rootState }) {
    const { data } = ApiService.query(`/nodes/${rootState.project.id}/memberships`);
    commit(SET_MEMBERSHIPS, data);
  },
  async [UPDATE_MEMBERSHIP]({ dispatch, commit, rootState }, params) {
    const { data } = await ApiService.update(`/nodes/${rootState.project.id}/memberships`, params.id, { membership: params });
    commit(SET_MEMBERSHIP, data);
    dispatch(CREATE_ALERT, ["Membership updated.", "success"]);
  },
  async [DESTROY_MEMBERSHIP]({ commit, dispatch }, membership_id) {
    await ApiService.delete(`/nodes/${rootState.project.id}/memberships`, membership_id);
    commit(REMOVE_MEMBERSHIP, membership_id);
    dispatch(CREATE_ALERT, ["Member removed.", "success"]);
  }
}

const mutations = {
  [SET_MEMBERSHIPS](state, memberships) {
    state.memberships = memberships;
  },
  [SET_MEMBERSHIP](state, membership) {
    let idx = state.membership.findIndex(m => m.id == membership.id);
    state.membership.splice(idx, 1, membership);
  },
  [ADD_MEMBERSHIP](state, membership) {
    state.memberships.push(membership);
  },
  [REMOVE_MEMBERSHIP](state, membership_id) {
    state.memberships = state.memberships.filter(m => m.id != membership_id)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}