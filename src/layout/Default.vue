<template>
  <div>
    <Header />
    <Sidebar />
    <v-content dark>
      <slot />
    </v-content>
  </div>
</template>

<script>
import Header from "./AppHeader";
import Sidebar from "./AppSidebar";

export default {
  components: {
    Header,
    Sidebar
  },
  data: () => ({ })
};
</script>
