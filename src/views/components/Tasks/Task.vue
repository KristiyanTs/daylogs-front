<template>
  <tr class="w-100">
    <td class="px-2 task">{{ task.title }}</td>
    <td class="text-right actions">
      <span class="icon icon-shape btn" round @click="updateTask('completed')">
        <font-awesome-icon
          icon="check"
          :class="task.completed ? 'text-success' : 'text-muted'"
        />
      </span>
      <span
        v-if="isRelevant"
        class="icon icon-shape btn"
        round
        @click="updateTask"
      >
        <font-awesome-icon icon="redo" class="text-muted" />
      </span>
      <span class="icon icon-shape btn" round @click="deleteTask">
        <font-awesome-icon icon="trash-alt" class="text-muted" />
      </span>
    </td>
  </tr>
</template>

<script>
import moment from "moment";

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
      default: new Date(),
      description: "The currently viewed date"
    }
  },
  data() {
    return {};
  },
  methods: {
    updateTask(column) {
      let params =
        column == "completed"
          ? { completed: !this.task.completed }
          : { recurrent: !this.task.recurrent };

      this.axios
        .put(`/api/tasks/${this.task.id}`, { task: params })
        .then(response => {
          this.$emit("updateTask", response.data);
          this.$store.commit("ADD_ALERT", ["Task updated.", "success"]);
        })
        .catch(() => {
          this.$store.commit("ADD_ALERT", ["An error ocurred.", "danger"]);
        });
    },
    deleteTask() {
      this.axios
        .delete(`/api/tasks/${this.task.id}`)
        .then(() => {
          this.$store.commit("ADD_ALERT", ["Task deleted.", "success"]);
        })
        .catch(() => {
          this.$store.commit("ADD_ALERT", ["An error ocurred.", "danger"]);
        });

      this.$emit("deleteTask", this.task);
    }
  },
  computed: {
    isRelevant() {
      return moment().subtract(1, "days") <= this.day;
    }
  }
};
</script>

<style scoped>
.task {
  border-radius: 25px;
}
.actions {
  width: 170px;
}
</style>
