<template>
  <v-layout justify-center>
    <v-dialog
      v-model="open"
      :width="width"
      @click:outside="closeDialog"
      @keydown.esc="closeDialog"
    >
      <v-card>
        <v-card-title>
          <span class="headline"><slot name="title"/></span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <slot name="form" />
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <slot name="actions" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false
    },
    width: {
      type: [Number, String],
      default: 600,
      description: "The width of the modal"
    }
  },
  name: "Screen",
  data() {
    return {};
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    }
  }
}
</script>

<style scoped lang="sass">
</style>