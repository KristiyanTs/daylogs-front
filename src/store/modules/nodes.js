import {
  NodeService
} from "@/common/api.service";

import {
  FETCH_FAVORITES,
  CREATE_ALERT,
  FETCH_NODE,
  CREATE_NODE,
  UPDATE_NODE,
  DESTROY_NODE
} from "../actions.type";

import {
  SET_NODE,
  ADD_NODE,
  REMOVE_NODE
} from "../mutations.type";

const initialState = {
  node: {
    title: "New",
    description: "",
    reporter: {},
    assigned: {},
    category: {},
    status: {},
    root: {},
    nodes: []
  }
}

const state = { ...initialState }

const getters = {
  current_node(state) {
    return state.node;
  },
  child_nodes(state) {
    return state.node.nodes;
  },
  child_tasks(state) {
    return state.node.nodes;
  }
}

const actions = {
  async [FETCH_NODE](context, node_id) {
    const { data } = await NodeService.get(node_id);
    context.commit(SET_NODE, data);
  },
  async [CREATE_NODE](context, params) {
    context.dispatch(FETCH_FAVORITES);
    context.dispatch(CREATE_ALERT, ["Created successfully", "success"]);
  },
  async [UPDATE_NODE](context) {
    const { data } = await NodeService.update(context.state.node);
    context.commit(SET_NODE, data);
    context.dispatch(FETCH_FAVORITES);
    context.dispatch(CREATE_ALERT, ["Updated successfully", "success"]);
  },
  async [DESTROY_NODE](context, node_id) {
    await NodeService.delete(node_id);
    context.commit(REMOVE_NODE, node_id);
    context.dispatch(FETCH_FAVORITES);
    context.dispatch(CREATE_ALERT, ["Deleted successfully", "success"]);
  }
}

const mutations = {
  [SET_NODE](state, node) {
    state.node = node;
  },
  [ADD_NODE](state, node) {
    state.nodes = state.nodes.push(node);
  },
  [REMOVE_NODE](state, node_id) {
    state.nodes = state.nodes.filter(n => n.id == node_id);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}