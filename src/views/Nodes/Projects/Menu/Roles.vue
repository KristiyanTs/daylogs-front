<template>
  <v-flex xs12>
    <v-toolbar flat dense>
      <v-toolbar-title>Roles</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="addRole" color="grey">
        <font-awesome-icon icon="plus" />
      </v-btn>
      <v-btn icon @click="resetRoles" color="grey">
        <font-awesome-icon icon="redo-alt" />
      </v-btn>
      <v-btn icon @click="saveRoles" color="success">
        <font-awesome-icon icon="save" />
      </v-btn>
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
      roles: []
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
    resetRoles() {
      this.roles = JSON.parse(JSON.stringify(this.project.roles));
    },
    deactivateAllRoles() {
      let role;

      this.roles.map((r, idx) => {
        role = r;
        role.editing = false;
        this.roles.splice(idx, 1, role);
      });
    },
    activateRole(idx) {
      this.deactivateAllRoles();

      let role = this.roles[idx];
      role.editing = true;

      this.roles.splice(idx, 1, role);
    },
    deleteRole(idx) {
      this.roles.splice(idx, 1);
    },
    addRole() {
      this.deactivateAllRoles();
      this.roles.unshift({
        title: "",
        editing: true
      });
    }
  }
};
</script>
