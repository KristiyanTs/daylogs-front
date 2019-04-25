<template>
  <tr class="w-100">
    <td class="px-2 task" :class="{ 'text-muted': task.completed }">
      {{ task.title }}
    </td>
    <td class="text-right actions">
      <span class="icon icon-shape btn" round @click="updateTask">
        <font-awesome-icon
          icon="check"
          :class="task.completed ? 'text-success' : 'text-muted'"
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
    return {};
  },
  methods: {
    updateTask() {
      this.axios
        .put(`/api/tasks/${this.task.id}`, {
          task: { completed: !this.task.completed }
        })
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
