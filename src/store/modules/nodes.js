import {
  NodeService
} from "@/common/api.service";

import {
  FETCH_NODE,
  CREATE_NODE,
  UPDATE_NODE,
  DESTROY_NODE,
  CREATE_ALERT,
  FETCH_FAVORITES,
  FETCH_CATEGORIES,
  FETCH_STATUSES
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
  async [FETCH_NODE]({commit, dispatch, state}, node_id) {
    const { data } = await NodeService.get(node_id);
    if (!state.node.id || (state.node.id != data.parent_id && state.node.parent_id != data.id)) { // don't always load the categories and statuses
      dispatch(FETCH_CATEGORIES, data.id);
      dispatch(FETCH_STATUSES, data.id);
    }
    commit(SET_ACTIVE_NODE, data);
  },
  async [CREATE_NODE](context, params) {
    const { data } = await NodeService.create(params);
    context.commit(REMOVE_NODE, "");
    context.commit(ADD_NODE, data);
    context.dispatch(FETCH_FAVORITES);

    if (data.root_id == null) {
      context.dispatch(CREATE_ALERT, ["Project created", "success"]);
    } else if (data.category_id != null && data.category_id != "") {
      context.dispatch(CREATE_ALERT, ["Task added", "success"]);
    } else {
      context.dispatch(CREATE_ALERT, ["Node added", "success"]);
    }
  },
  async [UPDATE_NODE](context, params) {
    const { data } = await NodeService.update(params);
    context.commit(ALTER_NODE, data);
    context.dispatch(CREATE_ALERT, ["Node updated", "success"]);
  },
  async [DESTROY_NODE](context, node) {
    await NodeService.delete(node.id); // remove from server
    context.commit(REMOVE_NODE, node.id); // remove locally
    context.dispatch(FETCH_FAVORITES); // check if favorites changed
    context.dispatch(CREATE_ALERT, ["Node deleted", "success"]);
    context.commit(SET_INSPECTED_NODE, null); // set a new inspected node
  }
}

const mutations = {
  [SET_NODE](state, node) {
    state.node = node;
    state.children = state.node.nodes;
    state.inspected_node = state.node;
  },
  [SET_ACTIVE_NODE](state, node) {
    state.node = node;
    state.children = state.node.nodes;
    state.inspected_node = state.node;
  },
  [SET_INSPECTED_NODE](state, node) { // selected the provided one or the first
    state.inspected_node = JSON.parse(JSON.stringify(node)) || state.children[state.children.length - 1];
  },
  [ADD_NODE](state, node) {
    if(!node) {
      node = JSON.parse(JSON.stringify(state.new_node));
      node.parent_id = state.node.id;
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
  [ALTER_NODE](state, node) {
    if(state.node.id == node.id) {
      state.node = node;
    } else {
      let idx = state.node.nodes.findIndex(c => c.id == node.id);
      state.node.nodes.splice(idx, 1, node);
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