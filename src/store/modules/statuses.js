import ApiService from "@/common/api.service";

import {
  FETCH_STATUSES,
  CREATE_STATUS,
  UPDATE_STATUS,
  DESTROY_STATUS,
  CREATE_ALERT
} from "../actions.type";

import {
  SET_STATUSES,
  SET_STATUS,
  ADD_STATUS,
  REMOVE_STATUS
} from "../mutations.type";

const state = { 
  statuses: [],
  new_status: {
    id: "",
    title: "",
    color: "#9E9E9E",
    description: "",
    editing: true
  }
}

const getters = {
  statuses(state) {
    return state.statuses;
  }
}

const actions = {
  async [FETCH_STATUSES]({ commit, rootState }) {
    const { data } = await ApiService.query(`/nodes/${rootState.projects.project.id}/statuses`);
    commit(SET_STATUSES, data);
  },
  async [CREATE_STATUS]({ dispatch, commit, rootState }, params) {
    const { data } = await ApiService.post(`/nodes/${rootState.projects.project.id}/statuses`, { status: params });
    commit(REMOVE_STATUS, "");
    commit(ADD_STATUS, data);
    dispatch(CREATE_ALERT, ["Status added", "success"]);
  },
  async [UPDATE_STATUS]({ dispatch, commit, rootState }, params) {
    const { data } = await ApiService.update(`/nodes/${rootState.projects.project.id}/statuses`, params.id, { status: params });
    commit(SET_STATUS, data);
    dispatch(CREATE_ALERT, ["Status saved", "success"]);
  },
  async [DESTROY_STATUS]({ dispatch, commit, rootState }, status) {
    await ApiService.delete(`/nodes/${rootState.projects.project.id}/statuses`, status.id);
    commit(REMOVE_STATUS, status.id);
    dispatch(CREATE_ALERT, ["Status deleted", "success"]);
  }
}

const mutations = {
  [SET_STATUSES](state, statuses) {
    state.statuses = statuses;
  },
  [SET_STATUS](state, status) {
    let idx = state.statuses.findIndex(s => s.id == status.id);
    state.statuses.splice(idx, 1, status);
  },
  [ADD_STATUS](state, status) {
    if(!status) {
      status = { ...state.new_status };
      status.order = state.statuses.length;
    }
    state.statuses.push(status);
  },
  [REMOVE_STATUS](state, status_id) {
    state.statuses = state.statuses.filter(s => s.id != status_id)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}