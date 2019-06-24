<template>
  <Screen>
    <template v-slot:left>
      <day-select :day="day" @dayChange="changeDay" />
      <tasks :day="day" @worktimeUpdated="updateWorktime" ref="tasks" />
      <task-new :day="day" @addTask="addTask" v-if="isRelevant" />
    </template>
    <template v-slot:right>
      <log :day="day" />
    </template>
  </Screen>
</template>

<script>
import Log from "./Log";
import Tasks from "./Tasks";
import TaskNew from "./TaskNew";
import DaySelect from "./Navigation/DaySelect";
import Screen from "@/views/components/Screen";

export default {
  components: {
    Log,
    Tasks,
    TaskNew,
    DaySelect,
    Screen
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

<style lang="sass" scoped></style>
