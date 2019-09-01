<template>
  <NodeColumnRight v-if="$route.name == 'Nodes'" />
  <v-container class="px-0 py-0" v-else>
    <router-view></router-view>
  </v-container>
</template>

<script>
import NodeColumnRight from "./NodeColumnRight";

export default {
  components: {
    NodeColumnRight
  },
  data() {
    return {};
  }
};
</script>
