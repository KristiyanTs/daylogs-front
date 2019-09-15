import ApiService from "@/common/api.service";

import {
  FETCH_SUBTREE
} from "../actions.type";

import {
  APPEND_TO_TREE,
  RESET_TREE
} from "../mutations.type";

const state = {
  tree: []
}

const getters = {
  tree(state) {
    return state.tree;
  }
}

const actions = {
  async [FETCH_SUBTREE]({ commit }, node) {
    const { data } = await ApiService.get(`nodes/${node.id}/subtree`);

    const parent = node;
    const children = data;
    commit(APPEND_TO_TREE, { parent, children });
  }
}

const mutations = {
  [APPEND_TO_TREE](state, { parent, children }) {
    if (!state.tree.length) {
      state.tree = [parent];
    }

    function getObject(theObject) {
      var result = null;
      if (theObject instanceof Array) {
        for (var i = 0; i < theObject.length; i++) {
          result = getObject(theObject[i]);
          if (result) {
            break;
          }
        }
      }
      else {
        for (var prop in theObject) {
          if (prop == 'id') {
            if (theObject[prop] == parent.id) {
              return theObject;
            }
          }
          if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
            result = getObject(theObject[prop]);
            if (result) {
              break;
            }
          }
        }
      }
      return result;
    }

    let node = getObject(state.tree);
    node.children = children;
  },
  [RESET_TREE](state) {
    state.tree = [];
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}