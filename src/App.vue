<template>
  <div id="app">
    <router-view name="header"></router-view>
    <router-view name="sidebar"></router-view>
    <main :class="{ 'remove-width': sidebarOpened }">
      <fade-transition origin="center" mode="out-in" :duration="250">
        <router-view />
      </fade-transition>
    </main>
    <router-view name="footer"></router-view>
  </div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";

export default {
  components: { FadeTransition },
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
  width: calc(100vw - 120px);
  margin-left: 120px;
}
.row {
  margin: 0px !important;
}
.max-height {
  height: 100vh;
}
</style>
