<template>
  <card id="date" shadow body-classes="px-lg-5 py-lg-3" class="shadow">
    <span class="icon icon-shape btn" round @click="shiftDate(-5)">
      <font-awesome-icon icon="angle-double-left" class="text-primary" />
    </span>
    <span class="icon icon-shape btn" round @click="shiftDate(-1)">
      <font-awesome-icon icon="chevron-left" class="text-primary" size="2x" />
    </span>
    <span
      ref="dateInput"
      class="date align-bottom"
      :class="{ 'text-muted': is_other_date }"
    >
      {{ get_date }}
      <!-- <flat-pickr v-model="day"></flat-pickr> -->
    </span>
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
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  props: {
    day: {
      type: Date,
      default: null,
      description: "Log's date"
    }
  },
  data() {
    return {
      flatpicker: null
    };
  },
  mounted() {
    let self = this;
    this.flatpicker = flatpickr(this.$refs.dateInput, {
      onChange(date) {
        self.$emit("dateChanged", date[0]);
      }
    });
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
      return moment(this.day).format("ddd, MMM Do");
    },
    is_other_date() {
      return (
        moment(this.day).format("Do MMM YY") !=
        moment(new Date()).format("Do MMM YY")
      );
    }
  },
  watch: {
    day() {
      this.flatpicker.now = this.day;
      this.flatpicker.setDate(this.day);
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
    font-size: 1.8em
    width:200px
    max-width:200px
    display: inline-block
</style>
