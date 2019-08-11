<template>
  <v-hover v-slot:default="{ hover }">
    <v-list-item :to="`/notes/${note.id}`" @click="selectNote">
      <v-list-item-avatar>
        <font-awesome-icon icon="sticky-note" color="grey" />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{ note.title }}</v-list-item-title>
        <v-list-item-subtitle
          >updated {{ moment(note.updated_at).fromNow() }}
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action v-if="hover || selected">
        <v-flex>
          <v-btn fab @click.prevent="updateNote" small text>
            <font-awesome-icon icon="edit" class="grey--text" />
          </v-btn>
          <v-btn fab @click.prevent="deleteNote" small text>
            <font-awesome-icon icon="trash-alt" class="grey--text" />
          </v-btn>
        </v-flex>
      </v-list-item-action>
    </v-list-item>
  </v-hover>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      default: () => {},
      description: "Note object"
    },
    selected: {
      type: Boolean,
      default: false,
      description: "Is this note currently opened"
    }
  },
  methods: {
    updateNote() {
      this.$emit("updateNote");
    },
    deleteNote() {
      this.axios
        .delete(`/api/notes/${this.note.id}`)
        .then(() => {
          this.$store.commit("ADD_ALERT", ["Note deleted.", "success"]);
        })
        .catch(error => {
          this.requestError(error);
        });

      this.$emit("noteDeleted", this.note);
    },
    selectNote() {
      this.$emit("noteSelected", this.note.id);
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

<style lang="sass" scoped>
.v-btn:focus
  outline: 0
</style>
