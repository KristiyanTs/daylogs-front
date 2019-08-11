<template>
  <v-sheet height="64">
    <v-toolbar flat color="white">
      <v-btn outlined class="mr-3" @click="setToday">
        Today
      </v-btn>
      <v-btn fab text small @click="prev">
        <v-icon small>arrow_back_ios</v-icon>
      </v-btn>
      <v-btn fab text small @click="next">
        <v-icon small>arrow_forward_ios</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom right>
        <template v-slot:activator="{ on }">
          <v-btn outlined v-on="on">
            <span>{{ typeToLabel[type] }}</span>
            <v-icon right>arrow_drop_down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="type = 'day'">
            <v-list-item-title>Day</v-list-item-title>
          </v-list-item>
          <v-list-item @click="type = 'week'">
            <v-list-item-title>Week</v-list-item-title>
          </v-list-item>
          <v-list-item @click="type = 'month'">
            <v-list-item-title>Month</v-list-item-title>
          </v-list-item>
          <v-list-item @click="type = '4day'">
            <v-list-item-title>4 days</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
  </v-sheet>
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
