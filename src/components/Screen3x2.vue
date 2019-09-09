<template>
  <grid-layout
    :layout.sync="local_layout"
    :col-num="12"
    :cols="{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }"
    :row-height="window.height/5"
    :is-draggable="resizable"
    :is-resizable="resizable"
    :vertical-compact="true"
    :margin="[0, 0]"
    :use-css-transforms="true"
    :autoSize="true"
    responsive
    @layout-updated="layoutUpdatedEvent"
  >
    <grid-item v-for="item in local_layout"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :key="item.i"
      class="px-1 py-1 column"
    >
      <v-flex :class="`box-${item.i}`">
        <slot :name="`box-${item.i}`" />
      </v-flex>
    </grid-item>
  </grid-layout>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { SET_LAYOUT } from "@/store/mutations.type";
import VueGridLayout from 'vue-grid-layout';

export default {
  name: "Screen",
  components: {
    VueGridLayout
  },
  data() {
    return {
      local_layout: [],
      window: {
        width: 0,
        height: 0
      }
    };
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight - 67;
    },
    layoutUpdatedEvent(new_layout) {
      store.commit(SET_LAYOUT, JSON.parse(JSON.stringify(new_layout)));
    }
  },
  computed: {
    ...mapGetters(["layout3x2", "resizable"])
  },
  watch:{
    layout3x2: {
      immediate: true,
      handler() {
        this.local_layout = JSON.parse(JSON.stringify(this.layout3x2));
      }
    }
  }
}
</script>

<style scoped lang="sass">
.column > div
  height: 100%
</style>