<template>
  <Screen>
    <template v-slot:box-1>
      <v-card flat>
        <v-list dense subheader>
          <v-subheader>
            In progress
          </v-subheader>
        </v-list>
      </v-card>
    </template>
    <template v-slot:box-2>
      <v-card flat>
        <v-list dense subheader>
          <v-subheader>
            Updated
          </v-subheader>
        </v-list>
      </v-card>
    </template>
    <template v-slot:box-3>
      <v-card flat>
        <v-list dense subheader>
          <v-subheader>
            Following
          </v-subheader>
        </v-list>
      </v-card>
    </template>
    <template v-slot:box-4>
      <v-card flat>
        <v-list dense subheader>
          <v-subheader>
            Top level topics
          </v-subheader>
          <NodeRow
            v-for="child in child_nodes"
            :key="child.id"
            :node="child"
          />
        </v-list>
      </v-card>
    </template>
    <template v-slot:box-5>
      <v-card flat>
        <v-list dense subheader>
          <v-subheader>
            Assigned to me
          </v-subheader>
        </v-list>
      </v-card>
    </template>
    <template v-slot:box-6>
      <v-card flat>
        <v-list dense subheader>
          <v-subheader>
            Team status
          </v-subheader>
        </v-list>
      </v-card>
    </template>
  </Screen>
</template>

<script>
import Screen from "@/components/Screen3x2";
import NodeRow from "@/views/Nodes/Row";
import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_NODE } from "@/store/actions.type";

export default {
  components: {
    Screen,
    NodeRow
  },
  data() {
    return {
      items: [[], [], [], [], [], []]
    };
  },
  mounted() {
    store.dispatch(FETCH_NODE, this.active_project.id);
  },
  computed: {
    ...mapGetters(["current_node", "inspected_node", "active_project", "child_tasks", "child_nodes"]),
  }
}
</script>

<style lang="sass" scopeds>
.v-card
  height: 100%
  overflow: auto
</style>