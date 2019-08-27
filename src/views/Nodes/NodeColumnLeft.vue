<template>
  <v-container class="px-0 py-0">
    <NodeRow
      :node="current_node"
    />
    <v-toolbar flat dense>
      <v-toolbar-title>
        <v-btn
          rounded
          depressed
          class="mr-2"
          :to="`/nodes/${current_node.parent.id}`"
        >
          <font-awesome-icon
            icon="arrow-left"
            color="grey"
            class="mr-2"
          />
          Back
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-tabs @change="filter">
          <v-tab>Nodes ({{ child_nodes.length }})</v-tab>
          <v-tab>Tasks ({{ child_tasks.length }})</v-tab>
        </v-tabs>
      </v-toolbar-items>
      <v-btn icon @click="addInstance">
        <font-awesome-icon icon="plus" color="grey" />
      </v-btn>
    </v-toolbar>
    <v-list two-line subheader>
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
import NodeRow from "./Row";

import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_NODE } from "@/store/actions.type";

export default {
  components: {
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
        store.commit(ADD_TASK_NODE, null);
      }
    },
    filter(type) {
      if (type == 0) {
        this.type = "nodes";
      } else {
        this.type = "tasks";
      }
    }
  },
  computed: {
    ...mapGetters(["current_node", "inspected_node", "child_nodes", "child_tasks"]),
  }
};
</script>
