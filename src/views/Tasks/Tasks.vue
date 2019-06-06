<template>
  <div class="tasks" v-scroll-stop>
    <div class="text-center text-muted" v-if="tasks.length == 0 && !isRelevant">
      No tasks for today
    </div>
    <table class="col-12">
      <tbody name="table-row">
        <Task
          v-for="task in tasks"
          :task="task"
          :key="task.id"
          @updateTask="updateTask"
          @deleteTask="deleteTask"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import Task from "./Task";

export default {
  components: { Task },
  props: {
    day: {
      type: Date,
      default: new Date(),
      description: "Current day"
    }
  },
  data() {
    return {
      loading: true,
      tasks: [],
      errored: false
    };
  },
  mounted() {
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
          this.reorderTasks();
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
        a.status < b.status
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
.tasks
  overflow-y: auto
  flex-grow: 1
  padding-bottom: 200px
  .add-task
    position: absolute
    right: 10px
</style>
