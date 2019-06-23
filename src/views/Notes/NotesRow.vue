<template>
  <v-list-tile avatar @click="selectNote" :class="{highlighted: selected}">
    <v-list-tile-avatar>
      <font-awesome-icon icon="sticky-note" color="grey" />
    </v-list-tile-avatar>

    <v-list-tile-content>
      <v-list-tile-title>{{ note.title }}</v-list-tile-title>
      <v-list-tile-sub-title
        >updated {{ moment(note.updated_at).fromNow() }}
      </v-list-tile-sub-title>
    </v-list-tile-content>

    <v-list-tile-action>
      <v-menu
        bottom
        origin="center center"
        transition="scale-transition"
        left
        nudge-bottom="40"
      >
        <template v-slot:activator="{ on }">
          <v-btn icon ripple color="transparent" v-on="on">
            <font-awesome-icon icon="ellipsis-v" color="grey" />
          </v-btn>
        </template>
        <v-list>
          <v-list-tile avatar @click="updateNote">
            <v-list-tile-avatar
              ><font-awesome-icon icon="edit" class="text-muted mr-3"
            /></v-list-tile-avatar>
            <v-list-tile-content
              ><v-list-tile-title
                >Rename</v-list-tile-title
              ></v-list-tile-content
            >
          </v-list-tile>
          <v-list-tile avatar @click="deleteNote">
            <v-list-tile-avatar
              ><font-awesome-icon icon="trash-alt" class="text-muted mr-3"
            /></v-list-tile-avatar>
            <v-list-tile-content
              ><v-list-tile-title
                >Delete</v-list-tile-title
              ></v-list-tile-content
            >
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-list-tile-action>
  </v-list-tile>
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
  data() {
    return {data: false};
  },
  methods: {
    updateNote() {
      this.$emit("openEditDialog", this.note);
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
      if (!this.updating) {
        this.$emit("noteSelected", this.note.id);
      }
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
.highlighted
  background-color: #ECEFF1
.v-btn:focus
  outline: 0
</style>
