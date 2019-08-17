<template>
  <FormScreen :open="open" @closeDialog="closeDialog" width="800">
    <template v-slot:title>
      New task
    </template>
    <template v-slot:form>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="task.title"
          :counter="20"
          label="Title"
          required
        ></v-text-field>

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

        <Editor
          outlined
          :content="task.description"
          @contentChange="descriptionChange"
        />
      </v-form>
    </template>
    <template v-slot:actions>
      <v-btn color="grey" text @click="closeDialog">
        Close
      </v-btn>
      <v-btn color="primary" text @click="submit">
        Submit
      </v-btn>
    </template>
  </FormScreen>
</template>

<script>
import FormScreen from "@/components/FormScreen";
import Editor from "@/components/Editor";

export default {
  components: {
    FormScreen,
    Editor
  },
  props: {
    parent: {
      type: Object,
      default: () => {},
      description: "The currently opened node"
    },
    open: {
      type: Boolean,
      default: false,
      description: "Is the modal open"
    },
    statuses: {
      type: Array,
      default: () => [],
      description: "A list of all available statuses"
    },
    categories: {
      type: Array,
      default: () => [],
      description: "A list of all available categories"
    }
  },
  data() {
    return {
      valid: true,
      task: {}
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    submit() {
      this.create();
    },
    resetForm() {
      this.task = {
        parent_id: this.parent.id,
        title: "",
        description: "Description",
        category_id: null,
        status_id: null,
        reporter: null
      };
    },
    create() {
      this.axios
        .post("/api/nodes", {
          node: this.task
        })
        .then(() => {
          this.resetForm();
          this.closeDialog();
          this.$emit("created");
        })
        .catch(error => {
          this.requestError(error);
        });
    },
    descriptionChange(new_description) {
      this.task.description = new_description;
    },
    requestError(error) {
      if (error.response.status == 401) {
        this.$store.dispatch("signedOut");
        this.$router.push("/");
      } else {
        this.$store.commit("ADD_ALERT", ["An error ocurred.", "danger"]);
      }
    }
  },
  watch: {
    parent: {
      immediate: true,
      handler() {
        this.resetForm();
      }
    }
  }
}
</script>