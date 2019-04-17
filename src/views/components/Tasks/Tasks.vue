<template>
  <div class="tasks">
    <div class="text-center text-muted" v-if="tasks.length == 0">
      No tasks for today
    </div>
    <table class="col-12">
      <tbody>
        <Task
          v-for="task in tasks"
          :task="task"
          :key="task.id"
          :day="day"
          @deleteTask="deleteTask"
        />
      </tbody>
    </table>
    <FormModal
      :day="day"
      :modal="modal"
      @closeModal="closeModal"
      @addTask="addTask"
    />
    <base-button
      v-if="isRelevant"
      @click="modal = true"
      round
      type="success"
      class="icon icon-shape p-0 add-task shadow"
      ><font-awesome-icon icon="plus"
    /></base-button>
  </div>
</template>

<script>
import Task from "./Task";
import FormModal from "./FormModal";
import moment from "moment";

export default {
  components: {
    Task,
    FormModal
  },
  props: {
    day: {
      type: Date,
      default: new Date(),
      description: "The currently viewed date"
    }
  },
  data() {
    return {
      loading: true,
      tasks: [],
      errored: false,
      modal: false
    };
  },
  mounted() {
    this.getDayTasks();
  },
  methods: {
    getDayTasks() {
      this.axios
        .get("/api/tasks", {
          params: { day: this.day }
        })
        .then(response => {
          this.tasks = response.data;
        })
        .catch(error => {
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    addTask(task) {
      this.tasks.push(task);
    },
    deleteTask(task) {
      let index = this.tasks.findIndex(t => t.id == task.id);
      this.tasks.splice(index, 1);
    },
    closeModal() {
      this.modal = false;
    }
  },
  computed: {
    isRelevant() {
      return moment().subtract(1, "days") <= this.day;
    }
  },
  watch: {
    day() {
      this.getDayTasks();
    }
  }
};
</script>

<style>
.tasks .add-task {
  position: absolute;
  bottom: -24px;
  right: 10px;
}
</style>
