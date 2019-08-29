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
      <v-row dense>
        <v-col>
          <v-select
            v-model="inspected_node.category_id"
            :items="categories"
            label="Type"
            chips
            item-text="title"
            item-value="id"
            item-color="red"
          >
            <template slot="selection" slot-scope="data">
              <v-chip
                pill
                :input-value="data.selected"
                :key="JSON.stringify(data.item)"
                @input="data.parent.selectItem(data.item)"
              >
                <v-avatar left :color="data.item.color">
                  <font-awesome-icon
                    :icon="data.item.icon"
                    :color="data.item.icon_color"
                  />
                </v-avatar>
                {{ data.item.title }}
              </v-chip>
            </template>
            <template slot="item" slot-scope="data">
              <v-chip pill>
                <v-avatar left :color="data.item.color">
                  <font-awesome-icon
                    :icon="data.item.icon"
                    :color="data.item.icon_color"
                  />
                </v-avatar>
                {{ data.item.title }}
              </v-chip>
            </template>
          </v-select>
        </v-col>
        <v-col>
          <v-select
            v-model="inspected_node.status_id"
            :items="statuses"
            label="Status"
            chips
            item-text="title"
            item-value="id"
            item-color="red"
          >
            <template slot="selection" slot-scope="data">
              <v-chip
                pill
                :input-value="data.selected"
                :key="JSON.stringify(data.item)"
                @input="data.parent.selectItem(data.item)"
              >
                <v-avatar left :color="data.item.color"></v-avatar>
                {{ data.item.title }}
              </v-chip>
            </template>
            <template slot="item" slot-scope="data">
              <v-chip pill>
                <v-avatar left :color="data.item.color"></v-avatar>
                {{ data.item.title }}
              </v-chip>
            </template>
          </v-select>
        </v-col>
      </v-row>
      <v-row>
        <vue-editor v-model="inspected_node.description" :editor-toolbar="customToolbar" />
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
    <v-divider v-if="inspected_node.created_at" />
    <v-row v-on:dblclick="edit">
      <v-col>
        <div v-html="inspected_node.description" class="preview"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { CREATE_NODE, UPDATE_NODE, DESTROY_NODE } from "@/store/actions.type";
import { SET_INSPECTED_NODE } from "@/store/mutations.type";

import { VueEditor, Quill } from "vue2-editor";

export default {
  components: {
    VueEditor,
    Quill
  },
  data() {
    return { 
      customToolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        ["bold", "italic", "underline", "strike"],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
        ],
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
      if(this.inspected_node.id == "" || this.inspected_node.id == null) { // it has an id => it exists => update
        store.dispatch(CREATE_NODE, this.inspected_node);
      } else {
        store.dispatch(UPDATE_NODE, this.inspected_node);
      }
    }
  },
  computed: {
    ...mapGetters(["current_node", "inspected_node", "categories", "statuses"])
  }
};
</script>

<style lang="sass">
.preview
  img
    max-width: 100%
    max-height: 300px
.quillWrapper #quill-container
  .ql-tooltip
    left: 0px !important
</style>
