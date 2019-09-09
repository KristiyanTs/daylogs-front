<template>
  <v-navigation-drawer :value="sidebarRight" absolute clipped right width="400" class="sidebar-right">
    <v-layout column fill-height align-content-start>
      <v-divider />
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return { };
  },
  computed: {
    ...mapGetters(["sidebarRight"]),
  }
};
</script>

<style scoped lang="sass">
.v-navigation-drawer
  padding: 4px 0px 4px 4px
.flex.grow .v-list.v-sheet
  height: 100%
.projects-wrapper
  max-height: 200px
  overflow-y: scroll
.sidebar-right
  padding-top: 69px
  padding-left: 0px
</style>