import ApiService from "@/common/api.service";

import {
  FETCH_PROJECTS,
  SWITCH_PROJECT,
  UPDATE_PROJECT,
  DESTROY_PROJECT,
  FETCH_FAVORITES,
  CREATE_PROJECT,
  CREATE_ALERT,
  FETCH_CATEGORIES,
  FETCH_STATUSES,
  FETCH_MEMBERSHIPS,
  FETCH_ROLES
} from "../actions.type";

import {
  SET_PROJECTS,
  SET_PROJECT,
  SET_ACTIVE_PROJECT,
  REMOVE_PROJECT
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
  async [FETCH_PROJECTS]({ commit, dispatch }) {
    const { data } = await ApiService.get("users/projects");
    commit(SET_PROJECTS, data);
    dispatch(SWITCH_PROJECT);
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
    
    dispatch(FETCH_FAVORITES);
    dispatch(FETCH_CATEGORIES);
    dispatch(FETCH_STATUSES);
    dispatch(FETCH_MEMBERSHIPS);
    dispatch(FETCH_ROLES);
  },
  async [CREATE_PROJECT]({ dispatch }, params) {
    const { data } = await ApiService.post("users/projects", { project: params });

    dispatch(FETCH_PROJECTS)
      .then(() => {
        dispatch(SWITCH_PROJECT, data.id);
      })
    dispatch(CREATE_ALERT, ["Project created", "success"]);
  },
  async [UPDATE_PROJECT]({ commit, dispatch }, params) {
    const { data } = await ApiService.update("users/projects", params.id, { node: params });

    commit(SET_PROJECT, data);
    commit(SET_ACTIVE_PROJECT, data);
    dispatch(CREATE_ALERT, ["Project updated", "success"]);
  },
  async [DESTROY_PROJECT]({ commit, dispatch }, project) {
    await ApiService.delete("users/projects", project.id);

    commit(REMOVE_PROJECT, project);
    dispatch(CREATE_ALERT, ["Project deleted", "success"]);
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
  },
  [REMOVE_PROJECT](state, project) {
    state.projects = state.projects.filter(p => p.id != project.id);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}