<template>
  <v-layout align-space-around justify-center row fill-height class="white">
    <v-flex d-flex xs12 md5 class="col-left">
      <slot name="left" />
    </v-flex>
    <v-flex d-flex xs12 md7 class="col-right" fill-height>
      <slot name="right" />
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "Screen",
  data() {
    return {};
  }
}
</script>

<style scoped lang="sass">
.col-left, .col-right
  height: calc(100vh - 62px)
.col-left
  border-right: 1px solid rgba(0,0,0,.12)
</style>