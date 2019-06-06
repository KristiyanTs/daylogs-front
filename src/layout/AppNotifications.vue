<template>
  <div id="alerts" v-if="anyAlerts" class="d-flex flex-row-reverse">
    <base-alert
      v-for="[message, status] in $store.state.alerts"
      dismissible="true"
      :type="status"
      :message="message"
      :key="message"
      class="alert-message text-center"
    >
      {{ message }}
    </base-alert>
  </div>
</template>
<script>
import BaseAlert from "@/components/BaseAlert";

export default {
  components: {
    BaseAlert
  },
  computed: {
    anyAlerts() {
      return this.$store.state.alerts.length;
    }
  }
};
</script>
<style scoped lang="scss">
#alerts {
  position: absolute;
  top: 20px;
  z-index: 1000;
  width: 100vw;
  padding-right: 20px;

  .alert-message {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 300px;
    min-width: 250px;
    min-height: 70px;
    padding: 10px 30px;
  }
}
</style>
