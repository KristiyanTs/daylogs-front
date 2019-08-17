<template>
  <Screen>
    <template v-slot:left>
      <v-layout wrap>
        <v-flex xs12>
          <v-toolbar flat dense>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-tabs @change="filter">
                <v-tab>Menu</v-tab>
                <v-tab>Nodes ({{ child_nodes.length }})</v-tab>
                <v-tab>Tasks ({{ child_tasks.length }})</v-tab>
              </v-tabs>
            </v-toolbar-items>
            <template>
              <v-btn icon>
                <font-awesome-icon icon="plus" color="grey" />
              </v-btn>
            </template>
          </v-toolbar>
          <ProjectMenu v-if="type == 'menu'" :project="project" />
          <v-list two-line subheader v-else>
            <NodeRow
              v-for="child in children"
              :key="child.id"
              :node="child"
              @deleted="getNodes"
            />
          </v-list>
        </v-flex>
      </v-layout>
    </template>
    <template v-slot:right>
      <v-layout wrap>
        <router-view v-if="type == 'menu'"></router-view>
        <!-- <ProjectView :project="project" v-else /> -->
      </v-layout>
    </template>
  </Screen>
</template>

<script>
import Screen from "@/components/Screen";
import ProjectMenu from "./Menu/ProjectMenu";
import ProjectView from "./ProjectView";
import NodeRow from "../Row";

export default {
  components: {
    Screen,
    ProjectMenu,
    ProjectView,
    NodeRow
  },
  props: {
    project: {
      type: Object,
      default: () => {}
    },
    child_nodes: {
      type: Array,
      default: () => []
    },
    child_tasks: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      type: "menu",
      children: []
    };
  },
  methods: {
    getNodes() {
      this.$emit("getNodes");
    },
    filter(type) {
      if (type == 0) {
        this.type = "menu";
      } else if (type == 1) {
        this.type = "nodes";
        this.children = this.child_nodes;
      } else if (type == 2) {
        this.type = "tasks";
        this.children = this.child_tasks;
      }
    }
  }
};
</script>
