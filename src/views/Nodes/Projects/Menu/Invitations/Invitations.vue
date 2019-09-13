<template>
  <v-simple-table v-if="invitations.length">
    <tbody>
      <InvitationRow 
        v-for="invitation in invitations" 
        :key="invitation.id"
        :invitation="invitation"
      />
    </tbody>
  </v-simple-table>
  <div v-else class="text-center py-2 text--grey">Nothing to show</div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_ROLES, FETCH_INVITATIONS, CREATE_INVITATION, DESTROY_INVITATION } from "@/store/actions.type";
import { SET_INVITATION, REMOVE_INVITATION } from "@/store/mutations.type";
import InvitationRow from "./InvitationRow";

export default {
  components: {
    InvitationRow
  },
  data() {
    return { };
  },
  mounted() {
    store.dispatch(FETCH_INVITATIONS, this.active_project.id);
    store.dispatch(FETCH_ROLES, this.active_project.id);
  },
  methods: {
    saveInvitation(idx) {
      store.dispatch(CREATE_INVITATION, this.invitations[idx]);
    },
    deleteInvitation(idx) {
      if(this.invitations[idx].id) { // has an id => remove from server & store
        store.dispatch(DESTROY_INVITATION, this.invitations[idx]);
      } else { // no id => remove from store
        store.commit(REMOVE_INVITATION, "");
      }
    },
  },
  computed: {
    ...mapGetters(["active_project", "invitations"])
  }
}
</script>