<template>
  <span>
    <v-btn @click="prompt = true" fab depressed small class="white">
      <font-awesome-icon
        color="grey"
        icon="trash-alt"
      />
    </v-btn>
    <v-dialog
      v-model="prompt"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Are you sure?</v-card-title>

        <v-card-text>
          Deleting this topic/task would also delete all subtopics and subtasks.
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn
            color="grey darken-1"
            text
            @click="prompt = false"
          >
            No
          </v-btn>

          <v-btn
            color="primary darken-1"
            text
            @click="remove"
          >
            Proceed
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { DESTROY_NODE } from "@/store/actions.type";

export default {
  data() {
    return {
      prompt: false
    };
  },
  methods: {
    remove() {
      this.prompt = false;
      store.dispatch(DESTROY_NODE, this.inspected_node);
    },
  },
  computed: {
    ...mapGetters(["inspected_node"])
  }
};
</script>
