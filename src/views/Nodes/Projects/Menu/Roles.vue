<template>
  <v-list v-if="roles.length">
    <v-list-item v-for="(item, i) in roles" :key="i">
      <v-list-item-avatar>
        <font-awesome-icon icon="user" color="grey" />
      </v-list-item-avatar>

      <v-list-item-content v-if="item.editing">
        <v-text-field v-model="item.title" placeholder="Role title" />
      </v-list-item-content>
      <v-list-item-content v-else>
        <v-list-item-title v-text="item.title" />
      </v-list-item-content>

      <v-list-item-action>
        <v-btn
          v-if="item.editing"
          fab
          depressed
          outlined
          small
          color="primary"
          @click="deactivateAllRoles"
        >
          <font-awesome-icon icon="check" />
        </v-btn>
        <v-flex v-else>
          <v-btn icon @click="activateRole(i)" color="grey">
            <font-awesome-icon icon="edit" />
          </v-btn>
          <v-btn icon @click="deleteRole(i)" color="grey">
            <font-awesome-icon icon="trash-alt" />
          </v-btn>
        </v-flex>
      </v-list-item-action>
    </v-list-item>
  </v-list>
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
  created: function() {
    this.$parent.$on("addRole", this.addRole);
    this.$parent.$on("resetRoles", this.resetRoles);
    this.$parent.$on("saveRoles", this.saveRoles);
  },
  methods: {
    getRoles() {
      this.axios
        .get(`/api/nodes/${this.project.id}/roles`)
        .then(response => {
          this.roles = response.data;
        })
        .catch(error => {
          this.requestError(error);
        });
    },
    saveRoles() {
      this.axios
        .put(`/api/nodes/${this.project.id}`, {
          node: {
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
  },
  watch: {
    project: {
      immediate: true,
      handler() {
        this.getRoles();
      }
    }
  }
};
</script>
