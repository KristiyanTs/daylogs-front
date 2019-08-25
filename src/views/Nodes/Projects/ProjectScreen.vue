<template>
  <Screen>
    <template v-slot:left>
      <v-layout wrap>
        <v-flex xs12>
          <v-toolbar flat dense>
            <v-spacer />
            <v-toolbar-items>
              <v-tabs @change="filter">
                <v-tab>Menu</v-tab>
                <v-tab>Nodes ({{ child_nodes.length }})</v-tab>
                <v-tab>Tasks ({{ child_tasks.length }})</v-tab>
              </v-tabs>
            </v-toolbar-items>
            <v-btn icon v-if="type != 'menu'" @click="addInstance">
              <font-awesome-icon icon="plus" color="grey" />
            </v-btn>
          </v-toolbar>
          <ProjectMenu v-if="type == 'menu'" />
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

import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_NODE } from "@/store/actions.type";

export default {
  components: {
    Screen,
    ProjectMenu,
    ProjectView,
    NodeRow
  },
  data() {
    return {
      type: "menu",
      children: []
    };
  },
  methods: {
    addInstance() {
      if (this.type == "nodes") {
        this.addNode();
      } else if (this.type == "tasks") {
        this.addTask();
      }
    },
    addNode() {
      this.children.push({
        
      });
    },
    addTask() {
      this.children.push({

      });
    },
    filter(type) {
      if (type == 0) {
        this.type = "menu";
        this.$router.push({ path: `/nodes/${this.rootId}/general` });
      } else if (type == 1) {
        this.type = "nodes";
        this.children = this.child_nodes;
      } else if (type == 2) {
        this.type = "tasks";
        this.children = this.child_tasks;
      }
    }
  },
  computed: {
    ...mapGetters(["current_node", "child_nodes", "child_tasks"]),
    rootId() {
      return this.$route.params.id;
    }
  },
  watch: {
    rootId: {
      immediate: true,
      handler() {
        if (this.rootId && this.current_node.id != this.rootId) {
          store.dispatch(FETCH_NODE, this.rootId);
        }
      }
    }
  }
};
</script>
