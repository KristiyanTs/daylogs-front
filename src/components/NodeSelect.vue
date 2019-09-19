<template>
  <v-treeview
    selectable
    :load-children="fetchSubtree"
    item-key="id"
    item-text="title"
    :items="tree"
    transition
    open-on-click
    selection-type="independent"
    @input="emitSelected"
    @update:active="emitSelected"
    :value="selected"
    indeterminate-icon="$vuetify.icons.checkboxOff"
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
      items: [],
      selected: []
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
      // this is really buggy, better just write your own
      if(this.selected.length) {
        if(items.length == 1) {
          this.selected = items;
        } else if(items.includes(this.selected[0])) {
          this.selected = [];
        } else {
          this.selected = [];
        }
      } else {
        if(items.length == 1) {
          this.selected = items;
        } else {
          this.selected = [];
        }
      }
      this.$emit("selected", this.selected[0]);
    }
  },
  computed: {
    ...mapGetters(["active_project", "tree"])
  },
}
</script>