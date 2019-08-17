<template>
  <v-flex xs12>
    <v-toolbar flat dense>
      <v-toolbar-title>Team</v-toolbar-title>
    </v-toolbar>
    <v-layout wrap>
      
    </v-layout>
    <v-toolbar flat dense>
      <v-toolbar-title>Pending Invitations</v-toolbar-title>
    </v-toolbar>
    <v-layout wrap>
      
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      members: []
    };
  },
  methods: {
    saveRoles() {
      this.axios
        .put(`/api/nodes/${this.project.id}`, {
          node: {
            ...this.project,
            roles_attributes: this.roles
          }
        })
        .then(() => {})
        .catch(error => {
          this.requestError(error);
        });
    },
    resetTeam() {
      this.roles = JSON.parse(JSON.stringify(this.project.roles));
    },
    deactivateAllMembers() {
      let role;

      this.roles.map((r, idx) => {
        role = r;
        role.editing = false;
        this.roles.splice(idx, 1, role);
      });
    },
    activateMember(idx) {
      this.deactivateAllRoles();

      let role = this.roles[idx];
      role.editing = true;

      this.roles.splice(idx, 1, role);
    },
    deleteMember(idx) {
      this.roles.splice(idx, 1);
    },
    addMember() {
      this.deactivateAllRoles();
      this.roles.unshift({
        title: "",
        editing: true
      });
    }
  }
};
</script>
