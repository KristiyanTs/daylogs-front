<template>
  <v-list>
    <v-list-item :to="`/nodes/${project.id}/general`">
      <v-list-item-avatar>
        <font-awesome-icon icon="cog" class="grey--text" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>General Settings</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item :to="`/nodes/${project.id}/team`">
      <v-list-item-avatar>
        <font-awesome-icon icon="users-cog" class="grey--text" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>Team and Roles</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item :to="`/nodes/${project.id}/categories`">
      <v-list-item-avatar>
        <font-awesome-icon icon="bug" class="grey--text" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>Categories</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item :to="`/nodes/${project.id}/statuses`">
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
export default {
  props: {
    project: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  }
}
</script>