<template>
  <section class="section section-shaped section-lg my-0 row justify-content-center">
    <div class="shape bg-gradient-default">
    </div>
    <div class="col-lg-10 row justify-content-center">
      <div
        class="nav flex-column nav-pills d-inline-block col-lg-2"
        id="v-pills-tab"
        role="tablist"
        aria-orientation="vertical"
      >
      </div>
      <fade-transition
        mode="out-in"
        name="fade"
        :duration="300"
      >
        <card
          shadow
          class="tab-content col-lg-10 d-inline-block p-3 router-card"
        >
          <router-view></router-view>
        </card>
      </fade-transition>
    </div>
  </section>
</template>

<script>
import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    FadeTransition
  },
  data() {
    return {};
  },
  computed: {
  }
};
</script>