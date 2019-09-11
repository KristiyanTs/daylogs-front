<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
  >
    <template v-slot:activator="{ on }">
      <v-btn x-small depressed fab :color="color" v-on="on">
        <font-awesome-icon :icon="icon" :color="icon_color" size="lg" />
      </v-btn>
    </template>

    <v-card>
      <v-container>
        <v-row justify="center" class="py-3">
          <v-btn fab depressed :color="local_color" large>
            <font-awesome-icon
              :icon="local_icon"
              :color="local_icon_color"
              size="2x"
            />
          </v-btn>
        </v-row>
        <v-tabs center>
          <v-tab>Background</v-tab>
          <v-tab>Icon</v-tab>
          <v-tab>Color</v-tab>

          <v-tab-item class="text-center">
            <v-color-picker
              flat
              show-swatches
              hide-canvas
              hide-inputs
              hide-mode-switch
              mode="hexa"
              :swatches="swatches"
              :value="local_color"
              @input="changeColor"
            ></v-color-picker>
          </v-tab-item>
          <v-tab-item class="px-2" style="max-width: 300px">
            <v-row justify="center" class="py-3" wrap>
              <v-btn
                v-for="i in icons" :key="i"
                :color="local_color"
                fab
                small
                elevation="0"
                class="my-1 mx-1"
                @click="changeIcon(i)"
              >
                <font-awesome-icon :icon="i" :color="local_icon_color" />
              </v-btn>
            </v-row>
          </v-tab-item>
          <v-tab-item class="text-center">
            <v-color-picker
              flat
              show-swatches
              hide-canvas
              hide-inputs
              hide-mode-switch
              mode="hexa"
              :swatches="swatches"
              :value="local_icon_color"
              @input="changeIconColor"
            ></v-color-picker>
          </v-tab-item>
        </v-tabs>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="menu = false">Cancel</v-btn>
          <v-btn color="primary" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "#000"
    },
    icon: {
      type: String,
      default: "redo-alt"
    },
    icon_color: {
      type: String,
      default: "#fff"
    }
  },
  data() {
    return {
      menu: false,
      local_color: "#fff",
      local_icon: "bug",
      local_icon_color: "#fff",
      swatches: [
        ["#F44336", "#E91E63", "#9C27B0"],
        ["#673AB7", "#3F51B5", "#2196F3"],
        ["#03A9F4", "#00BCD4", "#009688"],
        ["#4CAF50", "#8BC34A", "#CDDC39"],
        ["#FFEB3B", "#FFC107", "#FF9800"],
        ["#FF5722", "#795548", "#607D8B"],
        ["#9E9E9E", "$FFFFFF"]
      ],
      icons: ["bug", "list-ul", "list-ol", "quote-right", "code", "chevron-left", "chevron-right", "angle-double-left", "angle-double-right", "plus", "check", "redo", "trash-alt", "spinner", "user", "edit", "save", "play", "pause", "lock", "ellipsis-v", "at", "key", "times", "grip-vertical", "sticky-note", "pencil-alt", "code-branch", "tasks", "cog", "star", "redo-alt", "info-circle"]
    };
  },
  methods: {
    changeColor(color) {
      this.local_color = color;
    },
    changeIcon(icon) {
      this.local_icon = icon;
    },
    changeIconColor(icon_color) {
      this.local_icon_color = icon_color;
    },
    save() {
      this.menu = false;
      this.$emit(
        "changeColorIcon",
        this.local_color,
        this.local_icon,
        this.local_icon_color
      );
    }
  },
  watch: {
    color: {
      immediate: true,
      handler() {
        this.local_color = this.color;
      }
    },
    icon: {
      immediate: true,
      handler() {
        this.local_icon = this.icon;
      }
    },
    icon_color: {
      immediate: true,
      handler() {
        this.local_icon_color = this.icon_color;
      }
    }
  }
};
</script>
