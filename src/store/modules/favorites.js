import {
  FavoriteService
} from "@/common/api.service";

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
  async [FETCH_FAVORITES](context) {
    const { data } = await FavoriteService.all();
    context.commit(SET_FAVORITES, data);
  },
  async [CREATE_FAVORITE](context, params) {
    const { data } = await FavoriteService.create(params);
    context.commit(ADD_FAVORITE, data);
  },
  async [DESTROY_FAVORITE](context, slug) {
    await FavoriteService.delete(slug);
    context.commit(REMOVE_FAVORITE, slug);
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