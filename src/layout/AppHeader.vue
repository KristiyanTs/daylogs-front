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

      <ul class="navbar-nav ml-lg-auto">
        <li class="nav-item d-none d-lg-block">
          <router-link v-if="!signedIn" to="/login" class="btn btn-neutral">
            Log in
          </router-link>
          <router-link
            v-if="signedIn && isAdmin == 'true'"
            to="/"
            class="btn btn-primary btn-icon"
          >
            Admin panel
          </router-link>
        </li>
        <base-dropdown
          tag="li"
          direction="left"
          position="right"
          v-if="signedIn"
        >
          <base-button
            slot="title"
            round
            v-if="signedIn"
            type="link"
            class="dropdown-toggle"
          >
            <font-awesome-icon icon="user" size="2x" color="#E8F6FF" />
          </base-button>
          <router-link class="dropdown-item" to="/profile">
            Profile
          </router-link>
          <a class="dropdown-item" href="#" @click="logOut">Log out</a>
        </base-dropdown>
      </ul>
    </base-nav>

    <div
      id="alerts"
      v-if="anyAlerts"
      class="text-center col-xs-12 col-md-6 offset-md-3"
    >
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
import BaseDropdown from "@/components/BaseDropdown";
import BaseButton from "@/components/BaseButton";
import BaseAlert from "@/components/BaseAlert";

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown,
    BaseButton,
    BaseAlert
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
    padding: 10px 30px;
    margin: 0 auto;
  }
}
.navbar-nav .nav-item {
  margin-right: 0px;
}
</style>
