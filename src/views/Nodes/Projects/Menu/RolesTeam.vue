<template>
  <v-flex xs12>
    <v-toolbar flat dense>
      <v-toolbar-items>
        <v-tabs @change="filter">
          <v-tab>Team</v-tab>
          <v-tab>Invitations</v-tab>
          <v-tab>Roles</v-tab>
        </v-tabs>
      </v-toolbar-items>
      <v-spacer />
      <v-btn icon color="grey" v-if="type != 'members'" @click="addSomething">
        <font-awesome-icon icon="plus" />
      </v-btn>
      <v-btn icon color="grey" v-if="type == 'roles'" @click="resetSomething">
        <font-awesome-icon icon="redo-alt" />
      </v-btn>
      <v-btn rounded @click="saveSomething" color="success" class="mr-1" v-if="type == 'roles'" depressed>
        <font-awesome-icon icon="save" class="mr-2" />
        Save
      </v-btn>
    </v-toolbar>
    <Members :project="project" v-if="type == 'members'" />
    <Invitations :project="project" v-else-if="type == 'invitations'" />
    <Roles :project="project" v-else />
  </v-flex>
</template>

<script>
import Members from "./Members";
import Invitations from "./Invitations";
import Roles from "./Roles";

export default {
  components: {
    Members,
    Invitations,
    Roles
  },
  data() {
    return {
      project: {},
      type: "members"
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
    filter(type) {
      if (type == 0) {
        this.type = "members";
      } else if (type == 1) {
        this.type = "invitations";
      } else {
        this.type = "roles";
      }
    },
    addSomething() {
      if (this.type == "invitations") {
        this.$emit("addInvitation");
      } else {
        this.$emit("addRole");
      }
    },
    resetSomething() {
      this.$emit("resetRoles");
    },
    saveSomething() {
      this.$emit("saveRoles");
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
