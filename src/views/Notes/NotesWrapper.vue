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
        <v-list two-line subheader>
          <v-subheader inset>Notes</v-subheader>
          <notes-row
            v-for="note in notes"
            :key="note.id"
            :note="note"
            :selected="selected_note_id == note.id"
            @noteDeleted="deleteNote"
            @noteSelected="selectNote"
            @openEditDialog="openEditNote"
          />
        </v-list>
      </div>
      <note-form :key="0" @noteAdded="addNote" />
      <v-dialog v-model="editDialog" persistent width="500">
        <v-card>
          <v-card-title>
            <span class="headline">Edit note</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <form @submit.prevent="updateNote">
                    <v-text-field
                      autofocus
                      label="Title"
                      v-model="new_title"
                    ></v-text-field>
                    <input type="submit" value="Submit" class="d-none" />
                  </form>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="editDialog = false">Close</v-btn>
            <v-btn color="success" @click="updateNote">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:right>
      <Note :note_id="selected_note_id" @noteUpdated="noteUpdated" />
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
      note: () => {},
      loading: true,
      editDialog: false,
      new_title: ""
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
    updateNote() {
      this.axios
        .put(`/api/notes/${this.note.id}`, {
          note: { title: this.new_title }
        })
        .then(response => {
          this.editDialog = false;
          this.noteUpdated(response.data);
        })
        .catch(error => {
          this.requestError(error);
        });
    },
    deleteNote(note) {
      let index = this.notes.findIndex(n => n.id == note.id);
      this.notes.splice(index, 1);
      this.selected_note_id = this.notes[0].id;
    },
    addNote(note) {
      this.notes.unshift(note);
      this.selected_note_id = note.id;
    },
    noteUpdated(note) {
      this.deleteNote(note);
      this.addNote(note);
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
    },
    openEditNote(note) {
      this.editDialog = true;
      this.new_title = note.title;
      this.note = note;
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
