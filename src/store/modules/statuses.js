import {
  StatusService
} from "@/common/api.service";

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

const initialState = {
  statuses: []
}

const state = { ...initialState }

const getters = {

}

const actions = {
  async [FETCH_STATUSES](context, node_id) {
    const { data } = await StatusService.all(node_id);
    context.commit(SET_STATUSES, data);
  },
  async [CREATE_STATUS](context, params) {
    const { data } = await StatusService.create(context.getters.current_node.id, params);
    context.dispatch(CREATE_ALERT, ["Status added", "success"]);
    context.commit(ADD_STATUS, data);
  },
  async [UPDATE_STATUS](context) {
    const { data } = await StatusService.update()
  },
  async [DESTROY_STATUS](context, status_id) {
    await StatusService.delete(context.getters.current_node.id, status_id);
    context.commit(REMOVE_STATUS, status_id);
  }
}

const mutations = {
  [SET_STATUSES](state, statuses) {
    state.statuses = statuses;
  },
  [SET_STATUS](state, status) {

  },
  [ADD_STATUS](state, status) {

  },
  [REMOVE_STATUS](state, status_id) {

  }
}

export default {
  state,
  getters,
  actions,
  mutations
}