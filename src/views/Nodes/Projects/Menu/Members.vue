<template>
  <v-list v-if="memberships.length">
    <v-list-item v-for="member in memberships" :key="member.id">
      <v-list-item-avatar>
        <font-awesome-icon icon="user" color="grey" />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="member.user.name" />
      </v-list-item-content>

      <v-list-item-action>
        <v-btn icon @click="removeMember(member)" color="grey">
          <font-awesome-icon icon="trash-alt" />
        </v-btn>
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
      memberships: []
    };
  },
  methods: {
    getMemberships() {
      this.axios
        .get(`/api/nodes/${this.project.id}/memberships`)
        .then(response => {
          this.memberships = response.data;
        })
        .catch(error => {
          this.requestError(error);
        });
    },
    saveMemberships() {
      this.axios
        .put(`/api/nodes/${this.project.id}`, {
          node: {
            memberships_attributes: this.memberships
          }
        })
        .then(() => {
          this.getMemberships();
        })
        .catch(error => {
          this.requestError(error);
        });
    },
    resetMemberships() {
      this.memberships = JSON.parse(JSON.stringify(this.project.roles));
    },
    deactivateAllMemberships() {
      let membership;

      this.memberships.map((m, idx) => {
        membership = m;
        membership.editing = false;
        this.memberships.splice(idx, 1, membership);
      });
    },
    activateMembership(idx) {
      this.deactivateAllMemberships();

      let membership = this.memberships[idx];
      membership.editing = true;

      this.memberships.splice(idx, 1, membership);
    },
    deleteMembership(idx) {
      this.memberships.splice(idx, 1);
    },
    addMembership() {
      this.deactivateAllMemberships();
      this.memberships.unshift({
        user_id: "",
        role_id: "",
        editing: true
      });
    }
  }
};
</script>
