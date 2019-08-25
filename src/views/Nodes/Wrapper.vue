<template>
  <ProjectScreen
    v-if="!current_node.root"
  />
  <!-- <TaskScreen
    v-else-if="current_node.status"
  />
  <NodeScreen
    v-else
  /> -->
</template>

<script>
import ProjectScreen from "./Projects/ProjectScreen";
import NodeScreen from "./Nodes/NodeScreen";
import TaskScreen from "./Tasks/TaskScreen";

import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_NODE } from "@/store/actions.type";

export default {
  name: "NodeWrapper",
  components: {
    ProjectScreen,
    NodeScreen,
    TaskScreen
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["current_node"]),
    rootId() {
      return this.$route.params.id;
    }
  },
  watch: {
    rootId: {
      immediate: true,
      handler() {
        if (this.rootId && this.rootId != this.current_node.id) {
          store.dispatch(FETCH_NODE, this.rootId);
        }
      }
    }
  }
}
</script>
