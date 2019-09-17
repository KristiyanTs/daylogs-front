<template>
  <v-list-item @click="clickToOpen ? activateNode() : inspectNode()" v-on:dblclick="activateNode" dense>
    <v-list-item-avatar>
      <font-awesome-icon
        icon="folder"
        class="grey--text"
        v-if="!isTask(node)"
      />
      <v-btn fab v-else-if="category" :color="category.color" depressed x-small>
        <font-awesome-icon
          :icon="category.icon"
          :color="category.icon_color"
          size="lg"
        />
      </v-btn>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title v-text="node.title" />
    </v-list-item-content>

    <v-list-item-action>
      <v-chip pill color="white" small v-if="isTask(node)">
        {{ status.title }}
        <v-avatar
          right
          :color="status.color"
        />
      </v-chip>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { NodeTypeCheck } from "./node.mixins";
import { DESTROY_NODE, CHANGE_INSPECTED_NODE } from "@/store/actions.type";
import { ADD_NODE, ADD_TASK_NODE } from "@/store/mutations.type";

export default {
  name: "NodeRow",
  mixins: [NodeTypeCheck],
  props: {
    node: {
      type: Object,
      default: () => {}
    },
    clickToOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    activateNode() {
      this.$router.push({ path: `/nodes/${this.node.id}` });
    },
    inspectNode() {
      store.dispatch(CHANGE_INSPECTED_NODE, this.node);
    },
    deleteNode() {
      store.dispatch(DESTROY_NODE, this.node);
    }
  },
  computed: {
    ...mapGetters(["current_node", "inspected_node", "categories", "statuses"]),
    category() {
      return this.categories.find(c => c.id == this.node.category_id);
    },
    status() {
      return this.statuses.find(s => s.id == this.node.status_id);
    }
  }
}
</script>
