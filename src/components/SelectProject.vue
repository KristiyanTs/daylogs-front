<template>
  <span>
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
        <v-divider />
        <v-list-item @click="showUserInvitations" dense>
          <v-list-item-title class="grey--text">Invitations</v-list-item-title>
        </v-list-item>
        <v-list-item @click="projectDialog = true" dense>
          <v-list-item-title class="grey--text">New project</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <NewProject
      :open="projectDialog"
      @closeDialog="closeProjectDialog"
    />
    <UserInvitationsDialog />
  </span>
</template>

<script>
import NewProject from "@/views/Nodes/Projects/NewProject/NewProject";
import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_PROJECTS, SWITCH_PROJECT, TOGGLE_INVITATIONS_DIALOG } from "@/store/actions.type";
import UserInvitationsDialog from "@/views/User/Invitations/InvitationsDialog";

export default {
  components: {
    NewProject,
    UserInvitationsDialog
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
    switchProject(project) {
      store.dispatch(SWITCH_PROJECT, project.id);
    },
    closeProjectDialog() {
      this.projectDialog = false;
    },
    showUserInvitations() {
      store.dispatch(TOGGLE_INVITATIONS_DIALOG, true);
    }
  },
  computed: {
    ...mapGetters(["projects", "active_project"])
  }
}
</script>
