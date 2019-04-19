<template>
  <card
    id="date"
    type="secondary"
    shadow
    body-classes="px-lg-5 py-lg-3"
    class="shadow"
  >
    <span class="icon icon-shape btn" round @click="shiftDate(-5)">
      <font-awesome-icon icon="angle-double-left" class="text-primary" />
    </span>
    <span class="icon icon-shape btn" round @click="shiftDate(-1)">
      <font-awesome-icon icon="chevron-left" class="text-primary" size="2x" />
    </span>
    <span class="date align-bottom">{{ get_date }}</span>
    <span class="icon icon-shape btn" round @click="shiftDate(1)">
      <font-awesome-icon icon="chevron-right" class="text-primary" size="2x" />
    </span>
    <span class="icon icon-shape btn" round @click="shiftDate(5)">
      <font-awesome-icon icon="angle-double-right" class="text-primary" />
    </span>
  </card>
</template>

<script>
import moment from "moment";

export default {
  props: {
    day: {
      type: Date,
      default: null,
      description: "Log's date"
    }
  },
  data() {
    return {};
  },
  methods: {
    shiftDate(shift) {
      let day = moment(this.day)
        .add(shift, "days")
        .toDate();
      this.$emit("dateChanged", day);
    }
  },
  computed: {
    get_date() {
      return moment(this.day).format("Do MMM YY");
    }
  }
};
</script>

<style scoped lang="sass">
#date
  text-align: center

  .icon-shape
    padding: 5px

  .date
    font-size: 2em
    width:200px
    max-width:200px
    display: inline-block
</style>
