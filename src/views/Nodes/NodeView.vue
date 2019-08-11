<template>
  <v-flex xs12>
    <v-toolbar flat dense>
      <v-toolbar-title>{{ node.title }}</v-toolbar-title>
      <v-divider
        class="mx-4"
        vertical
        v-if="node.category_id || node.status_id"
      />
      <v-toolbar-items>
        <v-layout align-center>
          <v-chip pill v-if="node.category_id" class="mr-2">
            <v-avatar left :color="categoryColor">
              <font-awesome-icon
                :icon="categoryIcon"
                :color="categoryIconColor"
              />
            </v-avatar>
            {{ category().title }}
          </v-chip>
          <v-chip pill v-if="node.status_id">
            <v-avatar left :color="statusColor" />
            {{ status().title }}
          </v-chip>
        </v-layout>
      </v-toolbar-items>
      <v-spacer />
      <v-toolbar-items>
        <v-layout align-center>
          <v-btn icon>
            <font-awesome-icon icon="edit" />
          </v-btn>
          <v-btn icon>
            <font-awesome-icon icon="trash-alt" />
          </v-btn>
        </v-layout>
      </v-toolbar-items>
    </v-toolbar>
    <v-layout wrap>
      <v-flex xs-12 md-6>
        <v-simple-table>
          <tbody>
            <tr>
              <td>Created</td>
              <td>{{ moment(node.created_at).format("M/D/YY, H:mm") }}</td>
            </tr>
            <tr>
              <td>Updated</td>
              <td>{{ moment(node.updated_at).format("M/D/YY, H:mm") }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-flex>
      <v-flex xs-12 md-6>
        <v-simple-table>
          <tbody>
            <tr>
              <td>Reporter</td>
              <td>{{ node.created_at }}</td>
            </tr>
            <tr>
              <td>Assignee</td>
              <td>{{ node.updated_at }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  props: {
    node: {
      type: Object,
      default: () => {},
      description: "The currently opened node"
    },
    categories: {
      type: Array,
      default: () => [],
      description: "An array of all categories"
    },
    statuses: {
      type: Array,
      default: () => [],
      description: "An array of all statuses"
    }
  },
  data() {
    return {

    };
  },
  methods: {
    status() {
      return this.statuses.find(s => s.id == this.node.status_id);
    },
    category() {
      return this.categories.find(c => c.id == this.node.category_id);
    }
  },
  computed: {
    categoryColor() {
      return this.category().color;
    },
    categoryIcon() {
      return this.category().icon;
    },
    categoryIconColor() {
      return this.category().icon_color;
    },
    statusColor() {
      return this.status().color;
    }
  }
}
</script>