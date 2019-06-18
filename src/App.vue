<template>
  <div id="app">
    <Notifications />
    <Header />
    <Sidebar />
    <main :class="{ 'remove-width': sidebarOpened }">
      <fade-transition origin="center" mode="out-in" :duration="250">
        <router-view />
      </fade-transition>
    </main>
    <Footer />
  </div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";
import Notifications from "@/layout/AppNotifications";
import Header from "@/layout/AppHeader";
import Sidebar from "@/layout/AppSidebar";
import Footer from "@/layout/AppFooter";

export default {
  components: {
    FadeTransition,
    Header,
    Notifications,
    Sidebar,
    Footer
  },
  data() {
    return {};
  },
  computed: {
    sidebarOpened() {
      return ["tasks", "notes", "sounds", "profile"].includes(this.$route.name);
    }
  }
};
</script>

<style>
main {
  min-height: 100vh !important;
}
main.remove-width {
  margin-left: 120px;
}
.row {
  margin: 0px !important;
}
.max-height {
  height: 100vh;
}
</style>
