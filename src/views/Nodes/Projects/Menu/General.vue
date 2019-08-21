<template>
  <v-flex xs12>
    <v-toolbar flat dense>
      <v-toolbar-title>General Settings</v-toolbar-title>
      <v-spacer />
      <v-btn rounded @click="saveProject" color="success" class="mr-1" depressed>
        <font-awesome-icon icon="save" class="mr-2" />
        Save
      </v-btn>
    </v-toolbar>
    <v-form>
      <v-container>
        <v-layout column>
          <v-text-field
            v-model="project.title"
            placeholder="Project title"
            label="Project title"
            :rules="rules.title"
            required
          />
        </v-layout>
      </v-container>
    </v-form>
  </v-flex>
</template>

<script>
export default {
  data() {
    return {
      project: {},
      rules: {
        title: [
          v => !!v || "Title is required",
          v => (v && v.length <= 12) || "Title must be less than 12 characters"
        ]
      }
    };
  },
  methods: {
    getProject() {
      this.axios
        .get(`/api/nodes/${this.rootId}`)
        .then(response => {
          this.project = response.data;
        })
        .catch(error => {});
    },
    saveProject() {
      this.axios
        .put(`/api/nodes/${this.project.id}`, {
          node: {
            ...this.project
          }
        })
        .then(() => {
        })
        .catch(error => {
          this.requestError(error);
        });
    }
  },
  computed: {
    rootId() {
      return this.$route.params.id;
    }
  },
  watch: {
    rootId: {
      immediate: true,
      handler() {
        if (this.rootId) {
          this.getProject();
        }
      }
    }
  }
}
</script>