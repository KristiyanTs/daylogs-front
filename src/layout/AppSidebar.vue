<template>
  <div
    class="nav flex-column nav-pills main-nav p-0 text-center m-0"
    id="sidebar"
    role="tablist"
    aria-orientation="vertical"
    v-if="isVisible"
  >
    <img src="../assets/images/logo.png" class="my-3 w-100 px-2" />
    <router-link class="nav-link" :class="isActive('tasks')" to="/tasks">
      <font-awesome-icon icon="tasks" size="3x" />
    </router-link>
    <router-link class="nav-link" :class="isActive('notes')" to="/notes">
      <font-awesome-icon :icon="['far', 'clipboard']" size="3x" />
    </router-link>
    <router-link class="nav-link" :class="isActive('sounds')" to="/sounds">
      <font-awesome-icon icon="headphones" size="3x" />
    </router-link>
    <div class="account">
      <router-link class="nav-link" :class="isActive('profile')" to="/profile">
        <font-awesome-icon icon="user" size="2x" />
      </router-link>
      <a class="nav-link" @click="logOut">
        <font-awesome-icon icon="sign-out-alt" size="2x" />
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "sidebar",
  data() {
    return {};
  },
  methods: {
    logOut() {
      this.$store.dispatch("signedOut");
      this.$router.push("/");
    },
    isActive(route) {
      return route == this.$route.name ? "active" : "";
    }
  },
  computed: {
    isVisible() {
      return !this.$route.meta.header;
    }
  }
};
</script>
<style scoped>
#sidebar {
  height: 100vh !important;
  position: fixed;
  width: 120px;
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