import ApiService from "@/common/api.service";
import { NodeHelpers } from "@/common/helpers";

import {
  FETCH_NODE,
  CREATE_NODE,
  CHANGE_INSPECTED_NODE,
  UPDATE_NODE,
  DESTROY_NODE,
  CREATE_ALERT,
  FETCH_FAVORITES,
  FETCH_CATEGORIES,
  FETCH_STATUSES,
  FETCH_COMMENTS,
  SWITCH_PROJECT
} from "../actions.type";

import {
  SET_NODE,
  SET_ACTIVE_NODE,
  SET_INSPECTED_NODE,
  ADD_NODE,
  ADD_TASK_NODE,
  ALTER_NODE,
  REMOVE_NODE
} from "../mutations.type";

const state = {
  node: {},
  children: [],
  inspected_node: {},
  new_node: {
    id: "",
    title: "",
    short_description: "",
    ancestry: "",
    type: "node",
    editing: true
  },
  new_task_node: {
    id: "",
    title: "",
    short_description: "",
    description: "",
    priority: "",
    ancestry: "",
    reporter_id: "",
    status_id: "",
    category_id: "",
    type: "task",
    editing: true
  }
}

const getters = {
  current_node(state) {
    return state.node;
  },
  inspected_node(state) {
    return state.inspected_node;
  },
  child_nodes(state) {
    return state.children ? state.children.filter(c => NodeHelpers.isNode(c)) : [];
  },
  child_tasks(state) {
    return state.children ? state.children.filter(c => NodeHelpers.isTask(c)) : [];
  }
}

const actions = {
  async [FETCH_NODE]({ commit, dispatch }, node_id) {
    if (!node_id) return;

    const { data } = await ApiService.get("nodes", node_id);

    if (!NodeHelpers.areParentAndChild(data, state.node)) {
      dispatch(FETCH_CATEGORIES, data.id);
      dispatch(FETCH_STATUSES, data.id);
    }
    dispatch(FETCH_COMMENTS, data.id);
    commit(SET_ACTIVE_NODE, data);
  },
  async [CREATE_NODE]({ commit, dispatch }, params) {
    const { data } = await ApiService.post("nodes", { node: params });

    commit(REMOVE_NODE, "");
    commit(ADD_NODE, data);

    if (NodeHelpers.isTask(data)) {
      dispatch(CREATE_ALERT, ["Task added", "success"]);
    } else {
      dispatch(CREATE_ALERT, ["Node added", "success"]);
    }
  },
  async [UPDATE_NODE]({ commit, dispatch }, params) {
    const { data } = await ApiService.put(`/nodes/${params.id}`, { node: params });

    commit(ALTER_NODE, data);
    dispatch(FETCH_FAVORITES);
    dispatch(CREATE_ALERT, ["Node updated", "success"]);
  },
  async [DESTROY_NODE]({ commit, dispatch, state }, node) {
    if (node.id != state.node.id && state.children.length > 1) {
      dispatch(CHANGE_INSPECTED_NODE, state.children[0]);
    } else if (node.id != state.node.id) {
      dispatch(CHANGE_INSPECTED_NODE, state.node);
    } else {
      // change active and inspected node to parent (you have to include it into the fetch first)
    }

    if (node.id == "") {
      commit(REMOVE_NODE, "");
      return;
    }

    await ApiService.delete("nodes", node.id);
    commit(REMOVE_NODE, node.id);
    dispatch(FETCH_FAVORITES);

    if (NodeHelpers.isProject(node)) {
      dispatch(CREATE_ALERT, ["Project deleted", "success"]);
      dispatch(SWITCH_PROJECT, null);
    } else if (NodeHelpers.isTask(node)) {
      dispatch(CREATE_ALERT, ["Task deleted", "success"]);
    } else {
      dispatch(CREATE_ALERT, ["Node deleted", "success"]);
    }
  },
  [CHANGE_INSPECTED_NODE]({ commit, dispatch }, node) {
    if (node && node.id) {
      dispatch(FETCH_COMMENTS, node.id);
    }
    commit(SET_INSPECTED_NODE, node)
  }
}

const mutations = {
  [SET_NODE](state, node) {
    state.node = node;
    state.children = state.node.children;
    state.inspected_node = state.node;
  },
  [SET_ACTIVE_NODE](state, node) {
    state.node = node;
    state.children = state.node.children;
    state.inspected_node = state.node;
  },
  [SET_INSPECTED_NODE](state, node) { // select the provided one or the first
    state.inspected_node = { ...node } || state.children[state.children.length - 1];
  },
  [ADD_NODE](state, node) {
    if (!node) {
      node = { ...state.new_node };
      node.ancestry = state.node.id;
    }
    state.children.push(node);
    state.inspected_node = node;
  },
  [ADD_TASK_NODE](state, task) {
    if (!task) {
      task = { ...state.new_task_node };
      task.ancestry = state.node.id;
      task.category_id = this.state.categories.categories[0].id;
      task.status_id = this.state.statuses.statuses[0].id;
    }
    state.children.push(task);
    state.inspected_node = task;
  },
  [ALTER_NODE](state, node) {
    if (state.node.id == node.id) {
      state.node = node;
    } else {
      let idx = state.node.children.findIndex(c => c.id == node.id);
      state.node.children.splice(idx, 1, node);
    }
  },
  [REMOVE_NODE](state, node_id) {
    state.children = state.children.filter(c => c.id != node_id);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}