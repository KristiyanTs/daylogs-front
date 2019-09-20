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
    <v-divider />
    <v-row v-on:dblclick="editing = true" >
      <v-col class="px-4">
        <span class="grey--text caption">Description</span>
        <br/>
        <div v-html="node.description" class="preview"></div>
      </v-col>
    </v-row>
    <v-row v-if="node.created_at">
      <v-col class="px-4">
        <v-tooltip bottom open-delay="500">
          <template v-slot:activator="data">
            <span class="caption grey--text" v-on="data.on">Created {{ moment(node.created_at).format("M/D/YY, H:mm") }}</span>
          </template>
          Updated {{ moment(node.updated_at).format("M/D/YY, H:mm") }}
        </v-tooltip>
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
      editing: false,
      customToolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ color: [] }],
        ["link", "image"],
        ["clean"]
      ]
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
