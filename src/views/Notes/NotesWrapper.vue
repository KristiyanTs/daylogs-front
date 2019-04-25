<template>
  <div class="row">
    <div class="col-lg-5 col-xs-12 p-0">
      <card body-classes="bg-white px-lg-3 pt-lg-3 pb-lg-5" class="notes-card">
        <span v-if="notes.length == 0" class="text-muted mb-3">
          You have no notes yet.
        </span>
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
      </card>
    </div>
    <div class="col-lg-7 col-xs-12">
      <Note :note_id="selected_note_id" />
    </div>
  </div>
</template>

<script>
import NotesRow from "./NotesRow";
import NoteForm from "./NoteForm";
import Note from "./Note";

export default {
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
.notes-card
  .add-note
    position: absolute
    bottom: -24px
    right: 10px
</style>
