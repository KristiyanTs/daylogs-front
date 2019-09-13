import ApiService from "../../common/api.service";

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
  async [FETCH_CATEGORIES]({ commit, rootState }) {
    const { data } = await ApiService.query(`/nodes/${rootState.projects.project.id}/categories`);
    commit(SET_CATEGORIES, data);
  },
  async [CREATE_CATEGORY]({ commit, dispatch, rootState }, params) {
    const { data } = await ApiService.create(`/nodes/${rootState.projects.project.id}/categories`, { category: params });
    commit(REMOVE_CATEGORY, "");
    commit(ADD_CATEGORY, data);
    dispatch(CREATE_ALERT, ["Category added", "success"]);
  },
  async [UPDATE_CATEGORY]({ commit, dispatch, rootState }, params) {
    const { data } = await ApiService.update(`/nodes/${rootState.projects.project.id}/categories`, params.id, { category: params });
    commit(SET_CATEGORY, data);
    dispatch(CREATE_ALERT, ["Category saved", "success"]);
  },
  async [DESTROY_CATEGORY]({ commit, dispatch, rootState }, category) {
    await ApiService.delete(`/nodes/${rootState.projects.project.id}/categories`, category.id);
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