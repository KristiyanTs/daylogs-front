<template>
  <tr class="note-row w-100" :class="{ active: selected }">
    <td class="title col-xs-8 px-3 py-3" @click="selectNote">
      <form @submit.prevent="updateNote" v-if="updating" :focus="updating">
        <base-input
          alternative
          ref="newTitle"
          v-model="new_title"
          @focus="$event.target.select()"
          placeholder="New note title"
        />
        <!-- The following line submits the form when pressing enter -->
        <input type="submit" value="Submit" class="d-none" />
      </form>
      <div v-else @dblclick="updating = true">{{ note.title }}</div>
    </td>
    <td
      class="actions col-xs-4 text-right pr-3"
      :class="{ updating: updating }"
    >
      <span
        class="icon icon-shape btn d-inline"
        round
        @click="updateNote"
        v-if="updating"
      >
        <font-awesome-icon icon="save" class="text-success" />
      </span>
      <base-dropdown direction="left" position="right">
        <span
          slot="title"
          round
          type="link"
          class="dropdown-toggle icon icon-shape btn mr-0 text-muted"
        >
          <font-awesome-icon icon="ellipsis-v" />
        </span>
        <span class="dropdown-item" @click="updateNote">
          <font-awesome-icon icon="edit" class="text-muted mr-3" />Rename
        </span>
        <span class="dropdown-item" @click="deleteNote">
          <font-awesome-icon icon="trash-alt" class="text-muted mr-3" />Delete
        </span>
      </base-dropdown>
    </td>
  </tr>
</template>

<script>
import BaseDropdown from "@/components/BaseDropdown";
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
  components: {
    BaseDropdown
  },
  data() {
    return {
      updating: false,
      new_title: this.note.title
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
        .catch(error => {
          this.requestError(error);
        });
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
.form-group
  margin: 0px !important

tr.note-row
  background-color: white

td.actions
  width: 55px
  .updating
    width: 110px

tr td.title span
  padding-left: 10px

tr.note-row td.title:hover
  cursor: pointer

tr.active
  border-radius: 5px
  font-weight: 500
  td span
    padding-left: 10px
  td.title
    font-weight: bold

.icon-shape svg
  height: auto
</style>