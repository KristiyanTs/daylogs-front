<template>
  <v-container class="px-0 py-0">
    <NodeRow
      :node="current_node"
    />
    <v-toolbar flat dense>
      <v-spacer />
      <v-toolbar-items>
        <v-tabs @change="filter">
          <v-tab>Nodes ({{ child_nodes.length }})</v-tab>
          <v-tab>Tasks ({{ child_tasks.length }})</v-tab>
          <v-tab>Menu</v-tab>
        </v-tabs>
      </v-toolbar-items>
      <v-btn icon v-if="type != 'menu'" @click="addInstance">
        <font-awesome-icon icon="plus" color="grey" />
      </v-btn>
    </v-toolbar>
    <ProjectMenu v-if="type == 'menu'" />
    <v-list two-line subheader v-else>
      <v-divider />
      <NodeRow
        v-for="child in (type == 'tasks' ? child_tasks : child_nodes)"
        :key="child.id"
        :node="child"
      />
    </v-list>
  </v-container>
</template>

<script>
import ProjectMenu from "./Projects/Menu/ProjectMenu";
import NodeRow from "./Row";

import { mapGetters } from "vuex";
import store from "@/store";
import { CREATE_ALERT, CHANGE_INSPECTED_NODE } from "@/store/actions.type";
import { ADD_NODE, ADD_TASK_NODE } from "@/store/mutations.type";

export default {
  components: {
    ProjectMenu,
    NodeRow
  },
  data() {
    return {
      type: "nodes"
    };
  },
  methods: {
    addInstance() {
      if (this.type == "nodes" && this.child_nodes.filter(n => n.id == "").length == 0) {
        store.commit(ADD_NODE, null);
      } else if(this.type == "tasks" && this.child_tasks.filter(t => t.id == "").length == 0) {
        if(!this.categories.length) {
          store.dispatch(CREATE_ALERT, ["To create a task, please first set up categories for your project by going to Project -> Menu -> Categories", "info"]);
        } else if(!this.statuses.length) {
          store.dispatch(CREATE_ALERT, ["To create a task, please first set up statuses for your project by going to Project -> Menu -> Statuses", "info"]);
        } else {
          store.commit(ADD_TASK_NODE, null);
        }
      }
    },
    filter(type) {
      if (type == 2) {
        this.type = "menu";
        this.$router.push({ path: `/nodes/${this.rootId}/general` });
      } else if (type == 0) {
        this.type = "nodes";
        if(this.child_nodes.length) {
          store.dispatch(CHANGE_INSPECTED_NODE, this.child_nodes[0]);
        }
        this.$router.push({ path: `/nodes/${this.rootId}` });
      } else if (type == 1) {
        this.type = "tasks";
        if(this.child_tasks.length) {
          store.dispatch(CHANGE_INSPECTED_NODE, this.child_tasks[0]);
        }
        this.$router.push({ path: `/nodes/${this.rootId}` });
      }
    }
  },
  computed: {
    ...mapGetters(["current_node", "inspected_node", "child_nodes", "child_tasks", "categories", "statuses"]),
    rootId() {
      return this.$route.params.id;
    }
  }
};
</script>
