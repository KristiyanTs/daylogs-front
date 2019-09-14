<template>
  <v-flex xs12>
    <v-toolbar flat dense class="pr-2">
      <v-toolbar-title> Task categories </v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="addCategory" color="grey">
        <font-awesome-icon icon="plus" />
      </v-btn>
    </v-toolbar>
    <v-list two-line subheader dense>
      <CategoryRow v-for="category in categories" :key="category.id" :category="category" />
    </v-list>
  </v-flex>
</template>

<script>
import CategoryRow from "./CategoryRow";

import { mapGetters } from "vuex";
import store from "@/store";
import { ADD_CATEGORY } from "@/store/mutations.type";

export default {
  components: {
    CategoryRow
  },
  data() {
    return { };
  },
  methods: {
    addCategory() {
      if(this.categories.filter(c => c.id == "").length == 0) {
        store.commit(ADD_CATEGORY, null);
      }
    },
  },
  computed: {
    ...mapGetters(["categories"])
  }
}
</script>