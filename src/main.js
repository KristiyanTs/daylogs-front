import Vue from "vue/dist/vue.js";
import App from "./App.vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import router from "./router";
import store from "./store";
import Argon from "./plugins/argon-kit";
import Axios from 'axios';
import DisableAutocomplete from "vue-disable-autocomplete";
import Vue2Filters from "vue2-filters";
import vSelect from "vue-select";
import moment from "moment";
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
  faSignOutAlt
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
  faImage
});
Vue.prototype.moment = moment;
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Argon);
Vue.use(require("vue-cookies"));
Vue.use(DisableAutocomplete);
Vue.use(Vue2Filters);
Vue.use(require("vue-moment"));
Vue.component("v-select", vSelect);

Vue.config.productionTip = false;

document.addEventListener("DOMContentLoaded", () => {
  let v = new Vue({
    store,
    router,
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
