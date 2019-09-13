<template>
  <v-dialog
    v-model="invitationsDialog"
    width="500"
    @input="closeDialog"
  >
    <v-card>
      <v-card-title
        class="headline grey lighten-4"
        primary-title
      >
        Invitations
      </v-card-title>

      <v-card-text v-if="!user_invitations.length" class="text-center py-2">
        You have no invitations yet.
      </v-card-text>

      <v-list v-else>
        <InvitationRow 
          v-for="invitation in user_invitations" 
          :key="invitation.id"
          :invitation="invitation" />
      </v-list>
      
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn
          color="primary"
          text
          @click="closeDialog"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { CREATE_ALERT, TOGGLE_INVITATIONS_DIALOG } from "@/store/actions.type";
import InvitationRow from "./InvitationRow";

export default {
  components: {
    InvitationRow
  },
  data() {
    return { }
  },
  methods: {
    closeDialog() {
      store.dispatch(TOGGLE_INVITATIONS_DIALOG, false);
    }
  },
  computed: {
    ...mapGetters(["invitationsDialog", "user_invitations"])
  }
}
</script>