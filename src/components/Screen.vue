<template>
  <grid-layout
    :layout.sync="local_layout"
    :col-num="12"
    :row-height="window.height"
    :is-draggable="resizable"
    :is-resizable="resizable"
    :is-mirrored="false"
    :vertical-compact="true"
    :margin="[0, 0]"
    :use-css-transforms="true"
    :autoSize="true"
    responsive
    @layout-updated="layoutUpdatedEvent"
  >
    <grid-item
      class="white"
      :x="layout[0].x"
      :y="layout[0].y"
      :w="layout[0].w"
      :h="layout[0].h"
      :i="layout[0].i">
          <v-flex class="col-left">
      <slot name="left" />
    </v-flex>
    </grid-item>
    <grid-item
      class="white"
      :x="layout[1].x"
      :y="layout[1].y"
      :w="layout[1].w"
      :h="layout[1].h"
      :i="layout[1].i">
          <v-flex class="col-right" fill-height>
      <slot name="right" />
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
      this.window.height = window.innerHeight - 62;
    },
    layoutUpdatedEvent(layout) {
      store.commit(SET_LAYOUT, layout);
    }
  },
  computed: {
    ...mapGetters(["layout", "resizable"])
  },
  watch:{
    layout: {
      immediate: true,
      handler() {
        this.local_layout = this.layout;
      }
    }
  }
}
</script>

<style scoped lang="sass">
.col-left, .col-right
  height: calc(100vh - 62px)
  overflow: scroll
  border-right: 1px solid rgba(0,0,0,.12)
</style>