<template>
  <v-list-item color="primary" @click="inspectNode" v-on:dblclick="activateNode">
    <v-list-item-avatar>
      <font-awesome-icon
        icon="code-branch"
        class="grey--text"
        v-if="node.category_id == null || node.category_id == ''"
      />
      <v-btn fab v-else :color="category.color" depressed small>
        <font-awesome-icon
          :icon="category.icon"
          :color="category.icon_color"
        />
      </v-btn>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title v-text="node.title" />
      <v-list-item-subtitle v-if="status">
        <v-chip pill x-small>
          <v-avatar
            left
            :color="status.color"
          />
          {{ status.title }}
        </v-chip>
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-flex>
        <v-chip small v-if="!node.id" class="mr-2">Not Saved</v-chip>
        <v-chip color="primary" small v-if="node.id == current_node.id" class="mr-2">Active</v-chip>
        <v-chip color="secondary" small v-if="node.id == inspected_node.id">Inspected</v-chip>
      </v-flex>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { DESTROY_NODE, CHANGE_INSPECTED_NODE } from "@/store/actions.type";
import { ADD_NODE, ADD_TASK_NODE } from "@/store/mutations.type";

export default {
  name: "NodeRow",
  props: {
    node: {
      type: Object,
      default: () => {}
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
