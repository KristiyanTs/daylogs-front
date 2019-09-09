<template>
  <div>
    <Header />
    <SidebarLeft />
    <SidebarRight />
    <v-content dark>
      <slot />
    </v-content>
  </div>
</template>

<script>
import Header from "./AppHeader";
import SidebarLeft from "./AppSidebarLeft";
import SidebarRight from "./AppSidebarRight";

export default {
  components: {
    Header,
    SidebarLeft,
    SidebarRight
  },
  data: () => ({ })
};
</script>
