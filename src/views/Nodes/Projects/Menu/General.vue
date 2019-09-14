<template>
  <v-flex xs12>
    <v-toolbar flat dense>
      <v-toolbar-title>General Settings</v-toolbar-title>
      <v-spacer />
      <v-btn @click="submit" rounded color="success" class="mr-1" depressed>
        <font-awesome-icon icon="save" class="mr-2" />
        Save
      </v-btn>
    </v-toolbar>
    <v-form>
      <v-container>
        <v-layout column>
          <v-text-field
            v-model="item.title"
            placeholder="Project title"
            label="Project title"
            :rules="rules.title"
            required
          />
        </v-layout>
      </v-container>
    </v-form>
  </v-flex>
</template>

<script>
import { mapGetters } from "vuex";
import { UPDATE_PROJECT } from "@/store/actions.type";

export default {
  data() {
    return {
      item: { },
      rules: {
        title: [
          v => !!v || "Title is required",
          v => (v && v.length <= 12) || "Title must be less than 12 characters"
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$store.dispatch(UPDATE_PROJECT, this.item);
    }
  },
  computed: {
    ...mapGetters(["active_project"]),
  },
  watch: {
    active_project: {
      immediate: true,
      handler() {
        this.item = { ...this.active_project };
      }
    }
  }
}
</script>