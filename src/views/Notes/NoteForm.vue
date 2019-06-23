<template>
  <form @submit.prevent="submit">
    <v-layout row>
      <v-flex grow>
        <v-text-field label="Note title" v-model="title"></v-text-field>
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
  data() {
    return {
      title: ""
    };
  },
  methods: {
    submit() {
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
}
.note-form form {
  flex-grow: 1;
}
</style>
