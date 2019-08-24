<template>
  <span>
    <v-snackbar
      v-for="(alert, idx) in alerts"
      :key="idx"
      v-model="snackbar"
      :timeout="6000"
      right
      :color="alert[1]"
    >
      {{ alert[0] }}
      <v-btn text @click="closeAlert(alert[0])">
        <font-awesome-icon icon="times" />
      </v-btn>
    </v-snackbar>
  </span>
</template>

<script>
import { mapGetters } from "vuex";
import { CLOSE_ALERT } from "@/store/actions.type";

export default {
  data() {
    return {
      snackbar: true
    };
  },
  methods: {
    closeAlert(message) {
      this.$store.dispatch(CLOSE_ALERT, message);
    }
  },
  computed: {
    ...mapGetters(["alerts"])
  },
};
</script>
