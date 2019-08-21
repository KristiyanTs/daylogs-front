<template>
  <v-dialog :value="open" @closeDialog="closeDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
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
    </v-card>
  </v-dialog>
</template>

<script>
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
      this.axios
        .post("/api/nodes", {
          node: {
            ...this.project
          }
        })
        .then(() => {
          this.closeDialog();
          this.resetForm();
          this.$emit("reload");
        })
        .catch(error => {
          this.requestError(error);
        });
    },
    resetForm() {
      this.project = {
        title: ""
      };
    }
  }
}
</script>