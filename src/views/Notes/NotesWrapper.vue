<template>
  <Screen>
    <template v-slot:left>
      <v-toolbar flat dense>
        <v-toolbar-title>Notes</v-toolbar-title>

        <v-spacer></v-spacer>

        <template v-if="$vuetify.breakpoint.smAndUp">
          <v-btn icon @click="formOpen = true">
            <font-awesome-icon icon="plus" color="grey" />
          </v-btn>
        </template>
      </v-toolbar>

      <v-list two-line height="calc(100vh - 112px)" class="scroll-y">
        <notes-row
          v-for="note in notes"
          :key="note.id"
          :note="note"
          :selected="selected_note_id == note.id"
          @noteSelected="selectNote"
          @updateNote="openUpdate"
          @noteDeleted="deleteNote"
        />
      </v-list>
      <NoteForm
        :update="updating"
        :open="formOpen"
        :note="selectedNote"
        @noteUpdated="updateNote"
        @closeDialog="closeNewDialog"
      />
    </template>
    <template v-slot:right>
      <Note :note_id="selected_note_id" @noteUpdated="updateNote" />
    </template>
  </Screen>
</template>

<script>
import NotesRow from "./NotesRow";
import NoteForm from "./NoteForm";
import Note from "./Note";
import Screen from "@/components/Screen2x1";

export default {
  name: "Notes",
  components: {
    NotesRow,
    Note,
    Screen,
    NoteForm
  },
  data() {
    return {
      selected_note_id: null,
      notes: [],
      loading: true,
      formOpen: false,
      updating: false
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
          let selected = this.$route.params.id;
          let note_id = selected ? selected : this.notes[0].id;
          this.selectNote(note_id);
        })
        .catch(error => {
          this.requestError(error);
        })
        .finally(() => (this.loading = false));
    },
    updateNote(note) {
      this.deleteNote(note);
      this.addNote(note);
      this.selectNote(note.id);
    },
    deleteNote(note) {
      let index = this.notes.findIndex(n => n.id == note.id);
      this.notes.splice(index, 1);
      this.selectNote(this.notes[0].id);
    },
    addNote(note) {
      this.notes.unshift(note);
    },
    selectNote(note_id) {
      this.selected_note_id = Number(note_id);
      this.$router.push({ name: "Notes", params: { id: Number(note_id) } });
    },
    openUpdate() {
      this.updating = true;
      this.formOpen = true;
    },
    requestError(error) {
      if (error.response.status == 401) {
        this.$store.dispatch("signedOut");
        this.$router.push("/");
      } else {
        this.$store.commit("ADD_ALERT", ["An error ocurred.", "danger"]);
      }
    },
    closeNewDialog() {
      this.updating = false;
      this.formOpen = false;
    }
  },
  computed: {
    selectedNote() {
      return this.notes.find(n => n.id == this.selected_note_id);
    }
  }
}
</script>

<style lang="sass">
</style>
