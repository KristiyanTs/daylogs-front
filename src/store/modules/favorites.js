import ApiService from "@/common/api.service";

import {
  FETCH_FAVORITES,
  CREATE_FAVORITE,
  DESTROY_FAVORITE,
} from "../actions.type";

import {
  SET_FAVORITES,
  ADD_FAVORITE,
  REMOVE_FAVORITE
} from "../mutations.type";

const state = {
  favorites: []
}

const getters = {
  favorites(state) {
    return state.favorites;
  }
}

const actions = {
  async [FETCH_FAVORITES]({ rootState, commit }) {
    const { data } = await ApiService.query("favorites", { root_id: rootState.projects.project.id });
    commit(SET_FAVORITES, data);
  },
  async [CREATE_FAVORITE]({ commit }, params) {
    const { data } = await ApiService.post("favorites", { favorite: params });
    commit(ADD_FAVORITE, data);
  },
  async [DESTROY_FAVORITE]({ commit }, slug) {
    await ApiService.delete("favorites", slug);
    commit(REMOVE_FAVORITE, slug);
  }
}

const mutations = {
  [SET_FAVORITES](state, favorites) {
    state.favorites = favorites;
  },
  [ADD_FAVORITE](state, node) {
    state.favorites.push(node);
  },
  [REMOVE_FAVORITE](state, node_id) {
    state.favorites = state.favorites.filter(f => f.id != node_id);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}