import {
  NodeService
} from "@/common/api.service";

import {
  FETCH_NODE,
  CREATE_NODE,
  UPDATE_NODE,
  DESTROY_NODE,
  CREATE_ALERT,
  FETCH_FAVORITES
} from "../actions.type";

import {
  SET_NODE,
  SET_INSPECTED_NODE,
  ADD_NODE,
  ADD_TASK_NODE,
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
    root_id: "",
    parent_id: "",
    type: "node",
    editing: true
  },
  new_task_node: {
    id: "",
    title: "",
    short_description: "",
    description: "",
    priority: "",
    root_id: "",
    parent_id: "",
    reporter_id: "",
    assigned_id: "",
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
    return state.children.filter(c => c.type == "node" || c.category_id == null);
  },
  child_tasks(state) {
    return state.children.filter(c => c.type == "task" || (c.category_id != "" && c.category_id != null));
  }
}

const actions = {
  async [FETCH_NODE](context, node_id) {
    const { data } = await NodeService.get(node_id);
    context.commit(SET_NODE, data);
  },
  async [CREATE_NODE](context, params) {
    const { data } = await NodeService.create(params);
    context.commit(REMOVE_NODE, "");
    context.commit(ADD_NODE, data);
    context.dispatch(FETCH_FAVORITES);
    context.dispatch(CREATE_ALERT, ["Node added", "success"]);
  },
  async [UPDATE_NODE](context, params) {
    const { data } = await NodeService.update(params);
    context.commit(SET_NODE, data);
    context.dispatch(FETCH_FAVORITES);
    context.dispatch(CREATE_ALERT, ["Node updated", "success"]);
  },
  async [DESTROY_NODE](context, node) {
    await NodeService.delete(node.id);
    context.commit(REMOVE_NODE, node.id);
    context.dispatch(FETCH_FAVORITES);
    context.dispatch(CREATE_ALERT, ["Node deleted", "success"]);
  }
}

const mutations = {
  [SET_NODE](state, node) {
    let idx = state.children.findIndex(n => n.id == node.id);
    if (idx != -1) {
      state.children.splice(idx, 1, node);
    } else {
      state.node = node;
      state.children = node.nodes
    }
  },
  [SET_INSPECTED_NODE](state, node) { // selected the provided one or the first
    state.inspected_node = JSON.parse(JSON.stringify(node)) || state.children[state.children.length - 1];
  },
  [ADD_NODE](state, node) {
    if(!node) {
      node = JSON.parse(JSON.stringify(state.new_node));
    }
    state.children.push(node);
    state.inspected_node = node;
  },
  [ADD_TASK_NODE](state, task) {
    if(!task) {
      task = JSON.parse(JSON.stringify(state.new_task_node));
      task.parent_id = state.node.id;
      task.category_id = this.state.categories.categories[0].id;
      task.status_id = this.state.statuses.statuses[0].id;
    }
    state.children.push(task);
    state.inspected_node = task;
  },
  [REMOVE_NODE](state, node_id) {
    state.children = state.children.filter(c => c.id == node_id);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}