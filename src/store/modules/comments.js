import {
  FETCH_COMMENTS,
  CREATE_COMMENT,
  UPDATE_COMMENT,
  DESTROY_COMMENT,
  CREATE_ALERT
} from "../actions.type";

import {
  SET_COMMENTS,
  SET_COMMENT,
  ADD_COMMENT,
  REMOVE_COMMENT
} from "../mutations.type";

import ApiService from "../../common/api.service";

const state = { 
  comments: [],
  new_comment: {
    id: "",
    ancestry: "",
    content: "",
    node_id: "",
    editing: true
  }
}

const getters = {
  comments(state) {
    return state.comments;
  }
}

const actions = {
  async [FETCH_COMMENTS](context, node_id) {
    const { data } = await ApiService.query(`/nodes/${node_id}/comments`);
    context.commit(SET_COMMENTS, data);
  },
  async [CREATE_COMMENT]({commit, dispatch, rootState}, params) {
    if(params.node_id == "") {
      params.node_id = rootState.nodes.inspected_node.id;
    }
    const { data } = await ApiService.post(`/nodes/${params.node_id}/comments`, { comment: params });
    commit(REMOVE_COMMENT, "");
    commit(ADD_COMMENT, data);
    dispatch(CREATE_ALERT, ["Comment added", "success"]);
  },
  async [UPDATE_COMMENT](context, params) {
    const { data } = await ApiService.put(`/nodes/${params.node_id}/comments/${params.id}`, { comment: params });
    context.commit(SET_COMMENT, data);
  },
  async [DESTROY_COMMENT](context, comment) {
    await ApiService.delete(`/nodes/${comment.node_id}/comments/${comment.id}`);
    context.commit(REMOVE_COMMENT, comment.id);
  }
}

const mutations = {
  [SET_COMMENTS](state, comments) {
    state.comments = comments;
  },
  [SET_COMMENT](state, comment) {
    let idx = state.comments.findIndex(c => c.id == comment.id);
    state.comments.splice(idx, 1, comment);
  },
  [ADD_COMMENT](state, comment) {
    if(!comment) {
      comment = JSON.parse(JSON.stringify(state.new_comment));
    }
    state.comments.push(comment);
  },
  [REMOVE_COMMENT](state, comment_id) {
    let idx = state.comments.findIndex(c => c.id == comment_id);
    state.comments.splice(idx, 1);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}