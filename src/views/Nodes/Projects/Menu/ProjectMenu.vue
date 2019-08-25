<template>
  <v-list>
    <v-list-item :to="`/nodes/${current_node.id}/general`">
      <v-list-item-avatar>
        <font-awesome-icon icon="cog" class="grey--text" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>General Settings</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item :to="`/nodes/${current_node.id}/team`">
      <v-list-item-avatar>
        <font-awesome-icon icon="users-cog" class="grey--text" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>Team and Roles</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item :to="`/nodes/${current_node.id}/categories`">
      <v-list-item-avatar>
        <font-awesome-icon icon="bug" class="grey--text" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>Categories</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item :to="`/nodes/${current_node.id}/statuses`">
      <v-list-item-avatar>
        <font-awesome-icon icon="check" class="grey--text" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>Statuses</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["current_node"]),
  }
}
</script>