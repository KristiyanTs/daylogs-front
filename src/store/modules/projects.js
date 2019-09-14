import ApiService from "@/common/api.service";

import {
  FETCH_PROJECTS,
  SWITCH_PROJECT,
  UPDATE_PROJECT,
  FETCH_NODE,
  FETCH_FAVORITES,
  CREATE_PROJECT,
  CREATE_ALERT,
  FETCH_CATEGORIES,
  FETCH_STATUSES
} from "../actions.type";

import {
  SET_PROJECTS,
  SET_PROJECT,
  SET_ACTIVE_PROJECT
} from "../mutations.type";

const state = {
  projects: [],
  project: {}
}

const getters = {
  active_project(state) {
    return state.project;
  },
  projects(state) {
    return state.projects;
  }
}

const actions = {
  async [FETCH_PROJECTS]({ commit }) {
    const { data } = await ApiService.get("nodes/user_projects");
    commit(SET_PROJECTS, data);
  },
  [SWITCH_PROJECT]({ commit, dispatch }, project_id) {
    let project;

    if (project_id) {
      let idx = state.projects.findIndex(p => p.id == project_id);
      if (idx != -1) {
        project = state.projects[idx];
      } else {
        project = state.projects[0];
      }
    } else {
      project = state.projects[0];
    }

    commit(SET_ACTIVE_PROJECT, project);
    dispatch(FETCH_NODE, project.id);
    dispatch(FETCH_FAVORITES);
    dispatch(FETCH_CATEGORIES);
    dispatch(FETCH_STATUSES);
  },
  async [CREATE_PROJECT]({ dispatch }, params) {
    const { data } = await ApiService.post("nodes", { node: params });

    dispatch(FETCH_PROJECTS)
      .then(() => {
        dispatch(SWITCH_PROJECT, data.id);
      })
    dispatch(CREATE_ALERT, ["Project created", "success"]);
  },
  async [UPDATE_PROJECT]({ commit, dispatch }, params) {
    const { data } = await ApiService.update("nodes", params.id, { node: params });

    commit(SET_PROJECT, data);
    commit(SET_ACTIVE_PROJECT, data);
    dispatch(CREATE_ALERT, ["Project updated", "success"]);
  }
}

const mutations = {
  [SET_PROJECTS](state, projects) {
    state.projects = projects;
  },
  [SET_PROJECT](state, project) {
    let idx = state.projects.findIndex(p => p.id == project.id);
    state.projects.splice(idx, 1, project);
  },
  [SET_ACTIVE_PROJECT](state, project) {
    state.project = project;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}