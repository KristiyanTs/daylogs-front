<template>
  <div class="row max-height">
    <div class="col-lg-5 col-xs-12 px-0 notes-list">
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
          <note-form :key="0" @noteAdded="addNote" />
        </tbody>
      </table>
    </div>
    <div class="col-lg-7 col-xs-12 p-0">
      <Note :note_id="selected_note_id" />
    </div>
  </div>
</template>

<script>
import NotesRow from "./NotesRow";
import NoteForm from "./NoteForm";
import Note from "./Note";

export default {
  name: "notes",
  components: {
    NotesRow,
    NoteForm,
    Note
  },
  data() {
    return {
      selected_note_id: 0,
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
        .catch(() => {
          this.errored = true;
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
.notes-list
  max-height: 100vh
  -webkit-box-shadow: 0px 0px 18px -14px rgba(0,0,0,0.75)
  -moz-box-shadow: 0px 0px 18px -14px rgba(0,0,0,0.75)
  box-shadow: 0px 0px 18px -14px rgba(0,0,0,0.75)
</style>
