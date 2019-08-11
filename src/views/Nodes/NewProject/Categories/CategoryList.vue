<template>
  <div>
    <v-banner two-lines elevation="0" tile>
      <font-awesome-icon
        icon="info-circle"
        color="grey"
        slot="icon"
        size="2x"
      />
      Create your own set of node types or customize an existing one.
    </v-banner>
    <v-toolbar dense elevation="1">
      <v-toolbar-title>
        {{ category.label }} <span class="grey--text">({{ category.categories.length }})</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn
          text
          v-for="c in categories"
          :key="c.label"
          @click="setCategory(c)"
        >
          {{ c.label }}
        </v-btn>
      </v-toolbar-items>
      <v-btn icon @click="resetCategory">
        <font-awesome-icon icon="redo-alt" color="grey" />
      </v-btn>
      <v-btn icon @click="addCategory">
        <font-awesome-icon icon="plus" color="grey" />
      </v-btn>
    </v-toolbar>
    <v-list two-line>
      <v-list-item v-for="(item, i) in category.categories" :key="i">
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
          <v-flex v-if="!item.editing">
            <v-btn icon @click="activateCategory(i)">
              <font-awesome-icon icon="edit" color="grey" />
            </v-btn>
            <v-btn icon @click="deleteCategory(i)">
              <font-awesome-icon icon="trash-alt" color="grey" />
            </v-btn>
          </v-flex>
          <v-btn v-else fab color="success" @click="deactivateCategory(i)">
            <font-awesome-icon icon="check" />
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import ColorIconPicker from "@/components/ColorIconPicker";

export default {
  components: {
    ColorIconPicker
  },
  data() {
    return {
      category: {},
      categories: [
        {
          label: "Simple",
          categories: [
            {title: "Functionality", description: "", color: "", icon: "bug", icon_color: "#9E9E9E", editing: false},
            {title: "Task", description: "", color: "", icon: "bug", icon_color: "#9E9E9E", editing: false},
          ]
        },
        {
          label: "Complex",
          categories: [
            {title: "Functionality", description: "", color: "", icon: "bug", icon_color: "#9E9E9E", editing: false},
            {title: "Epic", description: "", color: "", icon: "bug", icon_color: "#9E9E9E", editing: false},
            {title: "Task", description: "", color: "", icon: "bug", icon_color: "#9E9E9E", editing: false},
            {title: "Bug", description: "", color: "", icon: "bug", icon_color: "#9E9E9E", editing: false},
            {title: "New Feature", description: "", color: "", icon: "bug", icon_color: "#9E9E9E", editing: false},
            {title: "Improvement", description: "", color: "", icon: "bug", icon_color: "#9E9E9E", editing: false},
          ]
        }
      ]
    };
  },
  mounted() {
    this.setCategory(this.categories[0]);
  },
  methods: {
    setCategory(c) {
      this.category = JSON.parse(JSON.stringify(c));
      this.$emit("updated", this.category);
    },
    resetCategory() {
      this.setCategory(
        this.categories.find(c => c.label == this.category.label)
      );
    },
    activateCategory(idx) {
      this.deactivateAllCategories();
      this.category.categories[idx].editing = true;
    },
    deactivateCategory(idx) {
      this.category.categories[idx].editing = false;
    },
    deactivateAllCategories() {
      this.category.categories.map(c => (c.editing = false));
    },
    addCategory() {
      this.deactivateAllCategories();
      this.category.categories.unshift({
        title: "",
        description: "",
        color: "#9E9E9E",
        icon: "check",
        icon_color: "#FFFFFF",
        editing: true
      });
      
      this.$emit("updated", this.category);
    },
    deleteCategory(idx) {
      this.category.categories.splice(idx, 1);

      this.$emit("updated", this.category);
    },
    changeColorIcon(bg, ic, col, idx) {
      this.category.categories[idx].color = bg;
      this.category.categories[idx].icon = ic;
      this.category.categories[idx].icon_color = col;

      this.$emit("updated", this.category);
    }
  }
};
</script>

<style lang="sass" scoped>
.v-list-item__content
  .v-input
    padding: 0px
    margin: 0px
    .v-input__slot
      margin: 0px
</style>