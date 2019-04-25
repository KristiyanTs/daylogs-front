<template>
  <tr class="note-row w-100" :class="{ active: selected, shadow: selected }">
    <td class="title col-xs-8" @click="selectNote">
      <form @submit.prevent="updateNote" v-if="updating" :focus="updating">
        <base-input
          alternative
          ref="newTitle"
          v-model="new_title"
          placeholder="New note title"
        />
        <!-- The following line submits the form when pressing enter -->
        <input type="submit" value="Submit" class="d-none" />
      </form>
      <span v-else>{{ note.title }}</span>
    </td>
    <td class="actions col-xs-4 text-right">
      <span class="icon icon-shape btn" round @click="updateNote">
        <font-awesome-icon icon="save" class="text-success" v-if="updating" />
        <font-awesome-icon icon="edit" class="text-muted" v-else />
      </span>
      <span class="icon icon-shape btn" round @click="deleteNote">
        <font-awesome-icon icon="trash-alt" class="text-muted" />
      </span>
    </td>
  </tr>
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
    return {
      updating: false,
      new_title: ""
    };
  },
  methods: {
    updateNote() {
      if (!this.updating) {
        this.updating = true;
        this.new_title = this.note.title;
        return;
      }
      this.axios
        .put(`/api/notes/${this.note.id}`, {
          note: { title: this.new_title }
        })
        .then(response => {
          this.$emit("noteUpdated", response.data);
          this.$store.commit("ADD_ALERT", ["Note updated.", "success"]);
          this.updating = false;
        })
        .catch(() => {
          this.$store.commit("ADD_ALERT", ["An error ocurred.", "danger"]);
        });
    },
    deleteNote() {
      this.axios
        .delete(`/api/notes/${this.note.id}`)
        .then(() => {
          this.$store.commit("ADD_ALERT", ["Note deleted.", "success"]);
        })
        .catch(() => {
          this.$store.commit("ADD_ALERT", ["An error ocurred.", "danger"]);
        });

      this.$emit("noteDeleted", this.note);
    },
    selectNote() {
      if (!this.updating) {
        this.$emit("noteSelected", this.note.id);
      }
    }
  }
}
</script>

<style lang="scss">
.form-group {
  margin: 0px !important;
}
tr.note-row:hover {
  cursor: pointer;
}
tr.active {
  background-color: #f0f3bd !important;
  font-weight: 500;
  td span {
    padding-left: 10px;
  }
}
</style>
