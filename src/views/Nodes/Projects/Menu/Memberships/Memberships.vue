<template>
  <v-simple-table>
    <thead>
      <tr>
        <th class="text-left">User</th>
        <th class="text-left">Role</th>
        <th class="text-left">Scope</th>
        <th class="text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      <MembershipRow 
        v-for="membership in memberships" 
        :key="membership.id" 
        :membership="membership" 
      />
    </tbody>
  </v-simple-table>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_ROLES } from "@/store/actions.type";
import MembershipRow from "./MembershipRow";

export default {
  components: {
    MembershipRow
  },
  data() {
    return { };
  },
  methods: {

  },
  computed: {
    ...mapGetters(["memberships"])
  }
};
</script>
