<template>
  <v-navigation-drawer :value="sidebar" fixed absolute clipped app>
    <v-layout column fill-height align-content-start>
      <v-flex shrink>
        <v-divider dark class="my-0"></v-divider>
        <v-list dense shaped>
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
        </v-list>
      </v-flex>
      <v-flex shrink>
        <v-divider dark class="my-0"></v-divider>
        <v-layout row align-center>
          <v-flex xs6>
            <v-subheader>
              Favorites
            </v-subheader>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex class="projects-wrapper" shrink>
        <v-list dense class="p-0" shaped>
          <v-list-item
            v-for="(node, k) in favorites"
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
      @closeDialog="closeProjectDialog"
    />
  </v-navigation-drawer>
</template>

<script>
import NewProject from "@/views/Nodes/Projects/NewProject/NewProject";
import { mapGetters } from "vuex";
import { FETCH_FAVORITES } from "@/store/actions.type";

export default {
  components: {
    NewProject
  },
  data() {
    return {
      nodes: [],
      projectDialog: false
    };
  },
  mounted() {
    this.$store.dispatch(FETCH_FAVORITES);
  },
  methods: {
    closeProjectDialog() {
      this.projectDialog = false;
    }
  },
  computed: {
    ...mapGetters(["current_user", "formatted_name", "favorites", "sidebar"]),
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