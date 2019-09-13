<template>
  <v-list-item>
    <v-list-item-avatar>
      <ColorPicker
        :color="item.color"
        @changeColor="color => changeColor(color, idx)"
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
          @click="saveStatus"
          fab
          depressed
          outlined
          small
          color="primary"
        >
          <font-awesome-icon icon="check" />
        </v-btn>
        <v-btn v-else @click="editStatus" icon color="grey">
          <font-awesome-icon icon="edit" />
        </v-btn>
        <v-btn @click="deleteStatus" icon color="grey">
          <font-awesome-icon icon="trash-alt" />
        </v-btn>
      </v-flex>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import ColorPicker from "@/components/ColorPicker";

import { mapGetters } from "vuex";
import store from "@/store";
import { CREATE_STATUS, UPDATE_STATUS, CREATE_ALERT } from "@/store/actions.type";
import { SET_STATUS } from "@/store/mutations.type";

export default {
  props: {
    status: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    ColorPicker
  },
  data() {
    return { 
      item: {}
    };
  },
  methods: {
    saveStatus() {
      if(this.status.id) {
        store.dispatch(UPDATE_STATUS, this.item);
      } else {
        store.dispatch(CREATE_STATUS, this.item);
      }
    },
    editStatus() {
      this.item.editing = true;
      store.commit(SET_STATUS, this.item);
    },
    deleteStatus() {
      if(this.item.id) {
        store.dispatch(DESTROY_STATUS, this.item);
      } else {
        store.commit(REMOVE_STATUS, "");
      }
    },
    changeColor(color, idx) {
      this.item.editing = true;
      this.item.color = color;
      store.commit(SET_STATUS, this.item);
    }
  },
  watch: {
    status: {
      immediate: true,
      handler() {
        this.item = { ...this.status }
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.ghost
  opacity: 0.2
  background: #c8ebfb
  .v-list-item__action, .v-list-item__content, .v-list-item__avatar
    opacity: 0
</style>