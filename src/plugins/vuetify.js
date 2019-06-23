import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/dist/vuetify.min.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBold, faItalic, faStrikethrough, faUnderline, faParagraph, faListUl, faListOl, faQuoteRight, faCode, faChevronLeft, faChevronRight, faAngleDoubleLeft, faAngleDoubleRight, faPlus, faCheck, faRedo, faTrashAlt, faSpinner, faTasks, faHeadphones, faUser, faEdit, faSave, faPlay, faPause, faLock, faEllipsisV, faAt, faKey, faSignOutAlt, faTimes, faGripVertical
} from "@fortawesome/free-solid-svg-icons";
import { faClipboard, faImage } from "@fortawesome/free-regular-svg-icons";
library.add({
  faBold, faItalic, faStrikethrough, faUnderline, faParagraph, faListUl, faListOl, faQuoteRight, faCode, faChevronLeft, faChevronRight, faAngleDoubleLeft, faAngleDoubleRight, faPlus, faCheck, faRedo, faTrashAlt, faSave, faSpinner, faTasks, faHeadphones, faUser, faEdit, faClipboard, faPlay, faPause, faLock, faEllipsisV, faAt, faKey, faSignOutAlt, faImage, faTimes, faGripVertical
});
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(Vuetify, {
  theme: {
    success: "#2dce89",
    primary: "#3f51b5",
    secondary: "#b0bec5",
    accent: "#8c9eff",
    error: "#f5365c"
  }
});
