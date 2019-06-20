<template>
  <div class="task-form">
    <form @submit.prevent="submit">
      <base-input v-model="title" placeholder="New task" alternative />
      <!-- The following line submits the form when pressing enter -->
      <input type="submit" value="Submit" class="d-none" />
    </form>
    <span class="icon icon-shape btn" round @click="submit">
      <font-awesome-icon icon="plus" class="text-success" />
    </span>
  </div>
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
    submit() {
      if (this.title.length == 0) return;
      this.axios
        .post("/api/tasks", {
          task: {
            title: this.title,
            day: this.day.toString()
          }
        })
        .then(response => {
          this.$emit("addTask", response.data);
          this.resetTask();
        })
        .catch(error => this.requestError(error));
    },
    requestError(error) {
      if (error.response.status == 401) {
        this.$store.dispatch("signedOut");
        this.$router.push("/");
      } else {
        this.$store.commit("ADD_ALERT", ["An error ocurred.", "danger"]);
      }
    }
  }
}
</script>

<style scoped>
* /deep/ .form-group {
  margin-bottom: 0px !important;
}
.task-form {
  margin-top: 20px;
  display: flex;
}
.task-form form {
  flex-grow: 1;
}
</style>
