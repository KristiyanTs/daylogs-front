<template>
  <v-flex xs12>
    <v-toolbar flat dense>
      <v-toolbar-title>General Settings</v-toolbar-title>
    </v-toolbar>
    <v-layout wrap>

    </v-layout>
  </v-flex>
</template>

<script>
export default {
  data() {
    return {
      project: {}
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