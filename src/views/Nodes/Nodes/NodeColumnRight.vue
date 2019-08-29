<template>
  <v-container class="px-0 py-0" v-if="inspected_node.editing">
    <v-toolbar flat dense>
      <v-toolbar-title>
      </v-toolbar-title>
      <v-spacer />
      <v-btn @click="save" color="success"> Save </v-btn>
    </v-toolbar>
    <v-container>
      <v-row dense>
        <v-col>
          <v-text-field v-model="inspected_node.title" label="Title" />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
  <v-container class="px-0 py-0" v-else>
    <v-toolbar flat dense>
      <v-toolbar-title>{{ inspected_node.title }}</v-toolbar-title>
      <v-spacer />
      <v-btn @click="toggleFavorite" fab depressed small class="mr-2">
        <font-awesome-icon
          color="grey"
          icon="star"
        />
      </v-btn>
      <v-btn @click="edit" fab depressed small class="mr-2">
        <font-awesome-icon
          color="grey"
          icon="edit"
        />
      </v-btn>
      <v-btn @click="remove" fab depressed small>
        <font-awesome-icon
          color="grey"
          icon="trash-alt"
        />
      </v-btn>
    </v-toolbar>
    <v-row v-if="inspected_node.created_at">
      <v-col>
        Created {{ moment(inspected_node.created_at).format("M/D/YY, H:mm") }}
      </v-col>
      <v-col>
        Updated {{ moment(inspected_node.updated_at).format("M/D/YY, H:mm") }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { CREATE_NODE, UPDATE_NODE, DESTROY_NODE } from "@/store/actions.type";
import { SET_INSPECTED_NODE } from "@/store/mutations.type";

export default {
  data() {
    return { };
  },
  methods: {
    edit() {
      let node = this.inspected_node;
      node.editing = true;
      store.commit(SET_INSPECTED_NODE, node);
    },
    remove() {
      store.dispatch(DESTROY_NODE, this.inspected_node);
    },
    toggleFavorite() {
      
    },
    save() {
      this.inspected_node.editing = false;
      if(this.inspected_node.id == "" || this.inspected_node.id == null) {
        store.dispatch(CREATE_NODE, this.inspected_node);
      } else { // it has an id => it exists => update
        store.dispatch(UPDATE_NODE, this.inspected_node);
      }
    }
  },
  computed: {
    ...mapGetters(["current_node", "inspected_node"])
  }
};
</script>
