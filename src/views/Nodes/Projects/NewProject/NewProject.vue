<template>
  <v-dialog :value="open" @closeDialog="closeDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-container>
      <v-form @submit="submitProject">
        <v-text-field
          outlined
          v-model="project.title"
          placeholder="Project title"
          :rules="rules.title"
          required
        />
        <v-btn class="primary" @click="submitProject">Create</v-btn>
      </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { CREATE_NODE } from "@/store/actions.type";

export default {
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      project: {
        title: ""
      },
      rules: {
        title: [
          v => !!v || "Title is required",
          v => (v && v.length <= 12) || "Title must be less than 12 characters"
        ]
      }
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    submitProject() {
      store.dispatch(CREATE_NODE, this.project).then(() => {
        this.closeDialog();
        this.$router.push(`/nodes/${this.inspected_node.id}`)
      })
    },
    resetForm() {
      this.project = {
        title: ""
      };
    }
  },
  computed: {
    ...mapGetters(["inspected_node"]),
  }
}
</script>