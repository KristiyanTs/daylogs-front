<template>
  <div class="editor">
    <Editor
      @contentChange="contentChange"
      @onFocus="onFocus"
      :content="note.content"
    />
    <base-button
      round
      @click="saveNote"
      :type="saved ? 'success' : 'warning'"
      class="icon icon-shape p-0 save-log"
    >
      <font-awesome-icon v-if="loading && !saved" icon="spinner" spin />
      <font-awesome-icon v-else icon="save" />
    </base-button>
  </div>
</template>

<script>
import Editor from "@/views/components/Editor";

export default {
  components: {
    Editor
  },
  props: {
    note_id: {
      type: Number,
      default: -1,
      description: "Selected note id"
    }
  },
  data() {
    return {
      note: { content: "" },
      saved: true,
      save_timer: null,
      loading: true
    };
  },
  methods: {
    getNote() {
      if (this.note_id == -1) return;
      this.loading = true;
      this.axios
        .get(`/api/notes/${this.note_id}`, {
          headers: { Authorization: window.$cookies.get("jwt") }
        })
        .then(response => {
          this.note = response.data;
          if (this.note.content == null)
            this.note.content = "Start your note...";
        })
        .catch(error => {
          this.requestError(error);
        })
        .finally(() => (this.loading = false));
    },
    saveNote() {
      if (this.saved) return;

      this.loading = true;
      this.axios
        .put(`/api/notes/${this.note.id}`, { note: this.note })
        .then(() => {
          setTimeout(() => {
            this.loading = false;
            this.saved = true;
          }, 500);
        })
        .catch(error => {
          this.requestError(error);
        });
    },
    contentChange(newVal) {
      this.saved = false;
      this.note.content = newVal;
      clearTimeout(this.save_timer);
      this.save_timer = setTimeout(() => {
        this.saveNote();
      }, 5000);
    },
    onFocus() {
      if (this.note.content == "Start your note...") this.note.content = "";
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
  watch: {
    note_id: {
      immediate: true,
      handler() {
        this.saveNote();
        this.getNote();
      }
    }
  }
}
</script>

<style lang="scss">
.editor .save-log {
  position: absolute;
  right: 10px;
}
</style>
