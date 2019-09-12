<template>
  <v-btn @click="edit" fab depressed small class="mr-2 white">
    <font-awesome-icon
      color="grey"
      icon="edit"
    />
  </v-btn>
</template>

<script>
export default {
  data() {
    return { };
  },
  methods: {
    edit() {
      this.$emit("clicked");
    }
  }
};
</script>