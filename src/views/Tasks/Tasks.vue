<template>
  <div class="tasks" v-scroll-stop>
    <div
      class="text-center text-muted"
      v-if="!loading && tasks.length == 0 && isRelevant"
    >
      No tasks for today
    </div>
    <v-list subheader v-else>
      <v-subheader inset>Tasks</v-subheader>
      <draggable
        v-model="tasks"
        handle=".v-list__tile__content"
        ghost-class="ghost"
        @start="drag = true"
        @end="drag = false"
        @change="updateOrder"
        v-bind="dragOptions"
      >
        <Task
          v-for="task in tasks"
          :task="task"
          :key="task.id"
          @updateTask="updateTask"
          @deleteTask="deleteTask"
          @editTask="editTask"
        />
      </draggable>
    </v-list>
    <v-dialog v-model="editDialog" persistent width="500">
      <v-card>
        <v-card-title>
          <span class="headline">Edit task</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <form @submit.prevent="updateTaskModal">
                  <v-text-field
                    autofocus
                    label="Title"
                    v-model="new_title"
                  ></v-text-field>
                  <input type="submit" value="Submit" class="d-none" />
                </form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="editDialog = false">Close</v-btn>
          <v-btn color="success" @click="updateTaskModal">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      new_title: "",
      task: () => {},
      editDialog: false,
      loading: true,
      tasks: () => [],
      drag: false
    };
  },
  methods: {
    getDayTasks() {
      this.tasks = [];
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
          this.requestError(error);
        })
        .finally(() => (this.loading = false));
    },
    addTask(task) {
      this.tasks.push(task);
    },
    editTask(task) {
      this.task = task;
      this.editDialog = true;
      this.new_title = task.title;
    },
    updateTask(task) {
      let index = this.tasks.findIndex(t => t.id == task.id);
      this.tasks.splice(index, 1, task);
      this.updateWorktime();
    },
    updateTaskModal() {
      this.task.title = this.new_title;
      this.editDialog = false;
    },
    deleteTask(task) {
      let index = this.tasks.findIndex(t => t.id == task.id);
      this.tasks.splice(index, 1);
      this.updateWorktime();
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
        .catch(error => {
          this.requestError(error);
        });
    },
    requestError(error) {
      if (error.response.status == 401) {
        this.$store.dispatch("signedOut");
        this.$router.push("/");
      } else {
        this.$store.commit("ADD_ALERT", ["An error ocurred.", "danger"]);
      }
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
    day: {
      immediate: true,
      handler() {
        this.getDayTasks();
      }
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

.ghost
  opacity: 0.2
  background: #c8ebfb
</style>
