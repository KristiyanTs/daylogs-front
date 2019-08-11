<template>
  <Screen>
    <template v-slot:left>
      <v-layout wrap>
        <v-flex xs12>
          <v-toolbar flat dense>
            <v-toolbar-title>
              Profile
            </v-toolbar-title>
          </v-toolbar>
          <v-list>
            <v-list-item to="general">
              <v-list-item-avatar>
                <font-awesome-icon icon="cog" class="grey--text" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Basic Settings</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="security">
              <v-list-item-avatar>
                <font-awesome-icon icon="shield-alt" class="grey--text" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Security</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="notifications">
              <v-list-item-avatar>
                <font-awesome-icon icon="bell" class="grey--text" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Notifications</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-flex>
      </v-layout>
    </template>
    <template v-slot:right>
      <router-view></router-view>
    </template>
  </Screen>
</template>
<script>
import Screen from "@/components/Screen";

export default {
  components: {
    Screen
  },
  data() {
    return {
    };
  },
  methods: {

  }
};
</script>