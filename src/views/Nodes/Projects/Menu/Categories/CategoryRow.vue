<template>
  <v-list-item>
    <v-list-item-avatar>
      <ColorIconPicker
        :color="item.color"
        :icon="item.icon"
        :icon_color="item.icon_color"
        @changeColorIcon="(bg, ic, col) => changeColorIcon(bg, ic, col)"
      />
    </v-list-item-avatar>

    <v-list-item-content v-if="item.editing">
      <v-row>
        <v-col>
          <v-text-field v-model="item.title" label="Label" />
        </v-col>
        <v-col>
          <v-text-field v-model="item.description" label="Description" />
        </v-col>
      </v-row>
    </v-list-item-content>
    <v-list-item-content v-else>
      <v-list-item-title v-text="item.title" />
      <v-list-item-subtitle v-html="item.description" />
    </v-list-item-content>

    <v-list-item-action>
      <v-flex>
        <v-btn
          v-if="item.editing"
          @click="saveCategory"
          fab
          depressed
          outlined
          small
          color="primary"
        >
          <font-awesome-icon icon="check" />
        </v-btn>
        <v-btn v-else icon @click="editCategory" color="grey">
          <font-awesome-icon icon="edit" />
        </v-btn>
        <v-btn icon @click="deleteCategory" color="grey">
          <font-awesome-icon icon="trash-alt" />
        </v-btn>
      </v-flex>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import ColorIconPicker from "@/components/ColorIconPicker";

import store from "@/store";
import { CREATE_CATEGORY, UPDATE_CATEGORY, DESTROY_CATEGORY } from "@/store/actions.type";
import { SET_CATEGORY, REMOVE_CATEGORY } from "@/store/mutations.type";

export default {
  props: {
    category: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    ColorIconPicker
  },
  data() {
    return {
      item: {}
    };
  },
  methods: {
    saveCategory() {
      if(this.category.id) {
        store.dispatch(UPDATE_CATEGORY, this.item);
      } else {
        store.dispatch(CREATE_CATEGORY, this.item);
      }
    },
    deleteCategory() {
      if(this.category.id) {
        store.dispatch(DESTROY_CATEGORY, this.item);
      } else {
        store.commit(REMOVE_CATEGORY, "");
      }
    },
    editCategory() {
      this.item.editing = true;
      store.commit(SET_CATEGORY, this.item);
    },
    changeColorIcon(bg, ic, col, idx) {
      this.item.editing = true;
      this.item.color = bg;
      this.item.icon = ic;
      this.item.icon_color = col;

      store.commit(SET_CATEGORY, this.item);
    }
  },
  watch: {
    category: {
      immediate: true,
      handler() {
        this.item = { ...this.category };
      }
    }
  }
}
</script>