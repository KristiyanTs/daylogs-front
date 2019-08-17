import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import router from "./router";
import store from "./store";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import axios from "axios";
import { securedAxiosInstance, plainAxiosInstance } from "./backend/axios";
import VueAxios from "vue-axios";
import Vue2Filters from "vue2-filters";
import vSelect from "vue-select";
import moment from "moment";
import Default from "@/layout/Default";
import NoSidebar from "@/layout/NoSidebar";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBold, faItalic, faStrikethrough, faUnderline, faParagraph, faListUl, faListOl, faQuoteRight, faCode, faChevronLeft, faChevronRight, faAngleDoubleLeft, faAngleDoubleRight, faPlus, faCheck, faRedo, faTrashAlt, faSpinner, faUser, faEdit, faSave, faPlay, faPause, faLock, faEllipsisV, faAt, faKey, faSignOutAlt, faTimes, faGripVertical, faStickyNote, faPencilAlt, faCodeBranch, faTasks, faCog, faStar, faRedoAlt, faInfoCircle, faBug, faArrowLeft, faShieldAlt, faBell, faUsersCog } from "@fortawesome/free-solid-svg-icons";
import { faClipboard, faImage } from "@fortawesome/free-regular-svg-icons";
library.add({faBold, faItalic, faStrikethrough, faUnderline, faParagraph, faListUl, faListOl, faQuoteRight, faCode, faChevronLeft, faChevronRight, faAngleDoubleLeft, faAngleDoubleRight, faPlus, faCheck, faRedo, faTrashAlt, faSave, faSpinner, faUser, faEdit, faClipboard, faPlay, faPause, faLock, faEllipsisV, faAt, faKey, faSignOutAlt, faImage, faTimes, faGripVertical, faStickyNote, faPencilAlt, faCodeBranch, faTasks, faCog, faStar, faRedoAlt, faInfoCircle, faBug, faArrowLeft, faShieldAlt, faBell, faUsersCog });

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueAxios, axios);
Vue.use(require("vue-cookies"));
Vue.use(Vue2Filters);
Vue.use(require("vue-moment"));
Vue.component("v-select", vSelect);
Vue.component("default-layout", Default);
Vue.component("no-sidebar-layout", NoSidebar);
Vue.prototype.moment = moment;
const opts = {};
Vue.use(Vuetify);

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
    vuetify: new Vuetify(opts),
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
