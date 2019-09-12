<template>
  <v-btn @click="remove" fab depressed small class="white">
    <font-awesome-icon
      color="grey"
      icon="trash-alt"
    />
  </v-btn>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { DESTROY_NODE } from "@/store/actions.type";

export default {
  data() {
    return { };
  },
  methods: {
    remove() {
      store.dispatch(DESTROY_NODE, this.inspected_node);
    },
  },
  computed: {
    ...mapGetters(["inspected_node"])
  }
};
</script>
