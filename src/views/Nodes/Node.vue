<template>
  <Screen>
    <template v-slot:left>
      <v-layout wrap>
        <v-flex xs12>
          <v-toolbar flat dense>
            <v-toolbar-title>
              <v-layout align-center>
                <v-btn
                  v-if="parent"
                  rounded
                  depressed
                  class="mr-2"
                  :to="`/nodes/${parent.id}`"
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
              <v-btn icon @click="formOpen = true">
                <font-awesome-icon icon="plus" color="grey" />
              </v-btn>
            </template>
          </v-toolbar>
          <v-list two-line subheader>
            <NodeRow
              :node="node"
              :categories="categories"
              :statuses="statuses"
            />
            <v-divider />
            <NodeRow
              v-for="child in children"
              :key="child.id"
              :node="child"
              :categories="categories"
              :statuses="statuses"
              @deleted="getNodes"
            />
          </v-list>
        </v-flex>
        <v-flex>
          <NodeForm
            :parent="node"
            :open="formOpen && type == 'node'"
            @created="getNodes"
            @closeDialog="closeDialog"
          />
          <TaskForm
            :parent="node"
            :open="formOpen && type == 'task'"
            @created="getNodes"
            @closeDialog="closeDialog"
          />
        </v-flex>
      </v-layout>
    </template>
    <template v-slot:right>
      <v-layout wrap>
        <NodeView :node="node" :categories="categories" :statuses="statuses" />
      </v-layout>
    </template>
  </Screen>
</template>

<script>
import Screen from "@/components/Screen";
import NodeRow from "./NodeRow";
import NodeForm from "./NodeForm";
import NodeView from "./NodeView";
import TaskForm from "./Tasks/TaskForm";

export default {
  name: "Node",
  components: {
    Screen,
    NodeRow,
    NodeForm,
    NodeView,
    TaskForm
  },
  data() {
    return {
      root: {},
      node: {},
      parent: {},
      child_nodes: [],
      child_tasks: [],
      children: [],
      editing: false,
      formOpen: false,
      type: "node",
      statuses: [],
      categories: []
    };
  },
  mounted() {
    this.getNodes();
    this.getStatuses();
    this.getCategories();
  },
  methods: {
    getNodes() {
      this.axios
        .get(`/api/nodes/${this.rootId}`)
        .then(response => {
          this.root = response.data.root;
          this.parent = response.data.parent;
          this.node = response.data.node;
          this.child_nodes = response.data.child_nodes;
          this.child_tasks = response.data.child_tasks;
          this.filter(this.type == "task" ? 1 : 0);
        })
        .catch(error => {});
    },
    getStatuses() {
      this.axios
        .get(`/api/nodes/${this.rootId}/statuses`)
        .then(response => {
          this.statuses = response.data;
        })
        .catch(error => {
          this.requestError(error);
        });
    },
    getCategories() {
      this.axios
        .get(`/api/nodes/${this.rootId}/categories`)
        .then(response => {
          this.categories = response.data;
        })
        .catch(error => {
          this.requestError(error);
        });
    },
    filter(type) {
      this.type = type ? "task" : "node";
      this.children = type ? this.child_tasks : this.child_nodes;
    },
    closeDialog() {
      this.formOpen = false;
    }
  },
  computed: {
    rootId() {
      return this.$route.params.id;
    }
  },
  watch: {
    rootId() {
      this.getNodes();
    }
  }
}
</script>

<style scoped lang="sass">

</style>
