<template>
  <div class="row max-height">
    <div
      class="nav flex-column nav-pills col-md-1 main-nav p-0 text-center m-0"
      id="v-pills-tab"
      role="tablist"
      aria-orientation="vertical"
    >
      <img src="../assets/images/logo.png" class="my-3 w-100 px-2" />
      <router-link
        class="nav-link"
        exact-active-class="active"
        to="/home/tasks"
      >
        <font-awesome-icon icon="tasks" size="3x" />
      </router-link>
      <router-link
        class="nav-link"
        exact-active-class="active"
        active-class="active"
        to="/home/notes"
      >
        <font-awesome-icon :icon="['far', 'clipboard']" size="3x" />
      </router-link>
      <router-link
        class="nav-link"
        exact-active-class="active"
        active-class="active"
        to="/home/sounds"
      >
        <font-awesome-icon icon="headphones" size="3x" />
      </router-link>
      <div class="account">
        <router-link
          class="nav-link"
          exact-active-class="active"
          active-class="active"
          to="/profile"
        >
          <font-awesome-icon icon="user" size="2x" />
        </router-link>
        <a class="nav-link">
          <font-awesome-icon icon="sign-out-alt" size="2x" />
        </a>
      </div>
    </div>
    <div class="col-md-11 p-0 m-0">
      <fade-transition mode="out-in" name="fade" :duration="300">
        <keep-alive>
          <router-view />
        </keep-alive>
      </fade-transition>
    </div>
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
.max-height {
  height: 100vh !important;
  position: relative;
}
.row {
  margin: 0px !important;
}
a.nav-link {
  background-color: transparent !important;
  box-shadow: none !important;
  margin: 0px !important;
  padding-left: 0px !important;
  padding-right: 0px !important;
  width: 100%;
  border-radius: 0px !important;
}
a.nav-link svg {
  width: 40px !important;
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
  color: #E8F6FF !important;
}
.nav-link.active {
  transition: all 2s;
  background-color: #05668d !important;
}
.main-nav {
  height: 100%;
  background-color: #01A7C2;
}
.account {
  position: absolute;
  bottom: 20px;
  width: 100%;
}
</style>
