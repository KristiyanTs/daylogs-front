<template>
  <v-app id="app">
    <component :is="layout">
      <router-view />
    </component>
  </v-app>
</template>

<script>

export default {
  data() {
    return { };
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || "default") + "-layout";
    }
  }
};
</script>

<style lang="sass">
@import '../node_modules/vuetify/dist/vuetify.css'
.row
  margin: 0px !important
.container.grey.lighten-4
  padding: 0px
button:focus, a:focus
  outline: 0 !important
</style>
