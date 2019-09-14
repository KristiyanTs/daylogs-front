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
  <div v-else class="text-center py-2 grey--text">- Nothing to show -</div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_ROLES, FETCH_INVITATIONS } from "@/store/actions.type";
import InvitationRow from "./InvitationRow";

export default {
  components: {
    InvitationRow
  },
  data() {
    return { };
  },
  mounted() {
    store.dispatch(FETCH_INVITATIONS);
    store.dispatch(FETCH_ROLES);
  },
  computed: {
    ...mapGetters(["invitations"])
  }
}
</script>