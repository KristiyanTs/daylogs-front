<template>
  <v-navigation-drawer :value="sidebar" clipped app>
    <v-layout column fill-height align-content-start>
      <v-flex shrink>
        <v-list dense shaped>
          <v-list-item to="/project">
            <v-list-item-action>
              <font-awesome-icon icon="home" class="grey--text" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Home
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/settings/general">
            <v-list-item-action>
              <font-awesome-icon icon="cog" class="grey--text" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Project Settings
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-flex>
      <v-flex shrink>
        <v-layout row align-center>
          <v-flex xs6>
            <v-subheader>
              Favorites
            </v-subheader>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex class="projects-wrapper white" shrink>
        <v-list dense class="p-0" shaped>
          <v-list-item
            v-for="(node, k) in favorites"
            :key="k"
            :to="`/nodes/${node.id}`"
          >
            <v-list-item-action>
              <font-awesome-icon icon="folder" class="grey--text" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ node.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-flex>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return { };
  },
  computed: {
    ...mapGetters(["favorites", "sidebar"]),
  }
};
</script>

<style scoped lang="sass">
.v-navigation-drawer
  padding: 4px 0px 4px 4px
.flex.grow .v-list.v-sheet
  height: 100%
.projects-wrapper
  max-height: 200px
  overflow-y: auto

</style>