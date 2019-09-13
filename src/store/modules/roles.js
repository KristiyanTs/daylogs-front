import ApiService from "@/common/api.service";

import {
  FETCH_ROLES,
  CREATE_ROLE,
  UPDATE_ROLE,
  DESTROY_ROLE,
  CREATE_ALERT
} from "../actions.type";

import {
  SET_ROLES,
  SET_ROLE,
  ADD_ROLE,
  REMOVE_ROLE
} from "../mutations.type";

const initialState = {
  roles: [],
  new_role: {
    id: "",
    title: "",
    editing: true
  }
}

const state = { ...initialState }

const getters = {
  roles(state) {
    return state.roles;
  }
}

const actions = {
  async [FETCH_ROLES]({ rootState, commit }) {
    const { data } = await ApiService.query(`/nodes/${rootState.projects.project.id}/roles`);
    commit(SET_ROLES, data);
  },
  async [CREATE_ROLE]({ rootState, commit, dispatch }, params) {
    const { data } = await ApiService.post(`/nodes/${rootState.projects.project.id}/roles`, { role: params });
    commit(REMOVE_ROLE, "");
    commit(ADD_ROLE, data);
    dispatch(CREATE_ALERT, ["Role added", "success"]);
  },
  async [UPDATE_ROLE]({ rootState, commit, dispatch }, params) {
    const { data } = await ApiService.update(`/nodes/${rootState.projects.project.id}/roles`, params.id, { role: params });
    commit(SET_ROLE, data);
    dispatch(CREATE_ALERT, ["Role saved", "success"]);
  },
  async [DESTROY_ROLE]({ rootState, commit, dispatch }, role) {
    await ApiService.delete(`/nodes/${rootState.projects.project.id}/roles`, role.id);
    commit(REMOVE_ROLE, role.id);
    dispatch(CREATE_ALERT, ["Role deleted", "success"]);
  }
}

const mutations = {
  [SET_ROLES](state, roles) {
    state.roles = roles;
  },
  [SET_ROLE](state, role) {
    let idx = state.roles.findIndex(r => r.id == role.id);
    state.roles.splice(idx, 1, role);
  },
  [ADD_ROLE](state, role) {
    state.roles.push(role || { ...state.new_role });
  },
  [REMOVE_ROLE](state, role_id) {
    state.roles = state.roles.filter(r => r.id != role_id);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}