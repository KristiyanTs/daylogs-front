import {
  CategoryService
} from "@/common/api.service";

import {
  FETCH_CATEGORIES,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DESTROY_CATEGORY
} from "../actions.type";

import {
  SET_CATEGORIES,
  SET_CATEGORY,
  ADD_CATEGORY,
  REMOVE_CATEGORY
} from "../mutations.type";

const initialState = {
  categories: [],
  category: {

  }
}

const state = { ...initialState }

const getters = {

}

const actions = {
  async [FETCH_CATEGORIES](context, node_id) {

  },
  async [CREATE_CATEGORY](context, params) {

  },
  async [UPDATE_CATEGORY](context) {

  },
  async [DESTROY_CATEGORY](context, node_id) {

  }
}

const mutations = {
  [SET_CATEGORIES](state, categories) {

  },
  [SET_CATEGORY](state, category) {

  },
  [ADD_CATEGORY](state, node) {

  },
  [REMOVE_CATEGORY](state, node_id) {

  }
}

export default {
  state,
  getters,
  actions,
  mutations
}