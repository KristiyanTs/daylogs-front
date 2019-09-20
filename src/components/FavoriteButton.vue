<template>
  <v-tooltip bottom open-delay="200">
    <template v-slot:activator="data">
      <v-btn @click="toggleFavorite" fab depressed small class="white" v-on="data.on">
        <font-awesome-icon
          :color="isFavorite ? 'orange' : 'grey'"
          icon="star"
        />
      </v-btn>
    </template>
    Add to favorites
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { CREATE_FAVORITE, DESTROY_FAVORITE } from "@/store/actions.type";

export default {
  data() {
    return { };
  },
  methods: {
    toggleFavorite() {
      if(this.isFavorite) {
        store.dispatch(DESTROY_FAVORITE, this.inspected_node.id);
      } else {
        store.dispatch(CREATE_FAVORITE, {node_id: this.inspected_node.id});
      }
    },
  },
  computed: {
    ...mapGetters(["inspected_node", "favorites"]),
    isFavorite() {
      return this.favorites.map(f => f.id).includes(this.inspected_node.id);
    }
  }
};
</script>
