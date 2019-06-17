<template>
  <div class="note-form">
    <form @submit.prevent="submitForm">
      <base-input v-model="title" placeholder="New note" alternative />
      <!-- The following line submits the form when pressing enter -->
      <input type="submit" value="Submit" class="d-none" />
    </form>
    <span class="icon icon-shape btn" round @click="submitForm()">
      <font-awesome-icon icon="plus" class="text-success" />
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: ""
    };
  },
  methods: {
    submitForm() {
      this.axios
        .post("/api/notes", {
          note: {
            title: this.title
          }
        })
        .then(response => {
          this.$emit("noteAdded", response.data);
          this.title = "";
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
  }
}
</script>

<style scoped>
* /deep/ .form-group {
  margin-bottom: 0px !important;
}
.note-form {
  margin-top: 20px;
  display: flex;
  padding: 0px 1.5rem;
}
.note-form form {
  flex-grow: 1;
}
</style>
