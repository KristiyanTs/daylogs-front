<template>
  <v-container class="px-0 py-0">
    <v-toolbar flat dense>
      <v-toolbar-title>{{ inspected_node.title }}</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
      </v-toolbar-items>
    </v-toolbar>
    <v-simple-table v-if="inspected_node.created_at">
      <tbody>
        <tr>
          <td>Created</td>
          <td>{{ moment(inspected_node.created_at).format("M/D/YY, H:mm") }}</td>
        </tr>
        <tr>
          <td>Updated</td>
          <td>{{ moment(inspected_node.updated_at).format("M/D/YY, H:mm") }}</td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import {  } from "@/store/actions.type";
import {  } from "@/store/mutations.type";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["current_node", "inspected_node"])
  }
};
</script>
