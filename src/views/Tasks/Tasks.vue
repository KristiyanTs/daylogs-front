<template>
  <div class="tasks">
    <div class="text-center text-muted" v-if="tasks.length == 0 && !isRelevant">
      No tasks for today
    </div>
    <table class="col-12">
      <component
        :is="loading ? '' : 'transition-group'"
        tag="tbody"
        name="table-row"
      >
        <Task
          v-for="task in tasks"
          :task="task"
          :key="task.id"
          @updateTask="updateTask"
          @deleteTask="deleteTask"
        />
        <tr :key="1000" style="height: 30px" v-if="isRelevant"></tr>
        <task-form :day="day" key="0" @addTask="addTask" v-if="isRelevant" />
      </component>
    </table>
  </div>
</template>

<script>
import Task from "./Task";
import TaskForm from "./TaskForm";
import smoothReflow from "vue-smooth-reflow";

export default {
  components: {
    Task,
    TaskForm
  },
  props: {
    day: {
      type: Date,
      default: new Date(),
      description: "Current day"
    }
  },
  mixins: [smoothReflow],
  data() {
    return {
      loading: true,
      tasks: [],
      errored: false
    };
  },
  mounted() {
    this.$smoothReflow();
    this.getDayTasks();
  },
  methods: {
    getDayTasks() {
      this.loading = true;
      this.axios
        .get("/api/tasks", {
          headers: { Authorization: window.$cookies.get("jwt") },
          params: { day: this.day.toString() }
        })
        .then(response => {
          this.tasks = response.data;
          this.updateWorktime();
        })
        .catch(error => {
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    addTask(task) {
      this.tasks.push(task);
      this.reorderTasks();
    },
    updateTask(task) {
      let index = this.tasks.findIndex(t => t.id == task.id);
      this.tasks.splice(index, 1, task);
      this.reorderTasks();
      this.updateWorktime();
    },
    deleteTask(task) {
      let index = this.tasks.findIndex(t => t.id == task.id);
      this.tasks.splice(index, 1);
      this.updateWorktime();
    },
    reorderTasks() {
      this.tasks = this.tasks.sort((a, b) =>
        a.status > b.status
          ? 1
          : a.status === b.status
          ? a.title > b.title
            ? 1
            : -1
          : -1
      );
    },
    updateWorktime() {
      let time = this.tasks.reduce((total, task) => {
        return total + task.total_time;
      }, 0);
      this.$emit("worktimeUpdated", time);
    }
  },
  computed: {
    isRelevant() {
      return this.moment().subtract(1, "days") <= this.day;
    }
  },
  watch: {
    day() {
      this.getDayTasks();
    }
  }
};
</script>

<style lang="sass">
.tasks .add-task
  position: absolute
  bottom: -24px
  right: 10px
</style>
