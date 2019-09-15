<template>
  <v-container class="px-0 py-0" v-if="editing">
    <v-toolbar flat dense>
      <v-toolbar-title>
      </v-toolbar-title>
      <v-spacer />
      <v-btn @click="cancel" color="grey" text class="mr-2"> Cancel </v-btn>
      <v-btn @click="save" color="success"> Save </v-btn>
    </v-toolbar>
    <v-container>
      <v-row dense>
        <v-col>
          <v-text-field v-model="node.title" label="Title" />
        </v-col>
      </v-row>
      <v-row>
        <vue-editor v-model="node.description" :editor-toolbar="customToolbar" />
      </v-row>
    </v-container>
  </v-container>
  <v-container class="px-0 py-0" v-else>
    <v-toolbar flat dense>
      <v-toolbar-title>{{ node.title }}</v-toolbar-title>
      <v-spacer />
      <FavoriteButton />
      <EditButton @clicked="editing = true" />
      <DeleteInspectedNodeButton v-if="node.ancestry" />
    </v-toolbar>
    <v-row v-if="node.created_at">
      <v-col>
        Created {{ moment(node.created_at).format("M/D/YY, H:mm") }}
      </v-col>
      <v-col>
        Updated {{ moment(node.updated_at).format("M/D/YY, H:mm") }}
      </v-col>
    </v-row>
    <v-divider />
    <v-row v-on:dblclick="editing = true">
      <v-col>
        <div v-html="node.description" class="preview"></div>
      </v-col>
    </v-row>
    <v-divider />
    <Comments />
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { CREATE_NODE, UPDATE_NODE, CHANGE_INSPECTED_NODE } from "@/store/actions.type";
import FavoriteButton from "@/components/FavoriteButton.vue";
import EditButton from "@/components/EditButton.vue";
import DeleteInspectedNodeButton from "@/components/DeleteInspectedNodeButton.vue";
import { VueEditor, Quill } from "vue2-editor";
import Comments from "@/views/Comments/Wrapper";

export default {
  components: {
    VueEditor,
    Quill,
    FavoriteButton,
    EditButton,
    DeleteInspectedNodeButton,
    Comments
  },
  data() {
    return { 
      node: {},
      editing: false
    };
  },
  methods: {
    save() {
      this.editing = false;
      if(this.node.id == "" || this.node.id == null) {
        store.dispatch(CREATE_NODE, this.node);
      } else { // it has an id => it exists => update
        store.dispatch(UPDATE_NODE, this.node);
      }
    },
    cancel() {
      if(this.node.id == "") {
        this.remove();
      } else {
        this.editing = false;
        this.node = { ...this.inspected_node }
      }
    }
  },
  computed: {
    ...mapGetters(["current_node", "inspected_node"])
  },
  watch: {
    inspected_node: {
      immediate: true,
      handler() {
        this.node = { ...this.inspected_node };
        if(this.node.id == "") {
          this.editing = true;
        } else {
          this.editing = false;
        }
      }
    }
  }
};
</script>
