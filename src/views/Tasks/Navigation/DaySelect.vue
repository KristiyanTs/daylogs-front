<template>
  <div id="date" class="px-lg-2 py-lg-5">
    <span class="icon icon-shape btn" round @click="shiftDate(-7)">
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
      {{ moment(day).format("ddd, MMM Do") }}
    </span>
    <span class="icon icon-shape btn" round @click="shiftDate(1)">
      <font-awesome-icon icon="chevron-right" class="text-primary" size="2x" />
    </span>
    <span class="icon icon-shape btn" round @click="shiftDate(7)">
      <font-awesome-icon icon="angle-double-right" class="text-primary" />
    </span>
  </div>
</template>

<script>
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  props: {
    day: {
      type: Date,
      default: () => new Date(),
      description: "Current day"
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
      onChange(day) {
        self.$emit("dayChange", day[0]);
      }
    });
  },
  methods: {
    shiftDate(shift) {
      let day = this.moment(this.day)
        .add(shift, "days")
        .toDate();
      this.$emit("dayChange", day);
    }
  },
  computed: {
    is_other_date() {
      return (
        this.moment(this.day).format("Do MMM YY") !=
        this.moment(new Date()).format("Do MMM YY")
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

  .date
    color: #05668d
  .icon-shape
    padding: 5px
    font-size: 1.4em

  .date
    font-size: 1.8em
    width:200px
    max-width:200px
    display: inline-block
</style>
