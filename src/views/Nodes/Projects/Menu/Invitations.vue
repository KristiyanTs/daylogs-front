<template>
  <v-list v-if="invitations.length">
    <v-list-item v-for="(item, idx) in invitations" :key="idx">
      <v-list-item-avatar>
        <font-awesome-icon icon="user" color="grey" />
      </v-list-item-avatar>

      <v-list-item-content v-if="item.editing">
        <v-row>
          <v-col>
            <v-text-field
              v-model="item.email"
              placeholder="User email"
              hint="If the user has not yet registered, an invitation link will be sent to that email."
            />
          </v-col>
          <v-col>
            <v-select
              :items="roles"
              label="Role"
              v-model="item.role_id"
              item-text="title"
              item-value="id"
            ></v-select>
          </v-col>
        </v-row>
      </v-list-item-content>
      <v-list-item-content v-else>
        <v-list-item-title v-text="item.email" />
      </v-list-item-content>

      <v-list-item-action>
        <v-flex>
          <v-btn
            @click="saveInvitation(idx)"
            v-if="item.editing"
            fab
            depressed
            outlined
            small
            color="primary"
          >
            <font-awesome-icon icon="check" />
          </v-btn>
          <v-btn @click="deleteInvitation(idx)" icon color="grey">
            <font-awesome-icon icon="trash-alt" />
          </v-btn>
        </v-flex>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_ROLES, FETCH_INVITATIONS, CREATE_INVITATION, DESTROY_INVITATION } from "@/store/actions.type";
import { SET_INVITATION, REMOVE_INVITATION } from "@/store/mutations.type";

export default {
  data() {
    return { };
  },
  mounted() {
    store.dispatch(FETCH_INVITATIONS, this.current_node.id);
    store.dispatch(FETCH_ROLES, this.current_node.id);
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
    ...mapGetters(["current_node", "invitations", "roles"])
  }
}
</script>