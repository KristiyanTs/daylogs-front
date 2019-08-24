<template>
  <span>
    <v-snackbar
      v-for="(alert, idx) in alerts"
      :key="idx"
      v-model="snackbar"
      :timeout="6000"
      :top="position.includes('top')"
      :right="position.includes('right')"
      :bottom="position.includes('bottom')"
      :left="position.includes('left')"
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
import { DESTROY_ALERT } from "@/store/actions.type";

export default {
  props: {
    position: {
      type: Array,
      default: () => ["top", "right"]
    }
  },
  data() {
    return {
      snackbar: true
    };
  },
  methods: {
    closeAlert(message) {
      this.$store.dispatch(DESTROY_ALERT, message);
    }
  },
  computed: {
    ...mapGetters(["alerts"])
  },
};
</script>
