<template>
  <v-flex xs12>
    <v-toolbar flat dense class="pr-2">
      <v-toolbar-title> Task statuses </v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="addStatus" color="grey">
        <font-awesome-icon icon="plus" />
      </v-btn>
    </v-toolbar>
    <v-list two-line subheader dense>
      <draggable
        v-model="statuses"
        @start="drag = true"
        @end="drag = false"
        v-bind="dragOptions"
        draggable=".v-list-item"
      >
        <StatusRow v-for="status in statuses" :key="status.id" :status="status" />
      </draggable>
    </v-list>
  </v-flex>
</template>

<script>
import draggable from "vuedraggable";
import StatusRow from "./StatusRow";

import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_STATUSES, UPDATE_STATUS, CREATE_ALERT } from "@/store/actions.type";
import { ADD_STATUS } from "@/store/mutations.type";

export default {
  components: {
    StatusRow,
    draggable
  },
  data() {
    return {
      drag: false,
      dragOptions: {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      },
    };
  },
  methods: {
    addStatus() {
      if(this.statuses.filter(s => s.id == "").length == 0) {
        store.commit(ADD_STATUS, null);
      } else {
        store.dispatch(CREATE_ALERT, ["Save the status first", "info"]);
      }
    }
  },
  computed: {
    statuses: {
      get() {
        return this.$store.state.statuses.statuses
      },
      set(new_statuses) {
        if(this.statuses.findIndex(s => s.editing) != -1) {
          store.dispatch(CREATE_ALERT, ["Save the status first", "info"]);
        } else {
          new_statuses.map((s, idx) => {
            let new_status = { ...s };
            new_status.order = idx;
            store.dispatch(UPDATE_STATUS, new_status);
          });
          store.dispatch(FETCH_STATUSES);
        }
      }
    }
  }
}
</script>