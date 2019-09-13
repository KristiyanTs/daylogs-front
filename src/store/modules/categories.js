import {
  CategoryService
} from "@/common/api.service";

import {
  FETCH_CATEGORIES,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DESTROY_CATEGORY,
  CREATE_ALERT
} from "../actions.type";

import {
  SET_CATEGORIES,
  SET_CATEGORY,
  ADD_CATEGORY,
  REMOVE_CATEGORY
} from "../mutations.type";

const state = { 
  categories: [],
  new_category: {
    id: "",
    title: "",
    description: "",
    color: "#9E9E9E",
    icon: "check",
    icon_color: "#FFFFFF",
    editing: true
  }
}

const getters = {
  categories(state) {
    return state.categories;
  }
}

const actions = {
  async [FETCH_CATEGORIES]({ commit }, node_id) {
    const { data } = await CategoryService.all(node_id);
    commit(SET_CATEGORIES, data);
  },
  async [CREATE_CATEGORY]({ commit, dispatch }, params) {
    const { data } = await CategoryService.create(context.getters.current_node.id, params);
    commit(REMOVE_CATEGORY, "");
    commit(ADD_CATEGORY, data);
    dispatch(CREATE_ALERT, ["Category added", "success"]);
  },
  async [UPDATE_CATEGORY]({ commit, dispatch }, params) {
    const { data } = await CategoryService.update(params);
    commit(SET_CATEGORY, data);
    dispatch(CREATE_ALERT, ["Category saved", "success"]);
  },
  async [DESTROY_CATEGORY]({ commit, dispatch }, category) {
    await CategoryService.delete(category.node_id, category.id);
    commit(REMOVE_CATEGORY, category.id);
    dispatch(CREATE_ALERT, ["Category deleted", "success"]);
  }
}

const mutations = {
  [SET_CATEGORIES](state, categories) {
    state.categories = categories;
  },
  [SET_CATEGORY](state, category) {
    let idx = state.categories.findIndex(c => c.id == category.id);
    state.categories.splice(idx, 1, category);
  },
  [ADD_CATEGORY](state, category) {
    state.categories.push(category || { ...state.new_category })
  },
  [REMOVE_CATEGORY](state, category_id) {
    state.categories = state.categories.filter(c => c.id != category_id)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}