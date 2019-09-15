<template>
  <v-treeview
    selectable
    :load-children="fetchSubtree"
    item-key="id"
    item-text="title"
    :items="tree"
    transition
    open-on-click
    @input="emitSelected"
  ></v-treeview>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_SUBTREE } from "@/store/actions.type";
import { RESET_TREE } from "@/store/mutations.type";

export default {
  data() {
    return {
      items: []
    }
  },
  mounted() {
    store.dispatch(FETCH_SUBTREE, this.active_project);
  },
  beforeDestroy() {
    store.commit(RESET_TREE);
  },
  methods: {
    fetchSubtree(item) {
      store.dispatch(FETCH_SUBTREE, item);
    },
    emitSelected(items) {
      this.$emit("selected", items);
    }
  },
  computed: {
    ...mapGetters(["active_project", "tree"])
  },
}
</script>