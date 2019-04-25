<template>
  <header class="header-global">
    <base-nav class="navbar-main" transparent type="" effect="light" expand>
      <router-link slot="brand" to="/" class="navbar-brand mr-lg-5">
        <img src="../assets/images/logo.png" style="height:50px" />
      </router-link>

      <div class="row" slot="content-header" slot-scope="{ closeMenu }">
        <div class="col-6 collapse-brand">
          <router-link to="/">
            <img src="../assets/images/logo.png" style="height:50px" />
          </router-link>
        </div>
        <div class="col-6 collapse-close">
          <close-button @click="closeMenu"></close-button>
        </div>
      </div>

      <ul class="navbar-nav align-items-lg-center ml-lg-auto">
        <li class="nav-item d-none d-lg-block">
          <router-link
            v-if="!signedIn"
            to="/login"
            class="btn btn-neutral btn-icon"
          >
            <span class="btn-inner--icon">
              <i class="fa fa-sign-in mr-2"></i>
            </span>
            <span class="nav-link-inner--text">Log in</span>
          </router-link>
          <base-button round v-if="signedIn" @click="logOut" type="link">
            <font-awesome-icon icon="user" size="2x" color="#f0f3bd" />
          </base-button>
          <router-link
            v-if="signedIn && isAdmin == 'true'"
            to="/"
            class="btn btn-primary btn-icon"
          >
            <span class="btn-inner--icon">
              <i class="fa fa-sign-in mr-2"></i>
            </span>
            <span class="nav-link-inner--text">Admin panel</span>
          </router-link>
        </li>
      </ul>
    </base-nav>
    <div id="alerts" v-if="anyAlerts" class="text-center col-12">
      <base-alert
        v-for="[message, status] in $store.state.alerts"
        dismissible="true"
        :type="status"
        :message="message"
        :key="message"
        class="alert-message"
      >
        {{ message }}
      </base-alert>
    </div>
  </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import CloseButton from "@/components/CloseButton";

export default {
  components: {
    BaseNav,
    CloseButton
  },
  methods: {
    logOut() {
      this.$store.dispatch("signedOut");
    }
  },
  computed: {
    signedIn() {
      return this.$store.state.signedIn;
    },
    isAdmin() {
      return this.$store.state.admin;
    },
    anyAlerts() {
      return this.$store.state.alerts.length;
    }
  }
};
</script>
<style scoped lang="scss">
#alerts {
  position: absolute;
  top: 20px;
  z-index: 1000;

  .alert-message {
    max-width: 300px;
    min-width: 250px;
    margin: 0 auto;
  }
}
.navbar-nav .nav-item {
  margin-right: 0px;
}
</style>
