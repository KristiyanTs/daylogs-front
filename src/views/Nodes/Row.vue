<template>
  <v-list-item color="primary" :to="`/nodes/${node.id}`">
    <v-list-item-avatar>
      <font-awesome-icon
        icon="code-branch"
        class="grey--text"
        v-if="node.category == null"
      />
      <v-btn fab v-else :color="node.category.color" depressed>
        <font-awesome-icon
          :icon="node.category.icon"
          :color="node.category.icon_color"
        />
      </v-btn>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title v-text="node.title" />
      <v-list-item-subtitle :v-text="node.descripion" />
    </v-list-item-content>

    <v-list-item-action>
      <v-flex>
        <v-btn icon @click.prevent="toggleFavorite">
          <font-awesome-icon
            icon="star"
            :class="`${node.favorite ? 'primary' : 'grey'}--text`"
          />
        </v-btn>
        <v-menu
          open-on-hover
          close-delay="30"
          bottom
          origin="center center"
          transition="scale-transition"
          left
          nudge-bottom="40"
        >
          <template v-slot:activator="{ on }">
            <v-btn icon ripple color="transparent" v-on="on">
              <font-awesome-icon icon="ellipsis-v" color="grey" />
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item @click="deleteNode" dense>
              <v-list-item-avatar>
                <font-awesome-icon icon="trash-alt" class="text-muted"/>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  Delete
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-flex>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: "NodeRow",
  props: {
    node: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  methods: {
    toggleFavorite() {
      this.axios
        .post("/api/favorites", {
          favorite: {
            node_id: this.node.id
          }
        })
        .then(response => {})
        .catch(error => {
          this.errors = error.response.data;
          this.loading = false;
        });
    },
    deleteNode() {
      this.axios
        .delete(`/api/nodes/${this.node.id}`)
        .then(() => {
          this.$emit("deleted");
        })
        .catch(error => {
          this.errors = error.response.data;
          this.loading = false;
        });
    }
  }
}
</script>
