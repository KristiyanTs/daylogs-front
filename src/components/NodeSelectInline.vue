<template>
  <v-menu
    v-model="accessSelect"
    :close-on-content-click="false"
    offset-x
  >
    <template v-slot:activator="{ on }">
      <v-btn
        color="indigo"
        dark
        v-on="on"
      >
        Choose
      </v-btn>
    </template>

    <v-card>
      <NodeSelect @selected="updateScope"/>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn text @click="accessSelect = false">Cancel</v-btn>
        <v-btn color="primary" text @click="accessSelect = false">Choose selected</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import NodeSelect from "./NodeSelect";

export default {
  components: {
    NodeSelect
  },
  data() {
    return {
      accessSelect: false
    }
  },
  methods: {
    updateSelected(items) {
      this.$emit();
    }
  }
}
</script>