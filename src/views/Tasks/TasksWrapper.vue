<template>
  <div class="row">
    <div class="col-lg-5 col-xs-12 p-0">
      <day-select :day="day" @dayChange="changeDay" />
      <card
        body-classes="bg-white px-lg-3 pt-lg-3 pb-lg-5"
        class="mt-3 tasks-card"
      >
        <tasks :day="day" />
      </card>
    </div>
    <div class="col-lg-7 col-xs-12">
      <log :day="day" />
    </div>
  </div>
</template>

<script>
import Log from "./Log";
import Tasks from "./Tasks";
import DaySelect from "./Navigation/DaySelect";

export default {
  components: {
    Log,
    Tasks,
    DaySelect
  },
  data() {
    return {
      day: new Date()
    };
  },
  methods: {
    changeDay(day) {
      this.day = day;
    }
  }
}
</script>

<style></style>
