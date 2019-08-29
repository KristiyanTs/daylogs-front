import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/common/jwt.service";
import { API_URL } from "@/common/config";

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },

  setHeader() {
    Vue.axios.defaults.headers.common[
      "Authorization"
    ] = JwtService.getToken();
  },

  query(resource, params) {
    return Vue.axios.get(resource, params).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  get(resource, slug = "") {
    return Vue.axios.get(`${resource}/${slug}`).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  delete(resource, slug) {
    return Vue.axios.delete(`${resource}/${slug}`).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }
};

export default ApiService;

export const FavoriteService = {
  all() {
    return ApiService.get("favorites");
  },
  create(params) {
    return ApiService.post("favorites", { favorite: params });
  },
  delete(favorite_id) {
    return ApiService.delete("favorites", favorite_id);
  }
};

export const UserService = {
  update(params) {
    return ApiService.put("profile/update", { user: params} );
  }
}

export const NodeService = {
  get(node_id) {
    return ApiService.get("nodes", node_id);
  },
  create(params) {
    return ApiService.post("nodes", { node: params })
  },
  update(params) {
    return ApiService.update("nodes", params.id, { node: params });
  },
  delete(node_id) {
    return ApiService.delete("nodes", node_id);
  }
}

export const CategoryService = {
  all(node_id) {
    return ApiService.query(`/nodes/${node_id}/categories`);
  },
  create(node_id, params) {
    return ApiService.post(`/nodes/${node_id}/categories`, { category: params });
  },
  update(params) {
    return ApiService.put(`/nodes/${params.node_id}/categories/${params.id}`, { category: params });
  },
  delete(node_id, category_id) {
    return ApiService.delete(`/nodes/${node_id}/categories`, category_id);
  }
}

export const StatusService = {
  all(node_id) {
    return ApiService.query(`/nodes/${node_id}/statuses`);
  },
  create(node_id, params) {
    return ApiService.post(`/nodes/${node_id}/statuses`, { status: params });
  },
  update(params) {
    return ApiService.put(`/nodes/${params.node_id}/statuses/${params.id}`, { status: params });
  },
  delete(node_id, status_id) {
    return ApiService.delete(`/nodes/${node_id}/statuses`, status_id);
  }
}

export const RoleService = {
  all(node_id) {
    return ApiService.query(`/nodes/${node_id}/roles`);
  },
  create(node_id, params) {
    return ApiService.post(`/nodes/${node_id}/roles`, { role: params });
  },
  update(params) {
    return ApiService.put(`/nodes/${params.node_id}/roles/${params.id}`, {role: params});
  },
  delete(node_id, role_id) {
    return ApiService.delete(`/nodes/${node_id}/roles`, role_id);
  }
}

export const InvitationService = {
  all(node_id) {
    return ApiService.query(`/nodes/${node_id}/invitations`);
  },
  create(node_id, params) {
    return ApiService.post(`/nodes/${node_id}/invitations`, { invitation: params });
  },
  update(params) {
    return ApiService.put(`/nodes/${params.node_id}/invitations/${params.id}`, { invitation: params });
  },
  delete(node_id, invitation_id) {
    return ApiService.delete(`/nodes/${node_id}/invitations`, invitation_id);
  }
}
