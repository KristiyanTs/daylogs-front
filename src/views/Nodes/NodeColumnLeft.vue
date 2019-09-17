<template>
  <v-container class="px-0 py-0 white">
    <v-toolbar flat dense>
      <v-toolbar-title>
        <v-btn
          v-if="current_node.ancestry"
          rounded
          depressed
          class="mr-2"
          :to="`/nodes/${current_node.ancestry.split('/').slice(-1)}`"
        >
          <font-awesome-icon
            icon="arrow-left"
            color="grey"
            class="mr-2"
          />
          Back
        </v-btn>
        /
        <NodeBreadcrumb />
      </v-toolbar-title>
    </v-toolbar>
    <v-list dense subheader>
      <v-subheader>
        Topics
        <v-spacer></v-spacer>
        <v-btn icon @click="addNode">
          <font-awesome-icon icon="plus" color="grey" />
        </v-btn>
      </v-subheader>
      <v-divider />
      <NodeRow
        v-for="child in child_nodes"
        :key="child.id"
        :node="child"
      />
    </v-list>
    <v-list dense subheader>
      <v-subheader>
        Tasks
        <v-spacer></v-spacer>
        <v-btn icon @click="addTask">
          <font-awesome-icon icon="plus" color="grey" />
        </v-btn>
      </v-subheader>
      <v-divider />
      <NodeRow
        v-for="child in child_tasks"
        :key="child.id"
        :node="child"
      />
    </v-list>
  </v-container>
</template>

<script>
import NodeRow from "./Row";
import NodeBreadcrumb from "./NodeBreadcrumb";

import { mapGetters } from "vuex";
import store from "@/store";
import { CREATE_ALERT } from "@/store/actions.type";
import { ADD_NODE, ADD_TASK_NODE } from "@/store/mutations.type";

export default {
  components: {
    NodeRow,
    NodeBreadcrumb
  },
  data() {
    return { };
  },
  methods: {
    addNode() {
      if (this.child_nodes.findIndex(n => n.id == "") == -1) {
        store.commit(ADD_NODE, null);
      } else {
        store.dispatch(CREATE_ALERT, ["Please, save unsaved tasks and folders first", "info"]);
      }
    },
    addTask() {
      if(this.child_tasks.findIndex(t => t.id == "") == -1) {
        if(!this.categories.length) {
          store.dispatch(CREATE_ALERT, ["To create a task, please first set up categories for your project by going to Project -> Menu -> Categories", "info"]);
        } else if(!this.statuses.length) {
          store.dispatch(CREATE_ALERT, ["To create a task, please first set up statuses for your project by going to Project -> Menu -> Statuses", "info"]);
        } else {
          store.commit(ADD_TASK_NODE, null);
        }
      } else {
        store.dispatch(CREATE_ALERT, ["Please, save unsaved tasks and folders first", "info"]);
      }
    }
  },
  computed: {
    ...mapGetters(["current_node", "inspected_node", "child_nodes", "child_tasks", "statuses", "categories"]),
  }
};
</script>
