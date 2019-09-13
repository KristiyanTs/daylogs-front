<template>
  <v-flex xs12>
    <v-toolbar flat dense class="pr-2">
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
    </v-toolbar>
    <Members v-if="type == 'members'" />
    <Invitations v-else-if="type == 'invitations'" />
    <Roles v-else />
  </v-flex>
</template>

<script>
import Members from "./Members";
import Invitations from "./Invitations/Invitations";
import Roles from "./Roles";

import { mapGetters } from "vuex";
import store from "@/store";
import { ADD_ROLE, ADD_INVITATION } from "@/store/mutations.type";

export default {
  components: {
    Members,
    Invitations,
    Roles
  },
  data() {
    return {
      type: "members"
    };
  },
  methods: {
    filter(type) {
      if (type == 0) {
        this.type = "members";
      } else if (type == 1) {
        this.type = "invitations";
      } else {
        this.type = "roles";
      }
    },
    addSomething() { // add only all others are saved
      if (this.type == "invitations" && this.invitations.filter(i => i.id == "").length == 0) {
        store.commit(ADD_INVITATION, null);
      } else if(this.roles.filter(r => r.id == "").length == 0) {
        store.commit(ADD_ROLE, null);
      }
    }
  },
  computed: {
    ...mapGetters(["current_node", "roles", "invitations"])
  }
};
</script>
