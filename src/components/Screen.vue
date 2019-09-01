<template>
  <grid-layout
    :layout.sync="local_layout"
    :col-num="12"
    :row-height="window.height"
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
      class="white"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :key="item.i">
        <v-flex :class="`col-${item.i}`">
          <slot :name="item.i" />
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
    layoutUpdatedEvent(new_layout) {
      store.commit(SET_LAYOUT, JSON.parse(JSON.stringify(new_layout)));
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