<template>
  <v-tooltip bottom open-delay="200">
    <template v-slot:activator="data">
      <v-btn @click="edit" fab depressed small class="white" v-on="data.on">
        <font-awesome-icon
          color="grey"
          icon="edit"
        />
      </v-btn>
    </template>
    Edit
  </v-tooltip>
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