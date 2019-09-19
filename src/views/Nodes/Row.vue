<template>
  <v-list-item @click="clickToOpen ? activateNode() : inspectNode()" v-on:dblclick="activateNode" dense>
    <v-list-item-avatar>
      <font-awesome-icon
        icon="folder"
        class="grey--text"
        v-if="!isTask(item)"
      />
      <v-tooltip bottom v-else-if="category" open-delay="200">
        <template v-slot:activator="data">
          <v-btn fab :color="category.color" depressed x-small v-on="data.on">
            <font-awesome-icon
              :icon="category.icon"
              :color="category.icon_color"
              size="lg"
            />
          </v-btn>
        </template>
        <span>{{ category.title }}</span>
      </v-tooltip>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title v-text="item.title" />
    </v-list-item-content>

    <v-list-item-action v-if="status">
      <v-tooltip bottom open-delay="200">
        <template v-slot:activator="data">
          <v-btn fab :color="status.color" depressed x-small v-on="data.on"/>
        </template>
        <span>{{ status.title }}</span>
      </v-tooltip>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { NodeTypeCheck, TaskCommonFinders } from "./node.mixins";
import { DESTROY_NODE, CHANGE_INSPECTED_NODE } from "@/store/actions.type";
import { ADD_NODE, ADD_TASK_NODE } from "@/store/mutations.type";

export default {
  name: "NodeRow",
  mixins: [NodeTypeCheck, TaskCommonFinders],
  props: {
    item: {
      type: Object,
      default: () => { title: "" }
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
      this.$router.push({ path: `/nodes/${this.item.id}` });
    },
    inspectNode() {
      store.dispatch(CHANGE_INSPECTED_NODE, this.item);
    },
    deleteNode() {
      store.dispatch(DESTROY_NODE, this.item);
    }
  },
  computed: {
    ...mapGetters(["current_node", "inspected_node", "categories", "statuses"])
  }
}
</script>
