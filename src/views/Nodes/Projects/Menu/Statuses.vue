<template>
  <v-flex xs12>
    <v-toolbar flat dense>
      <v-toolbar-title> Task statuses </v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="addStatus" color="grey">
        <font-awesome-icon icon="plus" />
      </v-btn>
    </v-toolbar>
    <v-list two-line v-if="statuses.length">
      <draggable
        v-model="statuses"
        @start="drag = true"
        @end="drag = false"
        v-bind="dragOptions"
        draggable=".v-list-item"
      >
        <v-list-item v-for="(item, idx) in statuses" :key="idx">
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
                @click="saveStatus(idx)"
                v-if="item.editing"
                fab
                depressed
                outlined
                small
                color="primary"
              >
                <font-awesome-icon icon="check" />
              </v-btn>
              <v-btn @click="editStatus(idx)" icon color="grey" v-else>
                <font-awesome-icon icon="edit" />
              </v-btn>
              <v-btn @click="deleteStatus(idx)" icon color="grey">
                <font-awesome-icon icon="trash-alt" />
              </v-btn>
            </v-flex>
          </v-list-item-action>
        </v-list-item>
      </draggable>
    </v-list>
  </v-flex>
</template>

<script>
import ColorPicker from "@/components/ColorPicker";
import draggable from "vuedraggable";

import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_STATUSES, CREATE_STATUS, UPDATE_STATUS, DESTROY_STATUS } from "@/store/actions.type";
import { ADD_STATUS, SET_STATUS, REMOVE_STATUS } from "@/store/mutations.type";

export default {
  components: {
    ColorPicker,
    draggable
  },
  data() {
    return {
      dragOptions: {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      },
    };
  },
  mounted() {
    store.dispatch(FETCH_STATUSES, this.current_node.id);
  },
  methods: {
    addStatus() {
      if(this.statuses.filter(s => s.id == "").length == 0) {
        store.commit(ADD_STATUS, null);
      }
    },
    saveStatus(idx) {
      if(this.statuses[idx].id) { // has an id => it already exists
        store.dispatch(UPDATE_STATUS, this.statuses[idx]);
      } else { // no id => it should be created
        store.dispatch(CREATE_STATUS, this.statuses[idx]);
      }
    },
    deleteStatus(idx) {
      if(this.statuses[idx].id) { // has an id => remove from server & store
        store.dispatch(DESTROY_STATUS, this.statuses[idx]);
      } else { // no id => remove from store
        store.commit(REMOVE_STATUS, "");
      }
    },
    editStatus(idx) {
      let status = this.statuses[idx];
      status.editing = true;
      store.commit(SET_STATUS, status);
    },
    changeColor(color, idx) { // redo
      let status = this.statuses[idx];
      status.color = color;
      this.statuses.splice(idx, 1, status);
    }
  },
  computed: {
    ...mapGetters(["current_node", "statuses"])
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