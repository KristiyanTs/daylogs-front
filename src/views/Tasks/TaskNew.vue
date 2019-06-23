<template>
  <form @submit.prevent="submit">
    <v-layout row>
      <v-flex grow>
        <v-text-field label="Task title" v-model="title"></v-text-field>
      </v-flex>
      <v-flex shrink>
        <v-btn fab dark small color="success" depressed @click="submit">
          <font-awesome-icon icon="plus" color="white" />
        </v-btn>
      </v-flex>
      <!-- The following line submits the form when pressing enter -->
      <input type="submit" value="Submit" class="d-none" />
    </v-layout>
  </form>
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

<style scoped lang="sass">
form
  padding: 0px 15px
</style>
