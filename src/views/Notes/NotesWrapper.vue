<template>
  <Screen>
    <template v-slot:left>
      <div class="notes-content" v-scroll-stop>
        <div
          v-if="notes.length == 0 && !loading"
          class="text-muted mb-3 text-center mt-5"
        >
          You have no notes yet.
        </div>
        <table class="notes-table w-100">
          <tbody class="w-100">
            <notes-row
              v-for="note in notes"
              :key="note.id"
              :note="note"
              :selected="selected_note_id == note.id"
              @noteDeleted="deleteNote"
              @noteUpdated="updateNote"
              @noteSelected="selectNote"
            />
            <tr :key="1000" style="height: 30px"></tr>
          </tbody>
        </table>
      </div>
      <note-form :key="0" @noteAdded="addNote" />
    </template>
    <template v-slot:right>
      <Note :note_id="selected_note_id" />
    </template>
  </Screen>
</template>

<script>
import NotesRow from "./NotesRow";
import NoteForm from "./NoteForm";
import Note from "./Note";
import Screen from "@/views/components/Screen";

export default {
  name: "notes",
  components: {
    NotesRow,
    NoteForm,
    Note,
    Screen
  },
  data() {
    return {
      selected_note_id: -1,
      notes: [],
      loading: true
    };
  },
  mounted() {
    this.getNotes();
  },
  methods: {
    getNotes() {
      this.axios
        .get("/api/notes", {
          headers: { Authorization: window.$cookies.get("jwt") }
        })
        .then(response => {
          this.notes = response.data;
          this.selected_note_id = this.notes[0].id;
        })
        .catch(error => {
          this.requestError(error);
        })
        .finally(() => (this.loading = false));
    },
    addNote(note) {
      this.notes.push(note);
      this.selected_note_id = note.id;
    },
    updateNote(note) {
      let index = this.notes.findIndex(n => n.id == note.id);
      this.notes.splice(index, 1, note);
    },
    deleteNote(note) {
      let index = this.notes.findIndex(n => n.id == note.id);
      this.notes.splice(index, 1);
    },
    selectNote(note_id) {
      this.selected_note_id = note_id;
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
  computed: {
    selectedNote() {
      return this.notes.find(n => n.id == this.selected_note_id);
    }
  }
}
</script>

<style scoped lang="sass">
.notes-content
  overflow-y: auto
  flex-grow: 1
  padding-bottom: 200px

</style>