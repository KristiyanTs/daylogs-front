<template>
  <div class="row max-height">
    <div class="col-lg-5 col-xs-12 px-4 tasks-wrapper">
      <day-select :day="day" @dayChange="changeDay" />
      <!-- <base-progress
        v-if="worktime > 0"
        type="default"
        id="progress"
        :value="ratio"
      ></base-progress> -->
      <div class="scrolling">
        <tasks :day="day" @worktimeUpdated="updateWorktime" />
      </div>
    </div>
    <div class="col-lg-7 col-xs-12 p-0">
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

<style lang="scss" scoped>
#progress {
  width: 100%;

  .progress-label span {
    background: rgba(94, 114, 228, 0.5);
    color: #E8F6FF;
  }
  .progress-percentage span {
    color: #E8F6FF;
  }
  .progress {
    background-color: #E8F6FF;
  }
}
.tasks-wrapper {
  max-height: 100vh;
  -webkit-box-shadow: 0px 0px 18px -14px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 18px -14px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 18px -14px rgba(0,0,0,0.75);
}
.scrolling {
  height: 100%;
  overflow-y: scroll;
}
</style>
