<template>
  <card
    shadow
    body-classes="px-lg-3 pt-lg-3 pb-lg-5"
    class="shadow mt-2 tasks-card"
  >
    <div class="text-center text-muted" v-if="tasks.length == 0">
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
          :day="day"
          @updateTask="updateTask"
          @deleteTask="deleteTask"
        />
      </component>
    </table>
    <base-button
      v-if="isRelevant"
      @click="modal = true"
      round
      type="success"
      class="icon icon-shape p-0 add-task shadow"
      ><font-awesome-icon icon="plus"
    /></base-button>
    <FormModal
      :day="day"
      :modal="modal"
      @closeModal="closeModal"
      @addTask="addTask"
    />
  </card>
</template>

<script>
import Task from "./Task";
import FormModal from "./FormModal";
import moment from "moment";
import smoothReflow from "vue-smooth-reflow";

export default {
  components: {
    Task,
    FormModal
  },
  mixins: [smoothReflow],
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
    this.$smoothReflow();
  },
  methods: {
    getDayTasks() {
      this.loading = true;
      this.axios
        .get("/api/tasks", {
          headers: { Authorization: window.$cookies.get("jwt") },
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
      this.reorderTasks();
    },
    updateTask(task) {
      let index = this.tasks.findIndex(t => t.id == task.id);
      this.tasks.splice(index, 1, task);
      this.reorderTasks();
    },
    deleteTask(task) {
      let index = this.tasks.findIndex(t => t.id == task.id);
      this.tasks.splice(index, 1);
    },
    reorderTasks() {
      this.tasks = this.tasks.sort((a, b) =>
        a.completed > b.completed
          ? 1
          : a.completed === b.completed
          ? a.title > b.title
            ? 1
            : -1
          : -1
      );
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

<style lang="sass">
.tasks-card .add-task
  float: right
  bottom: -24px
  right: 10px

.container.w-100
  max-width: none

.mt--450
  margin-top: -450px

.row
  margin: 0px
</style>
