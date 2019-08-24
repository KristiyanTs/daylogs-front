<template>
  <v-navigation-drawer v-model="sidebar" fixed clipped app>
    <v-layout column fill-height align-content-start>
      <v-flex shrink>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              <v-btn text small to="/profile/general">K. Tsvetanov</v-btn>
            </v-list-item-title>
            <v-list-item-subtitle>
              <v-btn color="grey" text small @click="logOut">Log out</v-btn>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-flex>
      <v-flex shrink>
        <v-divider dark class="my-0"></v-divider>
        <v-list dense>
          <v-list-item to="/calendar">
            <v-list-item-action>
              <font-awesome-icon icon="tasks" class="grey--text" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Today
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/notes">
            <v-list-item-action>
              <font-awesome-icon icon="sticky-note" class="grey--text" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Notes
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-flex>
      <v-flex shrink>
        <v-divider dark class="my-0"></v-divider>
        <v-layout row align-center>
          <v-flex xs6>
            <v-subheader>
              Projects
            </v-subheader>
          </v-flex>
          <v-spacer />
          <v-btn @click="projectDialog = true" text fab small>
            <font-awesome-icon icon="plus" class="grey--text" />
          </v-btn>
        </v-layout>
      </v-flex>
      <v-flex class="projects-wrapper" shrink>
        <v-list dense class="p-0">
          <v-list-item
            v-for="(node, k) in nodes"
            :key="k"
            :to="`/nodes/${node.id}`"
          >
            <v-list-item-action>
              <font-awesome-icon icon="code-branch" class="grey--text" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ node.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-flex>
    </v-layout>
    <NewProject
      :open="projectDialog"
      @reload="getNodes"
      @closeDialog="closeProjectDialog"
    />
  </v-navigation-drawer>
</template>

<script>
import { LOGOUT } from "@/store/actions.type";
import NewProject from "@/views/Nodes/Projects/NewProject/NewProject";

export default {
  components: {
    NewProject
  },
  props: {
    sidebar: {
      type: Boolean,
      default: false,
      description: "Is the sidebar open?"
    }
  },
  data() {
    return {
      nodes: [],
      projectDialog: false
    };
  },
  mounted() {
    this.getNodes();
  },
  methods: {
    logOut() {
      this.$store.dispatch(LOGOUT);
    },
    getNodes() {
      this.axios
        .get("/api/nodes", {
          headers: { Authorization: window.$cookies.get("jwt") }
        })
        .then(response => {
          this.nodes = response.data;
        })
        .catch(error => {});
    },
    closeProjectDialog() {
      this.projectDialog = false;
    }
  }
};
</script>

<style scoped lang="sass">
.v-navigation-drawer
  padding: 4px 0px 4px 4px
.flex.grow .v-list.v-sheet
  height: 100%
.projects-wrapper
  max-height: 200px
  overflow-y: scroll
</style>