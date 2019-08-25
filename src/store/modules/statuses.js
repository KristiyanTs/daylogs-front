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
    return state.statuses
  }
}

const actions = {
  async [FETCH_STATUSES](context, node_id) {
    const { data } = await StatusService.all(node_id);
    context.commit(SET_STATUSES, data);
  },
  async [CREATE_STATUS](context, params) {
    const { data } = await StatusService.create(context.getters.current_node.id, params);
    context.commit(REMOVE_STATUS, "");
    context.commit(ADD_STATUS, data);
    context.dispatch(CREATE_ALERT, ["Status added", "success"]);
  },
  async [UPDATE_STATUS](context, params) {
    const { data } = await StatusService.update(params);
    context.commit(SET_STATUS, data);
    context.dispatch(CREATE_ALERT, ["Status saved", "success"]);
  },
  async [DESTROY_STATUS](context, status) {
    await StatusService.delete(status.node_id, status.id);
    context.commit(REMOVE_STATUS, status.id);
    context.dispatch(CREATE_ALERT, ["Status deleted", "success"]);
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
    state.statuses.push(status || JSON.parse(JSON.stringify(state.new_status)))
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