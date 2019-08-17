<template>
  <v-flex xs12>
    <v-toolbar flat dense>
      <v-toolbar-title> Task categories </v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="addCategory" color="grey">
        <font-awesome-icon icon="plus" />
      </v-btn>
      <v-btn icon @click="resetCategories" color="grey">
        <font-awesome-icon icon="redo-alt" />
      </v-btn>
      <v-btn icon @click="saveCategories" color="success">
        <font-awesome-icon icon="save" />
      </v-btn>
    </v-toolbar>
    <v-list two-line v-if="categories.length">
      <v-list-item v-for="(item, i) in categories" :key="i">
        <v-list-item-avatar>
          <ColorIconPicker
            :color="item.color"
            :icon="item.icon"
            :icon_color="item.icon_color"
            @changeColorIcon="(bg, ic, col) => changeColorIcon(bg, ic, col, i)"
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
          <v-btn
            v-if="item.editing"
            fab
            color="success"
            @click="deactivateAllCategories"
          >
            <font-awesome-icon icon="check" />
          </v-btn>
          <v-flex v-else>
            <v-btn icon @click="activateCategory(i)" color="grey">
              <font-awesome-icon icon="edit" />
            </v-btn>
            <v-btn icon @click="deleteCategory(i)" color="grey">
              <font-awesome-icon icon="trash-alt" />
            </v-btn>
          </v-flex>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-flex>
</template>

<script>
import ColorIconPicker from "@/components/ColorIconPicker";

export default {
  components: {
    ColorIconPicker
  },
  data() {
    return {
      project: {},
      categories: []
    };
  },
  methods: {
    getProject() {
      this.axios
        .get(`/api/nodes/${this.rootId}`)
        .then(response => {
          this.project = response.data;
          this.resetCategories();
        })
        .catch(error => {});
    },
    saveCategories() {
      this.axios
        .put(`/api/nodes/${this.project.id}`, {
          node: {
            ...this.project,
            categories_attributes: this.categories
          }
        })
        .then(() => {})
        .catch(error => {
          this.requestError(error);
        });
    },
    resetCategories() {
      this.categories = JSON.parse(JSON.stringify(this.project.categories));
    },
    deactivateAllCategories() {
      let category;
      this.categories.map((c, idx) => {
        category = c;
        category.editing = false;
        this.categories.splice(idx, 1, category);
      });
    },
    activateCategory(idx) {
      this.deactivateAllCategories();

      let category = this.categories[idx];
      category.editing = true;

      this.categories.splice(idx, 1, category);
    },
    deleteCategory(idx) {
      this.categories.splice(idx, 1);
    },
    addCategory() {
      this.deactivateAllCategories();
      this.categories.unshift({
        title: "",
        description: "",
        color: "#9E9E9E",
        icon: "check",
        icon_color: "#FFFFFF",
        editing: true
      });
    },
    changeColorIcon(bg, ic, col, idx) {
      let category = this.categories[idx];
      category.color = bg;
      category.icon = ic;
      category.icon_color = col;

      this.categories.splice(idx, 1, category);
    }
  },
  computed: {
    rootId() {
      return this.$route.params.id;
    }
  },
  watch: {
    rootId: {
      immediate: true,
      handler() {
        if (this.rootId) {
          this.getProject();
        }
      }
    }
  }
}
</script>