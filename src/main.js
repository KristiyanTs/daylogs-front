import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ApiService from "./common/api.service";
import { CHECK_AUTH } from "@/store/actions.type";

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import Default from "@/layout/Default";
import NoSidebar from "@/layout/NoSidebar";

import Vue2Filters from "vue2-filters";
import vSelect from "vue-select";
import moment from "moment";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBold, faItalic, faStrikethrough, faUnderline, faParagraph, faListUl, faListOl, faQuoteRight, faCode, faChevronLeft, faChevronRight, faAngleDoubleLeft, faAngleDoubleRight, faPlus, faCheck, faRedo, faTrashAlt, faSpinner, faUser, faEdit, faSave, faPlay, faPause, faLock, faEllipsisV, faAt, faKey, faSignOutAlt, faTimes, faGripVertical, faStickyNote, faPencilAlt, faCodeBranch, faTasks, faCog, faStar, faRedoAlt, faInfoCircle, faBug, faArrowLeft, faShieldAlt, faBell, faUsersCog } from "@fortawesome/free-solid-svg-icons";
import { faClipboard, faImage } from "@fortawesome/free-regular-svg-icons";
library.add({faBold, faItalic, faStrikethrough, faUnderline, faParagraph, faListUl, faListOl, faQuoteRight, faCode, faChevronLeft, faChevronRight, faAngleDoubleLeft, faAngleDoubleRight, faPlus, faCheck, faRedo, faTrashAlt, faSave, faSpinner, faUser, faEdit, faClipboard, faPlay, faPause, faLock, faEllipsisV, faAt, faKey, faSignOutAlt, faImage, faTimes, faGripVertical, faStickyNote, faPencilAlt, faCodeBranch, faTasks, faCog, faStar, faRedoAlt, faInfoCircle, faBug, faArrowLeft, faShieldAlt, faBell, faUsersCog });

Vue.use(Vuetify);
Vue.use(Vue2Filters);
Vue.use(require("vue-cookies"));
Vue.use(require("vue-moment"));
Vue.component("v-select", vSelect);
Vue.component("default-layout", Default);
Vue.component("no-sidebar-layout", NoSidebar);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.prototype.moment = moment;

Vue.config.productionTip = false;

ApiService.init();

// Ensure we checked auth before each page load.
router.beforeEach((to, from, next) =>
  Promise.all([store.dispatch(CHECK_AUTH)]).then(next)
);

document.addEventListener("DOMContentLoaded", () => {
  let v = new Vue({
    router,
    vuetify: new Vuetify({}),
    render: h => h(App),
    store
  });
  global.vm = v; //Define you app variable globally
  v.$mount("#app");
});
