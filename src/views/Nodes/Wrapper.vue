<template>
  <ProjectScreen
    v-if="!node.root"
    :project="node"
    :child_nodes="child_nodes"
    :child_tasks="child_tasks"
    @getNodes="getNodes"
  />
  <TaskScreen
    v-else-if="node.status"
    :task="node"
    :child_nodes="child_nodes"
    :child_tasks="child_tasks"
    :statuses="statuses"
    :categories="categories"
    @getNodes="getNodes"
  />
  <NodeScreen
    v-else
    :node="node"
    :child_nodes="child_nodes"
    :child_tasks="child_tasks"
    :statuses="statuses"
    :categories="categories"
    @getNodes="getNodes"
  />
</template>

<script>
import ProjectScreen from "./Projects/ProjectScreen";
import NodeScreen from "./Nodes/NodeScreen";
import TaskScreen from "./Tasks/TaskScreen";

export default {
  name: "NodeWrapper",
  components: {
    ProjectScreen,
    NodeScreen,
    TaskScreen
  },
  data() {
    return {
      root: {},
      node: {},
      parent: {},
      child_nodes: [],
      child_tasks: [],
      children: [],
      statuses: [],
      categories: []
    };
  },
  methods: {
    getNodes() {
      this.axios
        .get(`/api/nodes/${this.rootId}`)
        .then(response => {
          this.node = response.data;
          this.root = this.node.root;
          this.parent = this.node.parent;
          this.child_nodes = this.node.child_nodes;
          this.child_tasks = this.node.child_tasks;
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
    }
  },
  computed: {
    rootId() {
      return this.$route.params.id;
    }
  },
  watch: {
    rootId: {
      immediate: true,
      handler() {
        if (this.rootId) {
          this.getNodes();
          this.getStatuses();
          this.getCategories();
        }
      }
    }
  }
}
</script>
