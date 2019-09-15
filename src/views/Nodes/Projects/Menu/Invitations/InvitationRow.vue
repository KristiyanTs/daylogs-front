<template>
  <tr v-if="invitation.editing">
    <td>
      <v-text-field
        v-model="item.email"
        label="User email"
        hint="If the user has not yet registered, an invitation link will be sent to that email."
      />
    </td>
    <td>
      <v-select
        :items="roles"
        label="Role"
        v-model="item.role_id"
        item-text="title"
        item-value="id"
      ></v-select>
    </td>
    <td>
      <NodeSelectInline />
    </td>
    <td class="text-right">
      <v-flex>
        <v-btn
          @click="saveInvitation"
          fab
          depressed
          outlined
          small
          color="primary"
        >
          <font-awesome-icon icon="check" />
        </v-btn>
        <v-btn @click="deleteInvitation" icon color="grey">
          <font-awesome-icon icon="trash-alt" />
        </v-btn>
      </v-flex>
    </td>
  </tr>
  <tr v-else>
    <td>
      <font-awesome-icon icon="user" color="grey" class="mr-2" />
      {{ invitation.email }}
    </td>
    <td>
      {{ roles.find(r => r.id == invitation.role_id).title }}
    </td>
    <td>{{ invitation.status }}</td>
    <td class="text-right">
      <v-btn @click="deleteInvitation" icon color="grey">
        <font-awesome-icon icon="trash-alt" />
      </v-btn>
    </td>
  </tr>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { CREATE_INVITATION, DESTROY_INVITATION } from "@/store/actions.type";
import { REMOVE_INVITATION } from "@/store/mutations.type";
import NodeSelectInline from "@/components/NodeSelectInline";

export default {
  props: {
    invitation: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    NodeSelectInline
  },
  data() {
    return { 
      item: { }
    };
  },
  methods: {
    saveInvitation() {
      store.dispatch(CREATE_INVITATION, this.item);
    },
    deleteInvitation() {
      if(this.invitation.id) {
        store.dispatch(DESTROY_INVITATION, this.item);
      } else {
        store.commit(REMOVE_INVITATION, "");
      }
    },
  },
  computed: {
    ...mapGetters(["roles"])
  },
  watch: {
    invitation: {
      immediate: true,
      handler() {
        this.item = { ...this.invitation };
      }
    }
  }
}
</script>