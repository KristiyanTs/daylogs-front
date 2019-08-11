<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
  >
    <template v-slot:activator="{ on }">
      <v-btn fab elevation="0" :color="color" v-on="on"></v-btn>
    </template>

    <v-card>
      <v-color-picker
        width="100%"
        hide-canvas
        hide-inputs
        show-swatches
        mode="hexa"
        hide-mode-switch
        :swatches="swatches"
        :value="local_color"
        @input="changeColor"
        flat
      ></v-color-picker>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text @click="menu = false">Cancel</v-btn>
        <v-btn color="primary" text @click="saveColor">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "#000"
    }
  },
  data() {
    return {
      menu: false,
      local_color: "#fff",
      swatches: [
        ["#F44336", "#E91E63", "#9C27B0"],
        ["#673AB7", "#3F51B5", "#2196F3"],
        ["#03A9F4", "#00BCD4", "#009688"],
        ["#4CAF50", "#8BC34A", "#CDDC39"],
        ["#FFEB3B", "#FFC107", "#FF9800"],
        ["#FF5722", "#795548", "#607D8B"],
        ["#9E9E9E"]
      ]
    };
  },
  methods: {
    changeColor(color) {
      this.local_color = color;
    },
    saveColor() {
      this.menu = false;
      this.$emit("changeColor", this.local_color);
    }
  },
  watch: {
    color: {
      immediate: true,
      handler() {
        this.local_color = this.color;
      }
    }
  }
}
</script>