<template>
  <div class="row max-height">
    <div class="col-lg-5 col-xs-12 px-4 tasks-wrapper">
      <day-select :day="day" @dayChange="changeDay" />
      <tasks :day="day" @worktimeUpdated="updateWorktime" ref="tasks" />
      <task-form :day="day" @addTask="addTask" v-if="isRelevant" />
    </div>
    <div class="col-lg-7 col-xs-12 p-0">
      <log :day="day" />
    </div>
  </div>
</template>

<script>
import Log from "./Log";
import Tasks from "./Tasks";
import TaskForm from "./TaskForm";
import DaySelect from "./Navigation/DaySelect";

export default {
  components: {
    Log,
    Tasks,
    TaskForm,
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
    },
    addTask(task) {
      this.$refs.tasks.addTask(task);
    }
  },
  computed: {
    isRelevant() {
      return this.moment().subtract(1, "days") <= this.day;
    }
  }
}
</script>

<style lang="scss" scoped>
.tasks-wrapper {
  max-height: 100vh;
  -webkit-box-shadow: 0px 0px 18px -14px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 18px -14px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 18px -14px rgba(0,0,0,0.75);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
}
.scrolling {
  height: 100%;
  overflow-y: scroll;
}
</style>
