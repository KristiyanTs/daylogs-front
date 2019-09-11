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
    <v-menu
      transition="slide-y-transition"
      bottom
      offset-y
    >
      <template v-slot:activator="{ on }">
        <v-btn depressed height="48" color="grey" class="ml-2" v-on="on" outlined>
          {{ active_project ? active_project.title : "Select a project" }}
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item dense v-for="project in projects" :key="project.id" @click="switchProject(project)">
          <v-list-item-title>{{ project.title }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="projectDialog = true" dense>
          <v-list-item-title class="grey--text">New project</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-spacer></v-spacer>
    <Alerts />
    <v-btn fab dedpressed small :text="!resizable" color="primary" @click="toggleResizable">
      <font-awesome-icon icon="columns" />
    </v-btn>
    <v-btn fab dedpressed small text color="primary" @click="toggleNotifications">
      <font-awesome-icon icon="bell" />
    </v-btn>
    <v-menu
      transition="slide-y-transition"
      bottom
      offset-y
    >
      <template v-slot:activator="{ on }">
        <v-btn fab dedpressed small text color="primary" v-on="on">
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
    <NewProject
      :open="projectDialog"
      @closeDialog="closeProjectDialog"
    />
  </v-app-bar>
</template>

<script>
import NewProject from "@/views/Nodes/Projects/NewProject/NewProject";
import { mapGetters } from "vuex";
import store from "@/store";
import { CREATE_ALERT, LOGOUT, TOGGLE_NOTIFICATIONS, FETCH_PROJECTS, SWITCH_PROJECT } from "@/store/actions.type";
import { TOGGLE_RESIZABLE, TOGGLE_SIDEBAR } from "@/store/mutations.type";
import Alerts from "./Alerts";

export default {
  components: {
    Alerts,
    NewProject
  },
  data() {
    return {
      projectDialog: false
    };
  },
  mounted() {
    store.dispatch(FETCH_PROJECTS)
      .then(() => {
        store.dispatch(SWITCH_PROJECT, null);
      })
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
    closeProjectDialog() {
      this.projectDialog = false;
    },
    switchProject(project) {
      store.dispatch(SWITCH_PROJECT, project.id);
    }
  },
  computed: {
    ...mapGetters(["resizable", "projects", "active_project"])
  }
}
</script>
