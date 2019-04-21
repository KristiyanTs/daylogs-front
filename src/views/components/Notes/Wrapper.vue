<template>
  <card
    shadow
    header-classes="pb-5"
    body-classes="px-lg-0 py-lg-0"
    class="shadow editor"
  >
    <Log :day="day" />
  </card>
</template>

<script>
import Log from "./Log";

export default {
  components: {
    Log
  },
  props: {
    day: {
      type: Date,
      default: new Date(),
      description: "Log's date"
    }
  },
  data() {
    return {

    };
  }
}
</script>

<style></style>
