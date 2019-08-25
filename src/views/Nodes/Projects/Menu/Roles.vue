<template>
  <v-list v-if="roles.length">
    <v-list-item v-for="(item, idx) in roles" :key="idx">
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
          @click="saveRole(idx)"
          v-if="item.editing"
          fab
          depressed
          outlined
          small
          color="primary"
        >
          <font-awesome-icon icon="check" />
        </v-btn>
        <v-flex v-else>
          <v-btn @click="editRole(idx)" icon color="grey">
            <font-awesome-icon icon="edit" />
          </v-btn>
          <v-btn @click="deleteRole(idx)" icon color="grey">
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
import { FETCH_ROLES, CREATE_ROLE, UPDATE_ROLE, DESTROY_ROLE } from "@/store/actions.type";
import { SET_ROLE, REMOVE_ROLE } from "@/store/mutations.type";

export default {
  data() {
    return {
    };
  },
  mounted() {
    store.dispatch(FETCH_ROLES, this.current_node.id);
  },
  methods: {
    saveRole(idx) {
      if(this.roles[idx].id) { // has an id => it already exists
        store.dispatch(UPDATE_ROLE, this.roles[idx]);
      } else { // no id => it should be created
        store.dispatch(CREATE_ROLE, this.roles[idx]);
      }
    },
    deleteRole(idx) {
      if(this.roles[idx].id) { // has an id => remove from server & store
        store.dispatch(DESTROY_ROLE, this.roles[idx]);
      } else { // no id => remove from store
        store.commit(REMOVE_ROLE, "");
      }
    },
    editRole(idx) {
      let role = this.roles[idx];
      role.editing = true;
      store.commit(SET_ROLE, role);
    }
  },
  computed: {
    ...mapGetters(["current_node", "roles"])
  }
};
</script>
