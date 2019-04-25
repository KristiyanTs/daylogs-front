<template>
  <tr class="w-100">
    <td class="px-2 task-title">
      <form @submit.prevent="submitForm">
        <base-input v-model="title" placeholder="New task" />
        <!-- The following line submits the form when pressing enter -->
        <input type="submit" value="Submit" class="d-none" />
      </form>
    </td>
    <td class="text-right actions">
      <span class="icon icon-shape btn" round @click="submitForm">
        <font-awesome-icon icon="plus" class="text-success" />
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    day: {
      type: Date,
      default: () => new Date(),
      description: "Tasks day"
    }
  },
  data() {
    return {
      title: ""
    };
  },
  methods: {
    resetTask() {
      this.title = "";
    },
    submitForm() {
      this.axios
        .post("/api/tasks", {
          task: {
            title: this.title,
            day: this.day
          }
        })
        .then(response => {
          this.$emit("addTask", response.data);
          this.resetTask();
        })
        .catch(error => this.createFailed(error));
    },
    createFailed(errors) {
      console.log(errors);
    }
  }
}
</script>

<style scoped>
* /deep/ .form-group {
  margin-bottom: 0px !important;
}
</style>
