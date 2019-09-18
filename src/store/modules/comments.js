import ApiService from "../../common/api.service";

import {
  FETCH_COMMENTS,
  FETCH_REPLIES,
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

const state = {
  comments: [],
  new_comment: {
    id: "",
    ancestry: "",
    content: "",
    node_id: "",
    created_at: "z"
  }
}

const getters = {
  comments(state) {
    return state.comments.filter(c => c.ancestry == null || c.ancestry == "").sort((a, b) => (a.created_at > b.created_at) ? 1 : -1);
  },
  replies(state) {
    return state.comments.filter(c => c.ancestry != null && c.ancestry != "").sort((a, b) => (a.created_at > b.created_at) ? 1 : -1);
  }
}

const actions = {
  async [FETCH_COMMENTS]({ commit }, node_id) {
    const { data } = await ApiService.query(`/nodes/${node_id}/comments`);
    commit(SET_COMMENTS, data);
  },
  async [FETCH_REPLIES](context, comment) {
    const { data } = await ApiService.query(`/nodes/${comment.node_id}/comments`, { 
      comment_id: comment.id 
    });
    data.map(reply => {
      if (context.state.comments.findIndex(c => c.id == reply.id) == -1) {
        context.commit(ADD_COMMENT, reply);
      } else {
        context.commit(SET_COMMENT, reply);
      }
    });
  },
  async [CREATE_COMMENT]({ rootState, commit, dispatch }, params) {
    if (params.node_id == "") {
      params.node_id = rootState.nodes.inspected_node.id;
    }
    const { data } = await ApiService.post(`/nodes/${params.node_id}/comments`, { comment: params });
    commit(REMOVE_COMMENT, "");
    commit(ADD_COMMENT, data);
    dispatch(CREATE_ALERT, ["Comment added", "success"]);
  },
  async [UPDATE_COMMENT]({ commit }, params) {
    const { data } = await ApiService.put(`/nodes/${params.node_id}/comments/${params.id}`, { comment: params });
    commit(SET_COMMENT, data);
  },
  async [DESTROY_COMMENT]({ commit, dispatch }, comment) {
    await ApiService.delete(`/nodes/${comment.node_id}/comments`, comment.id);
    commit(REMOVE_COMMENT, comment.id);
    dispatch(CREATE_ALERT, ["Comment deleted", "success"]);
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
    if (!comment) { // new comment
      comment = { ...state.new_comment };
    } else if (typeof comment == "number") { // passing ancestry
      let ancestry = comment;
      comment = { ...state.new_comment };
      comment.ancestry = ancestry;
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