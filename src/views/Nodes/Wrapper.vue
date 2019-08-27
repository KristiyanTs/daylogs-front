<template>
  <Screen>
    <template v-slot:left>
      <ProjectColumnLeft v-if="!current_node.root_id" />
      <NodeColumnLeft v-else />
    </template>
    <template v-slot:right>
      <TaskColumnRight v-if="inspected_node && (inspected_node.type == 'task' || (inspected_node.category_id != '' && inspected_node.category_id != null))" />
      <NodeColumnRight v-else-if="inspected_node && (inspected_node.type == 'node' || inspected_node.category_id == null)" />
      <ProjectColumnRight v-else />
    </template>
  </Screen>
</template>

<script>
import Screen from "@/components/Screen";
import ProjectColumnLeft from "./Projects/ProjectColumnLeft";
import ProjectColumnRight from "./Projects/ProjectColumnRight";
import NodeColumnLeft from "./NodeColumnLeft";
import NodeColumnRight from "./Nodes/NodeColumnRight";
import TaskColumnRight from "./Tasks/TaskColumnRight";

import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_NODE, FETCH_CATEGORIES, FETCH_STATUSES } from "@/store/actions.type";

export default {
  name: "NodeWrapper",
  components: {
    Screen,
    ProjectColumnLeft,
    ProjectColumnRight,
    NodeColumnLeft,
    NodeColumnRight,
    TaskColumnRight
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["current_node", "inspected_node"]),
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
          store.dispatch(FETCH_CATEGORIES, this.rootId);
          store.dispatch(FETCH_STATUSES, this.rootId);
        }
      }
    }
  }
}
</script>
