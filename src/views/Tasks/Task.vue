<template>
  <tr class="w-100">
    <td class="py-3 task" :class="{ 'text-muted': task.status == 'completed' }">
      {{ task.title }}
    </td>
    <td class="time text-muted">
      <span v-if="taskTime != '00:00:00'">{{ taskTime }}</span>
    </td>
    <td class="text-right actions">
      <span class="icon icon-shape btn" round @click="completeTask">
        <font-awesome-icon
          icon="check"
          :class="task.status == 'completed' ? 'text-success' : 'text-muted'"
        />
      </span>
      <base-dropdown direction="left" position="right">
        <span
          slot="title"
          round
          type="link"
          class="dropdown-toggle icon icon-shape btn mr-0 text-muted"
        >
          <font-awesome-icon icon="ellipsis-v" />
        </span>
        <span
          class="dropdown-item"
          @click="runTask"
          v-if="task.status == 'created' || task.status == 'paused'"
        >
          <font-awesome-icon icon="play" class="text-muted" />
          Start progress
        </span>
        <span
          class="dropdown-item"
          @click="pauseTask"
          v-if="task.status == 'running'"
        >
          <font-awesome-icon icon="pause" class="text-success" />
          Pause
        </span>
        <span class="dropdown-item" @click="deleteTask">
          <font-awesome-icon icon="trash-alt" class="text-muted" />
          Delete
        </span>
      </base-dropdown>
    </td>
  </tr>
</template>

<script>
import BaseDropdown from "@/components/BaseDropdown";
export default {
  components: {
    BaseDropdown
  },
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
    },
    formatTime(time) {
      if (time < 3600) {
        return `${Math.round(time / 1000)} m`;
      } else {
        return `${Math.round(time / 1000)} h`;
      }
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
      return this.formatTime(time);
    }
  }
};
</script>

<style scoped>
.table-row-move {
  transition: transform 0.2s;
}
tr {
  background-color: white;
  border-bottom: 1px solid rgb(229, 240, 255);
}
td.time {
  width: 80px;
  text-align: center;
}
td.actions {
  width: 150px;
}
</style>
