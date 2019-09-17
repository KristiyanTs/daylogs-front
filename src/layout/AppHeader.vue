<template>
  <v-app-bar app clipped-left elevation="0">
    <v-app-bar-nav-icon @click="toggleSidebar"></v-app-bar-nav-icon>
    <span class="title ml-3 mr-5 white--grey">
      <span class="font-weight-light">Work</span>Tree
    </span>
    <v-text-field
      solo-inverted
      flat
      hide-details
      label="Search"
      prepend-inner-icon="search"
    ></v-text-field>
    <ProjectSelect />
    <v-spacer />
    <Alerts />
    <v-btn fab dedpressed small :text="!resizable" color="grey" @click="toggleResizable">
      <font-awesome-icon icon="columns" />
    </v-btn>
    <v-btn fab dedpressed small text color="grey" @click="toggleNotifications">
      <font-awesome-icon icon="bell" />
    </v-btn>
    <v-menu
      transition="slide-y-transition"
      bottom
      offset-y
    >
      <template v-slot:activator="{ on }">
        <v-btn fab dedpressed small text color="grey" v-on="on">
          <font-awesome-icon icon="user" />
        </v-btn>
      </template>
      <v-list>
        <v-list-item to="/profile/general">
          <v-list-item-title>Account</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logOut">
          <v-list-item-title>Log out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { CREATE_ALERT, LOGOUT, TOGGLE_NOTIFICATIONS } from "@/store/actions.type";
import { TOGGLE_RESIZABLE, TOGGLE_SIDEBAR } from "@/store/mutations.type";
import Alerts from "./Alerts";
import ProjectSelect from "@/components/ProjectSelect";

export default {
  components: {
    Alerts,
    ProjectSelect
  },
  data() {
    return {
      projectDialog: false
    };
  },
  methods: {
    toggleResizable() {
      if(!this.resizable) {
        store.dispatch(CREATE_ALERT, ["You can now drag and resize the layout columns.", "info"]);
      }
      store.commit(TOGGLE_RESIZABLE);
    },
    toggleNotifications() {
      store.dispatch(TOGGLE_NOTIFICATIONS);
    },
    toggleSidebar() {
      store.commit(TOGGLE_SIDEBAR);
    },
    logOut() {
      store.dispatch(LOGOUT).then(() => this.$router.push('/'));
    },
  },
  computed: {
    ...mapGetters(["resizable"])
  }
}
</script>
