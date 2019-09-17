<template>
  <v-btn
    rounded
    depressed
    :class="{ 'pl-0': isTask(current_node) }"
    class="ml-2 text-none"
    @click="inspectNode"
  >
    <font-awesome-icon
      v-if="!isTask(current_node)"
      icon="folder"
      color="grey"
      class="mr-2"
    />
    <v-avatar v-else :color="category.color" size="36" class="mr-2">
      <font-awesome-icon
        :icon="category.icon"
        :color="category.icon_color"
      />
    </v-avatar>
    {{ current_node.title }}
  </v-btn>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { CHANGE_INSPECTED_NODE } from "@/store/actions.type";
import { NodeTypeCheck } from "./node.mixins";

export default {
  name: "NodeBreadcrumb",
  mixins: [NodeTypeCheck],
  data() {
    return {};
  },
  methods: {
    inspectNode() {
      store.dispatch(CHANGE_INSPECTED_NODE, this.current_node);
    },
  },
  computed: {
    ...mapGetters(["current_node", "categories", "statuses"]),
    category() {
      return this.categories.find(c => c.id == this.current_node.category_id);
    },
    status() {
      return this.statuses.find(s => s.id == this.current_node.status_id);
    }
  }
}
</script>
