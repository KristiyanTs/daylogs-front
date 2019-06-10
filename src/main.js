import Vue from "vue/dist/vue.js";
import App from "./App.vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import router from "./router";
import store from "./store";
import Argon from "./plugins/argon-kit";
import axios from "axios";
import DisableAutocomplete from "vue-disable-autocomplete";
import { securedAxiosInstance, plainAxiosInstance } from "./backend/axios";
import VueAxios from "vue-axios";
import Vue2Filters from "vue2-filters";
import vSelect from "vue-select";
import moment from "moment";
import VueScrollStop from "vue-scroll-stop";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBold,
  faItalic,
  faStrikethrough,
  faUnderline,
  faParagraph,
  faListUl,
  faListOl,
  faQuoteRight,
  faCode,
  faChevronLeft,
  faChevronRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faPlus,
  faCheck,
  faRedo,
  faTrashAlt,
  faSpinner,
  faTasks,
  faHeadphones,
  faUser,
  faEdit,
  faSave,
  faPlay,
  faPause,
  faLock,
  faEllipsisV,
  faAt,
  faKey,
  faSignOutAlt,
  faTimes,
  faGripVertical
} from "@fortawesome/free-solid-svg-icons";

import { faClipboard, faImage } from "@fortawesome/free-regular-svg-icons";

library.add({
  faBold,
  faItalic,
  faStrikethrough,
  faUnderline,
  faParagraph,
  faListUl,
  faListOl,
  faQuoteRight,
  faCode,
  faChevronLeft,
  faChevronRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faPlus,
  faCheck,
  faRedo,
  faTrashAlt,
  faSave,
  faSpinner,
  faTasks,
  faHeadphones,
  faUser,
  faEdit,
  faClipboard,
  faPlay,
  faPause,
  faLock,
  faEllipsisV,
  faAt,
  faKey,
  faSignOutAlt,
  faImage,
  faTimes,
  faGripVertical
});

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Argon);
Vue.use(VueAxios, axios);
Vue.use(VueScrollStop)
Vue.use(require("vue-cookies"));
Vue.use(DisableAutocomplete);
Vue.use(Vue2Filters);
Vue.use(require("vue-moment"));
Vue.component("v-select", vSelect);
Vue.prototype.moment = moment;

Vue.config.productionTip = false;
Vue.use(VueAxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance
});

document.addEventListener("DOMContentLoaded", () => {
  let v = new Vue({
    store,
    router,
    securedAxiosInstance,
    plainAxiosInstance,
    components: { App },
    template: "<App/>"
  }).$mount("#app");
  store.$axios = v.axios;
  if (window.$cookies.get("userId") && window.$cookies.get("jwt")) {
    v.$store.dispatch("signedIn", [
      window.$cookies.get("jwt"),
      window.$cookies.get("userId"),
      window.$cookies.get("admin")
    ]);
  }
  global.vm = v; //Define you app variable globally
});
