<template>
  <div class="row">
    <div class="col-lg-5 col-xs-12 p-0">
      <base-progress
        v-if="worktime > 0"
        type="default"
        id="progress"
        :value="ratio"
        label="Hours worked"
      ></base-progress>
      <day-select :day="day" @dayChange="changeDay" />
      <card
        body-classes="bg-white px-lg-3 pt-lg-3 pb-lg-5"
        class="mt-3 tasks-card"
      >
        <tasks :day="day" @worktimeUpdated="updateWorktime" />
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
      day: new Date(),
      worktime: 0
    };
  },
  mounted() {
    this.$store.dispatch("start");
  },
  methods: {
    changeDay(day) {
      this.day = day;
    },
    updateWorktime(time) {
      this.worktime = time;
    }
  },
  computed: {
    ratio() {
      return Math.round((this.worktime * 100) / 18000);
    }
  }
}
</script>

<style lang="scss">
#progress {
  position: absolute;
  top: -95px;
  width: 100%;

  .progress-label span {
    background: rgba(94, 114, 228, 0.5);
    color: #f0f3bd;
  }
  .progress-percentage span {
    color: #f0f3bd;
  }
  .progress {
    background-color: #f0f3bd;
  }
}
</style>
