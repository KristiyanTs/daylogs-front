<template>
  <Screen>
    <template v-slot:left>
      <v-container class="px-0 py-0">
        <ProjectMenu />
      </v-container>
    </template>
    <template v-slot:right>
      <v-container class="px-0 py-0">
        <router-view />
      </v-container>
    </template>
  </Screen>
</template>

<script>
import Screen from "@/components/Screen2x1";
import ProjectMenu from "./Menu/ProjectMenu";
import { mapGetters } from "vuex";


export default {
  components: {
    Screen,
    ProjectMenu
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["current_node"]),
    rootId() {
      return this.$route.params.id;
    }
  }
}
</script>
