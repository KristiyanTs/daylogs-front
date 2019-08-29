<template>
  <v-app-bar app clipped-left elevation="0">
    <v-app-bar-nav-icon @click="toggleSidebar"></v-app-bar-nav-icon>
    <span class="title ml-3 mr-5 white--grey">
      <span class="font-weight-light">Day</span>Logs
    </span>
    <v-text-field
      solo-inverted
      flat
      hide-details
      label="Search"
      prepend-inner-icon="search"
    ></v-text-field>
    <v-spacer></v-spacer>
    <Alerts />
    <v-btn fab dedpressed small :text="!resizable" color="primary" @click="toggleResizable">
      <font-awesome-icon icon="columns" />
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { CREATE_ALERT } from "@/store/actions.type";
import { TOGGLE_RESIZABLE, TOGGLE_SIDEBAR } from "@/store/mutations.type";
import Alerts from "./Alerts";

export default {
  components: {
    Alerts
  },
  data() {
    return {};
  },
  methods: {
    toggleResizable() {
      if(!this.resizable) {
        store.dispatch(CREATE_ALERT, ["You can now drag and resize the layout columns.", "info"]);
      }
      store.commit(TOGGLE_RESIZABLE);
    },
    toggleSidebar() {
      store.commit(TOGGLE_SIDEBAR);
    }
  },
  computed: {
    ...mapGetters(["resizable"])
  }
}
</script>
