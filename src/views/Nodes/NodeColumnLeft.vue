<template>
  <Screen>
    <template v-slot:left>
      <v-layout wrap>
        <v-flex xs12>
          <v-toolbar flat dense>
            <v-toolbar-title>
              <v-layout align-center>
                <v-btn
                  rounded
                  depressed
                  class="mr-2"
                  :to="`/nodes/${node.parent.id}`"
                >
                  <font-awesome-icon
                    icon="arrow-left"
                    color="grey"
                    class="mr-2"
                  />
                  Back
                </v-btn>
              </v-layout>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-tabs @change="filter">
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
          <v-list two-line subheader>
            <v-divider />
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
        <TaskView :task="task" :categories="categories" :statuses="statuses" />
      </v-layout>
    </template>
  </Screen>
</template>

<script>
import Screen from "@/components/Screen";
import NodeRow from "./Row";

import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_NODE } from "@/store/actions.type";

export default {
  components: {
    Screen,
    NodeRow
  },
  data() {
    return {
      children: [],
      type: "nodes"
    };
  },
  methods: {
    filter(type) {
      if (type == 0) {
        this.type = "nodes";
        this.children = this.child_nodes;
      } else {
        this.type = "tasks";
        this.children = this.child_tasks;
      }
    }
  },
  computed: {
    ...mapGetters(["current_node", "inspected_node", "child_nodes", "child_tasks"]),
  }
};
</script>
