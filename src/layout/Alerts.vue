<template>
  <span>
    <v-snackbar
      v-for="(alert, idx) in alerts"
      :key="idx"
      v-model="snackbar"
      right
      :color="alert[1]"
    >
      {{ alert[0] }}
      <v-btn text @click="snackbar = false">
        <font-awesome-icon icon="times" />
      </v-btn>
    </v-snackbar>
  </span>
</template>

<script>
export default {
  data() {
    return {
      snackbar: true
    };
  },
  computed: {
    alerts() {
      return this.$store.state.alerts;
    }
  }
};
</script>
