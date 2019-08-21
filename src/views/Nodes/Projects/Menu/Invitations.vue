<template>
  <v-list v-if="invitations.length">
    <v-list-item v-for="(item, idx) in invitations" :key="idx">
      <v-list-item-avatar>
        <font-awesome-icon icon="user" color="grey" />
      </v-list-item-avatar>

      <v-list-item-content v-if="item.editing">
        <v-text-field
          v-model="item.email"
          placeholder="User email"
          hint="If the user has not yet registered, an invitation link will be sent to that email."
        />
      </v-list-item-content>
      <v-list-item-content v-else>
        <v-list-item-title v-text="item.email" />
      </v-list-item-content>

      <v-list-item-action>
        <v-btn fab small depressed autocomplete="off" @click="deactivateAllInvitations" color="success" v-if="item.editing">
          <font-awesome-icon icon="check" />
        </v-btn>
        <v-btn icon @click="deleteInvitation(idx)" color="grey" v-else>
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
      invitations: []
    };
  },
  created: function() {
    this.$parent.$on("addInvitation", this.addInvitation);
  },
  methods: {
    getInvitations() {
      this.axios
        .get(`/api/nodes/${this.project.id}/invitations`)
        .then(response => {
          this.invitations = response.data;
        })
        .catch(error => {
          this.requestError(error);
        });
    },
    saveInvitations() {
      this.axios
        .put(`/api/nodes/${this.project.id}`, {
          node: {
            invitations_attributes: this.invitations
          }
        })
        .then(() => {
          this.getInvitations();
        })
        .catch(error => {
          this.requestError(error);
        });
    },
    deactivateAllInvitations() {

    },
    addInvitation() {
      this.deactivateAllInvitations();
      this.invitations.unshift({
        email: "",
        editing: true
      });
    },
    deleteInvitation() {

    }
  },
  watch: {
    project: {
      immediate: true,
      handler() {
        if (this.project) {
          this.getInvitations();
        }
      }
    }
  }
}
</script>