<template>
  <Screen>
    <template v-slot:left>
      <day-select :day="day" @dayChange="changeDay" />
      <tasks
        :day="day"
        @worktimeUpdated="updateWorktime"
        @selectTask="openEditBar"
        ref="tasks"
      />
      <task-new :day="day" @addTask="addTask" v-if="isRelevant" />
    </template>
    <template v-slot:right>
      <TaskForm :task_prop="task" v-if="taskSelected" @closeEditBar="closeEditBar" />
      <log :day="day" v-else />
    </template>
  </Screen>
</template>

<script>
import Log from "./Log";
import Tasks from "./Tasks";
import TaskNew from "./TaskNew";
import DaySelect from "./Navigation/DaySelect";
import Screen from "@/views/components/Screen";
import TaskForm from "./TaskForm";

export default {
  components: {
    Log,
    Tasks,
    TaskNew,
    DaySelect,
    Screen,
    TaskForm
  },
  data() {
    return {
      day: new Date(),
      worktime: 0,
      taskSelected: false,
      task: () => {}
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
    },
    openEditBar(task) {
      this.task = task;
      this.taskSelected = true;
    },
    closeEditBar() {
      this.taskSelected = false;
    }
  },
  computed: {
    isRelevant() {
      return this.moment().subtract(1, "days") <= this.day;
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
