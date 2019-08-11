<template>
  <FormScreen :open="open" @closeDialog="closeDialog">
    <template v-slot:title>
      <span v-if="update">Update note</span>
      <span v-else>New note</span>
    </template>
    <template v-slot:form>
      <form @submit.prevent="submit">
        <v-layout row>
          <v-flex grow>
            <v-text-field label="Note title" v-model="title"></v-text-field>
          </v-flex>
          <input type="submit" value="Submit" class="d-none" />
        </v-layout>
      </form>
    </template>
    <template v-slot:actions>
      <v-btn color="grey" text @click="closeDialog">
        Close
      </v-btn>
      <v-btn color="primary" text @click="submit">
        Submit
      </v-btn>
    </template>
  </FormScreen>
</template>

<script>
import FormScreen from "@/components/FormScreen";

export default {
  components: {
    FormScreen
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    note: {
      type: Object,
      default: null
    },
    update: {
      type: Boolean,
      default: false,
      description: "Whether to update or create"
    }
  },
  data() {
    return {
      title: ""
    };
  },
  methods: {
    submit() {
      if (this.update) {
        this.updateNote();
      } else {
        this.createNote();
      }
    },
    createNote() {
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
    updateNote() {
      this.axios
        .put(`/api/notes/${this.note.id}`, {
          note: {
            title: this.title
          }
        })
        .then(response => {
          this.$emit("noteUpdated", response.data);
          this.closeDialog();
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
    },
    closeDialog() {
      this.$emit("closeDialog");
    }
  },
  watch: {
    update() {
      this.title = this.update ? this.note.title : "";
    },
    note() {
      this.title = this.update ? this.note.title : "";
    }
  }
}
</script>

<style scoped lang="sass">
form
  background: white
  margin-top: 2px
  padding: 5px 10px
</style>
