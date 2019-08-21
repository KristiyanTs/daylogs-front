<template>
  <v-app-bar app clipped-left elevation="0">
    <v-app-bar-nav-icon @click="toggleSidebar"></v-app-bar-nav-icon>
    <span class="title ml-3 mr-5 white--grey">
      <span class="font-weight-light">Day</span>Logs
    </span>
    <v-text-field
      solo-inverted
      flat
      hide-details
      label="Search"
      prepend-inner-icon="search"
    ></v-text-field>
    <v-spacer></v-spacer>
    <Alerts />
  </v-app-bar>
</template>

<script>
import Alerts from "./Alerts";

export default {
  components: {
    Alerts
  },
  props: {
    sidebar: {
      type: Boolean,
      default: false,
      description: "Is sidebar opened"
    }
  },
  data() {
    return {};
  },
  methods: {
    toggleSidebar() {
      this.$emit("toggleSidebar", !this.sidebar);
    }
  }
}
</script>
