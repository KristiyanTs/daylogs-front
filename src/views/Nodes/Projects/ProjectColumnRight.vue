<template>
  <v-container class="px-0 py-0">
    <router-view></router-view>
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
