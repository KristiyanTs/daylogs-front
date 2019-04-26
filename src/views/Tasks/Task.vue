<template>
  <tr class="w-100">
    <td class="px-2 task" :class="{ 'text-muted': task.status == 'completed' }">
      {{ task.title }}
    </td>
    <td>
      {{ taskTime }}
    </td>
    <td class="text-right actions">
      <span
        class="icon icon-shape btn"
        round
        @click="runTask"
        v-if="task.status == 'created' || task.status == 'paused'"
      >
        <font-awesome-icon icon="play" class="text-muted" />
      </span>
      <span
        class="icon icon-shape btn"
        round
        @click="pauseTask"
        v-if="task.status == 'running'"
      >
        <font-awesome-icon icon="pause" class="text-success" />
      </span>
      <span class="icon icon-shape btn" round @click="completeTask">
        <font-awesome-icon
          icon="check"
          :class="task.status == 'completed' ? 'text-success' : 'text-muted'"
        />
      </span>
      <span class="icon icon-shape btn" round @click="deleteTask">
        <font-awesome-icon icon="trash-alt" class="text-muted" />
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  components: {},
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
    completeTask() {
      if (this.task.status != "completed") {
        this.updateTask({ status: "completed" });
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
        })
        .catch(() => {
          this.$store.commit("ADD_ALERT", ["An error ocurred.", "danger"]);
        });
    },
    deleteTask() {
      this.axios
        .delete(`/api/tasks/${this.task.id}`)
        .then(() => {})
        .catch(() => {
          this.$store.commit("ADD_ALERT", ["An error ocurred.", "danger"]);
        });

      this.$emit("deleteTask", this.task);
    }
  },
  computed: {
    taskTime() {
      let time;
      if (this.task.status == "running") {
        time = (this.$store.state.now - this.last_updated) / 1000;
        time = Math.round(this.task.total_time + time);
      } else if (this.task.status == "created") {
        return "";
      } else {
        time = this.task.total_time;
      }
      return this.moment.utc(time * 1000).format("HH:mm:ss");
    }
  }
};
</script>

<style scoped>
.table-row-move {
  transition: transform 0.2s;
}
.actions {
  width: 170px;
}
</style>
