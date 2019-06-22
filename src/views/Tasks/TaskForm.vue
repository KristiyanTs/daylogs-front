<template>
  <div class="task-form">
    <div class="header">
      <base-input
        class="title"
        alternative
        placeholder="Task title"
        :value="task.title"
      ></base-input>
      <font-awesome-icon @click="closeEditBar" icon="times" size="2x"/>
    </div>
    <div class="content">
      <div class="description">
        <div>Description</div>
        <Editor
          :content="task.description"
          format="small"
          @contentChange="contentChange"
        />
      </div>
    </div>
    <div class="actions">
      <base-button type="link" @click="closeEditBar">Cancel</base-button>
      <base-button type="success" @click="submitForm">Save</base-button>
    </div>
  </div>
</template>

<script>
import Editor from "@/views/components/Editor";

export default {
  components: {
    Editor
  },
  props: {
    task_prop: {
      type: Object,
      default: () => {},
      description: "Task to display"
    }
  },
  data() {
    return {
      task: () => {}
    };
  },
  methods: {
    contentChange(newVal) {
      this.task.description = newVal;
    },
    closeEditBar() {
      this.$emit("closeEditBar");
    },
    submitForm() {
      this.axios
        .put(`/api/tasks/${this.task.id}`, {
          task: {
            title: this.task.title,
            description: this.task.description
          }
        })
        .then(response => {

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
  watch: {
    task_prop: {
      immediate: true,
      handler() {
        this.task = this.task_prop;
      }
    }
  }
}
</script>

<style scoped lang="sass">
.task-form
  height: 100%
  display: flex
  flex-direction: column

.header
  display: flex
  justify-content: space-between
  padding: 20px 15px 10px 15px
  .title
    flex-grow: 1
  svg
    margin-left: 15px
    margin-top: 5px

.content
  padding: 15px 50px 15px 15px
  flex-grow: 1
  .description

.actions
  display: flex
  justify-content: flex-end
  padding: 5px 15px
  
</style>