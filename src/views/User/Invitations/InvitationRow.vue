<template>
  <v-list-item dense>
    <v-list-item-content>
      <v-list-item-title v-text="invitation.label" />
    </v-list-item-content>

    <v-list-item-action>
      <v-flex>
        <v-btn small color="success" text @click="accept">Accept</v-btn>
        <v-btn small color="grey" text @click="decline">Decline</v-btn>
      </v-flex>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import store from "@/store";
import { UPDATE_USER_INVITATION } from "@/store/actions.type";

export default {
  props: {
    invitation: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return { }
  },
  methods: {
    accept() {
      store.dispatch(UPDATE_USER_INVITATION, { accepted: true, id: this.invitation.id });
    },
    decline() {
      store.dispatch(UPDATE_USER_INVITATION, { declined: true, id: this.invitation.id });
    }
  }
}
</script>