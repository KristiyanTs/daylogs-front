<template>
  <v-flex xs12>
    <v-toolbar flat dense>
      <v-toolbar-title> Task categories </v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="addCategory" color="grey">
        <font-awesome-icon icon="plus" />
      </v-btn>
    </v-toolbar>
    <v-list two-line v-if="categories.length">
      <v-list-item v-for="(item, idx) in categories" :key="idx">
        <v-list-item-avatar>
          <ColorIconPicker
            :color="item.color"
            :icon="item.icon"
            :icon_color="item.icon_color"
            @changeColorIcon="(bg, ic, col) => changeColorIcon(bg, ic, col, idx)"
          />
        </v-list-item-avatar>

        <v-list-item-content v-if="item.editing">
          <v-text-field v-model="item.title" placeholder="Label" />
          <v-text-field v-model="item.description" placeholder="Description" />
        </v-list-item-content>
        <v-list-item-content v-else>
          <v-list-item-title v-text="item.title" />
          <v-list-item-subtitle v-html="item.description" />
        </v-list-item-content>

        <v-list-item-action>
          <v-flex>
            <v-btn
              v-if="item.editing"
              @click="saveCategory(idx)"
              fab
              depressed
              outlined
              small
              color="primary"
            >
              <font-awesome-icon icon="check" />
            </v-btn>
            <v-btn v-else icon @click="editCategory(idx)" color="grey">
              <font-awesome-icon icon="edit" />
            </v-btn>
            <v-btn icon @click="deleteCategory(idx)" color="grey">
              <font-awesome-icon icon="trash-alt" />
            </v-btn>
          </v-flex>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-flex>
</template>

<script>
import ColorIconPicker from "@/components/ColorIconPicker";

import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_CATEGORIES, CREATE_CATEGORY, UPDATE_CATEGORY, DESTROY_CATEGORY } from "@/store/actions.type";
import { ADD_CATEGORY, SET_CATEGORY, REMOVE_CATEGORY } from "@/store/mutations.type";

export default {
  components: {
    ColorIconPicker
  },
  data() {
    return { };
  },
  mounted() {
    store.dispatch(FETCH_CATEGORIES, this.current_node.id);
  },
  methods: {
    addCategory() {
      if(this.categories.filter(c => c.id == "").length == 0) {
        store.commit(ADD_CATEGORY, null);
      }
    },
    saveCategory(idx) {
      if(this.categories[idx].id) { // has an id => it already exists
        store.dispatch(UPDATE_CATEGORY, this.categories[idx]);
      } else { // no id => it should be created
        store.dispatch(CREATE_CATEGORY, this.categories[idx]);
      }
    },
    deleteCategory(idx) {
      if(this.categories[idx].id) { // has an id => remove from server & store
        store.dispatch(DESTROY_CATEGORY, this.categories[idx]);
      } else { // no id => remove from store
        store.commit(REMOVE_CATEGORY, "");
      }
    },
    editStatus(idx) {
      let category = this.categories[idx];
      category.editing = true;
      store.commit(SET_CATEGORY, category);
    },
    changeColorIcon(bg, ic, col, idx) {
      let category = this.categories[idx];
      category.editing = true;
      category.color = bg;
      category.icon = ic;
      category.icon_color = col;

      store.commit(SET_CATEGORY, category);
    }
  },
  computed: {
    ...mapGetters(["current_node", "categories"])
  }
}
</script>