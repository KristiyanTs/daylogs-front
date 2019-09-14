<template>
  <tr v-if="item.editing">
    <td>
      <font-awesome-icon icon="user" color="grey" class="mr-2" />
      {{ item.user.email }}
    </td>
    <td>
      <v-select
        :items="roles"
        v-model="item.role_id"
        item-text="title"
        item-value="id"
      ></v-select>
    </td>
    <td></td>
    <td class="text-right">
      <v-flex>
        <v-btn
          @click="saveMembership"
          fab
          depressed
          outlined
          small
          color="primary"
        >
          <font-awesome-icon icon="check" />
        </v-btn>
      </v-flex>
    </td>
  </tr>
  <tr v-else>
    <td>
      <font-awesome-icon icon="user" color="grey" class="mr-2" />
      {{ item.user.email }}
    </td>
    <td>
      {{ roles.find(r => r.id == item.role_id).title }}
    </td>
    <td></td>
    <td class="text-center">
      <v-flex>
        <v-btn icon @click="editMembership" color="grey">
          <font-awesome-icon icon="edit" />
        </v-btn>
        <v-btn icon @click="removeMembership" color="grey">
          <font-awesome-icon icon="trash-alt" />
        </v-btn>
      </v-flex>
    </td>
  </tr>



<!-- 
  <v-list-item>
    <v-list-item-avatar>
      <font-awesome-icon icon="user" color="grey" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title v-text="item.user.name" />
    </v-list-item-content>

    <v-list-item-content v-if="item.editing">
      <v-row>
        <v-col>
          <v-list-item-title v-text="item.user.name" />
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
      <v-list-item-title v-text="item.user.name" />
      <v-list-item-subtitle v-text="roles.find(r => r.id == item.role_id).title" />
    </v-list-item-content>

    <v-list-item-action>
      <v-flex>
        <v-btn
          v-if="item.editing"
          @click="saveMembership"
          fab
          depressed
          outlined
          small
          color="primary"
        >
          <font-awesome-icon icon="check" />
        </v-btn>
        <v-btn icon @click="editMembership" color="grey" v-else>
          <font-awesome-icon icon="edit" />
        </v-btn>
        <v-btn icon @click="removeMembership" color="grey">
          <font-awesome-icon icon="trash-alt" />
        </v-btn>
      </v-flex>
    </v-list-item-action>
  </v-list-item> -->
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { UPDATE_MEMBERSHIP, DESTROY_MEMBERSHIP } from "@/store/actions.type";
import { SET_MEMBERSHIP } from "@/store/mutations.type";

export default {
  props: {
    membership: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      item: { }
    };
  },
  methods: {
    removeMembership() {
      store.dispatch(UPDATE_MEMBERSHIP, this.item);
    },
    editMembership() {
      this.item.editing = true;
      store.commit(SET_MEMBERSHIP, this.item);
    },
    saveMembership() {
      store.dispatch(UPDATE_MEMBERSHIP, this.item);
    }
  },
  computed: {
    ...mapGetters(["roles"])
  },
  watch: {
    membership: {
      immediate: true,
      handler() {
        this.item = { ...this.membership };
      }
    }
  }
};
</script>
