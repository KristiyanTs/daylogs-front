<template>
  <Screen>
    <template v-slot:left>
      <ProjectColumnLeft v-if="isProject(current_node)" />
      <NodeColumnLeft v-else />
    </template>
    <template v-slot:right>
      <ProjectColumnRight v-if="isProject(inspected_node)" />
      <TaskColumnRight v-else-if="$route.name == 'Nodes' && inspected_node && (inspected_node.type == 'task' || isTask(inspected_node))" />
      <NodeColumnRight v-else-if="$route.name == 'Nodes' && inspected_node && (inspected_node.type == 'node' || isNode(inspected_node))" />
    </template>
  </Screen>
</template>

<script>
import { NodeTypeCheck } from "./node.mixins";
import Screen from "@/components/Screen";
import ProjectColumnLeft from "./ProjectColumnLeft";
import ProjectColumnRight from "./ProjectColumnRight";
import NodeColumnLeft from "./NodeColumnLeft";
import NodeColumnRight from "./NodeColumnRight";
import TaskColumnRight from "./TaskColumnRight";

import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_NODE } from "@/store/actions.type";

export default {
  name: "NodeWrapper",
  mixins: [NodeTypeCheck],
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
        }
      }
    }
  }
}
</script>
