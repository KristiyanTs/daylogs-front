<template>
  <v-list-item>
    <v-list-item-avatar>
      <font-awesome-icon
        @click="completeTask"
        icon="check"
        :color="task.status == 'completed' ? '#2dce89' : 'grey'"
      />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ task.title }}</v-list-item-title>
    </v-list-item-content>

    <v-list-item-action>
      <v-menu
        bottom
        origin="center center"
        transition="scale-transition"
        left
        nudge-bottom="40"
      >
        <template v-slot:activator="{ on }">
          <v-btn icon ripple color="transparent" v-on="on">
            <font-awesome-icon icon="ellipsis-v" color="grey" />
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="editTask">
            <v-list-item-avatar
              ><font-awesome-icon icon="edit" class="text-muted mr-3"
            /></v-list-item-avatar>
            <v-list-item-content
              ><v-list-item-title
                >Rename</v-list-item-title
              ></v-list-item-content
            >
          </v-list-item>
          <v-list-item @click="deleteTask">
            <v-list-item-avatar
              ><font-awesome-icon icon="trash-alt" class="text-muted mr-3"
            /></v-list-item-avatar>
            <v-list-item-content
              ><v-list-item-title
                >Delete</v-list-item-title
              ></v-list-item-content
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      default: () => {},
      description: "Task object"
    },
    day: {
      type: Date,
      default: () => new Date(),
      description: "Current day"
    }
  },
  data() {
    return {
      last_updated: new Date()
    };
  },
  methods: {
    runTask() {
      this.updateTask({ status: "running" });
    },
    pauseTask() {
      this.updateTask({ status: "paused" });
    },
    editTask() {
      this.$emit("editTask", this.task);
    },
    completeTask() {
      if (this.task.status != "completed") {
        this.updateTask({ status: "completed" });
      } else {
        this.updateTask({ status: "created" });
      }
    },
    updateTask(params) {
      this.axios
        .put(`/api/tasks/${this.task.id}`, {
          task: params
        })
        .then(response => {
          this.$emit("updateTask", response.data);
          this.last_updated = new Date();
          this.editing = false;
        })
        .catch(error => {
          this.requestError(error);
        });
    },
    deleteTask() {
      this.axios
        .delete(`/api/tasks/${this.task.id}`)
        .then(() => {})
        .catch(error => {
          this.requestError(error);
        });

      this.$emit("deleteTask", this.task);
    },
    requestError(error) {
      if (error.response.status == 401) {
        this.$store.dispatch("signedOut");
        this.$router.push("/");
      } else {
        this.$store.commit("ADD_ALERT", ["An error ocurred.", "danger"]);
      }
    },
    formatTime(time) {
      let formatted = "";
      if (time > 3600) {
        formatted += `${Math.round(time / 3600)}h `;
        time %= 3600;
      }
      if (time > 60) formatted += `${Math.round(time / 60)}m`;
      return formatted;
    }
  },
  computed: {
    taskTime() {
      if (this.task.status == "running") {
        let time = (this.$store.state.now - this.last_updated) / 1000;
        return this.formatTime(Math.round(this.task.total_time + time));
      } else if (this.task.status == "created") {
        return "";
      } else {
        return this.formatTime(this.task.total_time);
      }
    },
    title() {
      return this.task.title;
    }
  },
  watch: {
    title() {
      this.updateTask({ title: this.task.title });
    }
  }
};
</script>

<style scoped lang="sass">
.list-group-item
  display: flex
  padding: 0px
  border: 0px
  background-color: white
  
td.time
  display: flex
  width: 70px
  span
    margin: auto

td.actions
  width: 120px
  display: flex
  span, li
    margin: auto

td.handle
  padding-right: 20px
  align-self: stretchs
  cursor: ns-resize

td.handle svg
  height: 100%

.v-btn:focus
  outline: 0
</style>
