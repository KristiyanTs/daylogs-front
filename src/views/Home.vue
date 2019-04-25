<template>
  <div>
    <section class="section section-lg pt-lg-0 section-shaped">
      <div class="container row w-100">
        <div class="col-lg-1 p-0">
          <div
            class="nav flex-column nav-pills d-inline-block justify-content-center"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <router-link
              class="btn btn-sm nav-link"
              exact-active-class="active"
              to="/home/tasks"
            >
              <font-awesome-icon icon="tasks" size="3x" class="text-primary" />
            </router-link>
            <router-link
              class="btn btn-sm nav-link"
              exact-active-class="active"
              active-class="active"
              to="/home/notes"
            >
              <font-awesome-icon
                :icon="['far', 'clipboard']"
                size="3x"
                class="text-primary"
              />
            </router-link>
            <router-link
              class="btn btn-sm nav-link"
              exact-active-class="active"
              active-class="active"
              to="/music"
            >
              <font-awesome-icon
                icon="headphones"
                size="3x"
                class="text-primary"
              />
            </router-link>
          </div>
        </div>
        <fade-transition
          mode="out-in"
          name="fade"
          :duration="300"
          class="col-lg-11 p-0"
        >
          <keep-alive>
            <router-view />
          </keep-alive>
        </fade-transition>
      </div>
    </section>
  </div>
</template>

<script>
import { FadeTransition } from "vue2-transitions";

export default {
  name: "home",
  components: {
    FadeTransition
  },
  data() {
    return {};
  }
};
</script>

<style>
* /deep/ .card, * /deep/ .card-body {
  /* border: 1px solid rgba(94,114,228, 0.4) !important; */
  border: 0px !important;
  border-radius: 5px !important;
}
* /deep/ .container.row.w-100 {
  margin: 0 auto;
}
.container.w-100 {
  max-width: none;
}
.row{
  margin: 0px;
}
#app {
  /* background-image: linear-gradient(to right top, #bf9aca, #cfa4c9, #dbb0ca, #e4bdcc, #eacbd2); */
  background-image: linear-gradient(to left top, #028090, #008a94, #009497, #009e97, #00a896);
}
a.nav-link {
  background-color: transparent !important;
  box-shadow: none !important;
  margin: 0px !important;
}
/* a.nav-link.active {
  background-color: transparent !important;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
} */
a.nav-link:hover {
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08) !important;
}
a.nav-link:hover svg {
  transition: 0.5s;
  transition-delay: 0.1s;
}
.nav-link svg {
  color: #f0f3bd !important;
}
</style>
