<template>
  <v-flex xs12>
    <v-toolbar flat dense>
      <v-toolbar-title>{{ node.title }}</v-toolbar-title>
      <v-divider class="mx-4" vertical v-if="node.category || node.status" />
      <v-toolbar-items>
        <v-layout align-center>
          <v-chip pill v-if="node.category" class="mr-2">
            <v-avatar left :color="node.category.color">
              <font-awesome-icon
                :icon="node.category.icon"
                :color="node.category.icon_color"
              />
            </v-avatar>
            {{ node.category.title }}
          </v-chip>
          <v-chip pill v-if="node.status">
            <v-avatar left :color="node.status.color" />
            {{ node.status.title }}
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
              <td>
                <v-chip pill class="mr-2">
                  <v-avatar left>
                    <font-awesome-icon icon="user" />
                  </v-avatar>
                  {{ node.reporter.name }}
                </v-chip>
              </td>
            </tr>
            <tr>
              <td>Assignee</td>
              <td>
                <v-chip pill class="mr-2" v-if="node.assigned">
                  <v-avatar left>
                    <font-awesome-icon icon="user" />
                  </v-avatar>
                  {{ node.assigned.name }}
                </v-chip>
                <v-chip pill class="mr-2" v-else>
                  <v-avatar left>
                    <font-awesome-icon icon="user" />
                  </v-avatar>
                  Unassigned
                </v-chip>
              </td>
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
    project: {
      type: Object,
      default: () => {},
    }
  },
  data() {
    return {};
  }
}
</script>