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
          <v-text-field v-model="task.title" label="Title" />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col>
          <v-select
            v-model="task.category_id"
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
            v-model="task.status_id"
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
        <vue-editor v-model="task.description" :editor-toolbar="customToolbar" />
      </v-row> 
    </v-container>
  </v-container>
  <v-container class="px-0 py-0" v-else>
    <v-toolbar flat dense>
      <v-toolbar-title>
        {{ task.title }}
      </v-toolbar-title>
      <v-spacer />
      <FavoriteButton />
      <EditButton @clicked="editing = true" />
      <DeleteInspectedNodeButton />
    </v-toolbar>
    <v-row v-if="task.created_at">
      <v-col>
        Created {{ moment(task.created_at).format("M/D/YY, H:mm") }}
      </v-col>
      <v-col>
        Updated {{ moment(task.updated_at).format("M/D/YY, H:mm") }}
      </v-col>
    </v-row>
    <v-row v-if="task.created_at">
      <v-col>
        Category 
        <v-chip pill small>
          <v-avatar
            left
            :color="category.color"
          >
            <font-awesome-icon
              :icon="category.icon"
              :color="category.icon_color"
            />
          </v-avatar>
          {{ category.title }}
        </v-chip>
      </v-col>
      <v-col>
        Status 
        <v-chip pill small>
          <v-avatar
            left
            :color="status.color"
          />
          {{ status.title }}
        </v-chip>
      </v-col>
    </v-row>
    <v-divider v-if="task.created_at" />
    <v-row v-on:dblclick="edit">
      <v-col>
        <div v-html="task.description" class="preview"></div>
      </v-col>
    </v-row>
    <v-divider />
    <Comments />
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { CREATE_NODE, UPDATE_NODE, DESTROY_NODE, CHANGE_INSPECTED_NODE } from "@/store/actions.type";
import { VueEditor, Quill } from "vue2-editor";
import FavoriteButton from "@/components/FavoriteButton.vue";
import EditButton from "@/components/EditButton.vue";
import DeleteInspectedNodeButton from "@/components/DeleteInspectedNodeButton.vue";
import Comments from "@/views/Comments/Wrapper";

export default {
  components: {
    VueEditor,
    Quill,
    FavoriteButton,
    Comments,
    EditButton,
    DeleteInspectedNodeButton
  },
  data() {
    return {
      task: {},
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
    edit() {
      this.editing = true;
    },
    remove() {
      store.dispatch(DESTROY_NODE, this.task);
    },
    save() {
      this.editing = false;
      if(this.task.id == "" || this.task.id == null) { // it has an id => it exists => update
        store.dispatch(CREATE_NODE, this.task);
      } else {
        store.dispatch(UPDATE_NODE, this.task);
      }
    },
    cancel() {
      if(this.task.id == "") {
        this.remove();
      } else {
        this.editing = false;
        this.task = { ...this.inspected_node }; 
      }
    }
  },
  computed: {
    ...mapGetters(["current_node", "inspected_node", "categories", "statuses"]),
    category() {
      return this.categories.find(c => c.id == this.task.category_id);
    },
    status() {
      return this.statuses.find(s => s.id == this.task.status_id);
    }
  },
  watch: {
    inspected_node: {
      immediate: true,
      handler() {
        this.task = { ...this.inspected_node };
        if(this.task.id == "") {
          this.editing = true;
        } else {
          this.editing = false;
        }
      }
    }
  }
};
</script>

<style lang="sass">
.preview
  img
    max-width: 100%
    max-height: 300px
.quillWrapper 
  width: 100%
  #quill-container
    .ql-tooltip
      left: 0px !important
.v-chip--pill.v-size--small .v-avatar
  height: 24px !important
  width: 24px !important

</style>
