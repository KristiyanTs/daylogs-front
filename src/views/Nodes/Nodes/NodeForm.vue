<template>
  <FormScreen :open="open" @closeDialog="closeDialog">
    <template v-slot:title>
      New node
    </template>
    <template v-slot:form>
      <v-form v-model="valid">
        <v-alert v-if="errors.length" color="error" class="mb-4" outlined>
          {{ errors[0] }}
        </v-alert>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field
              v-model="node.title"
              :rules="rules.title"
              :counter="20"
              label="Node title"
              required
              class="my-3"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-form>
    </template>
    <template v-slot:actions>
      <v-btn color="grey" text @click="closeDialog">
        Close
      </v-btn>
      <v-btn color="primary" text @click="submit">
        Submit
      </v-btn>
    </template>
  </FormScreen>
</template>

<script>
import FormScreen from "@/components/FormScreen";

export default {
  components: {
    FormScreen
  },
  props: {
    parent: {
      type: Object,
      default: () => {},
      description: "The currently opened node"
    },
    open: {
      type: Boolean,
      default: false,
      description: "Is the modal open"
    }
  },
  data() {
    return {
      valid: false,
      errors: [],
      node: {
        parent_id: null,
        title: ""
      },
      rules: {
        title: [val => !!val || val.length > 20 || "Node title is required"]
      }
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    submit() {
      this.create();
    },
    resetForm() {
      this.valid = false;
      this.errors = [];
      this.node = {
        parent_id: this.parent.id,
        title: ""
      };
    },
    create() {
      this.node.parent_id = this.parent.id;

      this.axios
        .post("/api/nodes", {
          node: this.node
        })
        .then(() => {
          this.$emit("created");
          this.resetForm();
          this.closeDialog();
        })
        .catch(error => {
          this.requestError(error);
        });
    },
    requestError(error) {
      if (error.response.status == 401) {
        this.$store.dispatch("signedOut");
        this.$router.push("/");
      } else {
        this.$store.commit("ADD_ALERT", ["An error ocurred.", "danger"]);
      }
    }
  }
}
</script>