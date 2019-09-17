<template>
  <Screen v-if="active_project">
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
            clickToOpen
            v-for="child in active_project.children"
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
  <div v-else class="grey--text text-center no-projects">
    <h3>Create a project or accept an invitation</h3>
  </div>
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
  computed: {
    ...mapGetters(["active_project", "child_nodes"]),
  }
}
</script>

<style lang="sass" scopeds>
.v-card
  height: 100%
  overflow: auto
.no-projects
  height: calc(100vh - 64px)
  display: table
  text-align: center
  width: 100%
  h3
    display: table-cell
    text-align: center
    vertical-align: middle
</style>