<template>
  <div class="tasks" v-scroll-stop>
    <div
      class="text-center text-muted"
      v-if="tasks.length == 0 && isRelevant && !loading"
    >
      No tasks for today
    </div>
    <table class="col-12">
      <draggable
        class="list-group"
        v-model="tasks"
        draggable=".task-row"
        tag="tbody"
        @start="drag = true"
        @end="drag = false"
        @change="updateOrder"
        name="table-row"
        v-bind="dragOptions"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <Task
            v-for="task in tasks"
            :task="task"
            :key="task.id"
            @updateTask="updateTask"
            @deleteTask="deleteTask"
          />
        </transition-group>
      </draggable>
    </table>
  </div>
</template>

<script>
import Task from "./Task";
import draggable from "vuedraggable";

export default {
  components: { Task, draggable },
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
      errored: false,
      drag: false
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
        a.position > b.position ? 1 : -1
      );
    },
    updateWorktime() {
      let time = this.tasks.reduce((total, task) => {
        return total + task.total_time;
      }, 0);
      this.$emit("worktimeUpdated", time);
    },
    updateOrder() {
      this.axios
        .post("/api/tasks/update_order", {
          day: this.day,
          tasks: this.tasks
        })
        .then(response => {
          this.tasks = response.data.tasks;
          this.reorderTasks();
        })
    }
  },
  computed: {
    isRelevant() {
      return this.moment().subtract(1, "days") <= this.day;
    },
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
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

.flip-list-move
  transition: transform 0.5s

.no-move
  transition: transform 0s

.ghost
  opacity: 0.5
  background: #c8ebfb

.list-group
  min-height: 20px
</style>
