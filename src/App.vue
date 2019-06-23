<template>
  <v-app id="app">
    <Notifications />
    <Header />
    <Sidebar />
    <main :class="{ 'remove-width': sidebarOpened }">
      <fade-transition origin="center" mode="out-in" :duration="250">
        <router-view />
      </fade-transition>
    </main>
    <Footer />
  </v-app>
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
      return ["tasks", "notes", "profile"].includes(this.$route.name);
    }
  }
};
</script>

<style lang="sass">
@import '../node_modules/vuetify/dist/vuetify.css'

main
  min-height: 100vh !important
  color: #525f7f

main.remove-width
  margin-left: 120px

.row
  margin: 0px !important

.max-height
  height: 100vh

</style>
