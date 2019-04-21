<template>
  <modal :show.sync="modal" class="text-left" @close="closeModal">
    <template slot="header">
      Create new task
    </template>
    <form @submit.prevent="validateForm" v-cloak>
      <base-input placeholder="Title" v-model="title" alternative></base-input>
      <textarea
        v-model="description"
        class="form-control form-control-alternative mb-2"
        cols="30"
        rows="5"
        placeholder="Task description"
      ></textarea>
      <base-checkbox v-model="recurrent">Repeat daily</base-checkbox>
    </form>

    <template slot="footer">
      <base-button type="link" class="ml-auto" @click="closeModal">
        close
      </base-button>
      <base-button @click="validateForm" type="secondary" class="float-right">
        submit
      </base-button>
    </template>
  </modal>
</template>

<script>
import Modal from "@/components/Modal";

export default {
  components: {
    Modal
  },
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
    },
    modal: {
      type: Boolean,
      default: false,
      description: "Whether the modal is opened"
    }
  },
  data() {
    return {
      title: "",
      description: "",
      recurrent: false,
      flag: ""
    };
  },
  methods: {
    validateForm() {
      this.submitTask();
    },
    submitTask() {
      this.axios
        .post("/api/tasks", {
          task: {
            title: this.title,
            body: this.description,
            recurrent: this.recurrent,
            flag: this.flag,
            day: this.day
          }
        })
        .then(response => {
          this.createSuccessful(response.data);
        })
        .catch(error => this.createFailed(error));
    },
    createSuccessful(task) {
      this.$emit("addTask", task);
      this.closeModal();
    },
    createFailed(errors) {
      console.log(errors);
    },
    closeModal() {
      this.title = "";
      this.description = "";
      this.recurrent = false;
      this.flag = "";
      this.$emit("closeModal");
    }
  }
};
</script>

<style></style>
