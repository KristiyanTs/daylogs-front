<template>
  <v-flex xs12>
    <Roles :project="project" />
    <Team :project="project" />
  </v-flex>
</template>

<script>
import Team from "./Team";
import Roles from "./Roles";

export default {
  components: {
    Team,
    Roles
  },
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
};
</script>
