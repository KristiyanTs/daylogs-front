<template>
  <div class="header" v-if="isVisible" :class="{ hidden: !showNavbar }">
    <router-link to="/">
      <img src="@/assets/images/logoBlue.png" />
    </router-link>
    <div>
      <router-link class="login btn" to="/login">Log in</router-link>
      <router-link class="register btn" to="/signup">Register</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showNavbar: true,
      lastScrollPosition: 0
    };
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    logOut() {
      this.$store.dispatch("signedOut");
    },
    onScroll() {
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition < 0) {
        return;
      }
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return;
      }
      this.showNavbar = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    }
  },
  computed: {
    signedIn() {
      return this.$store.state.signedIn;
    },
    isAdmin() {
      return this.$store.state.admin;
    },
    isVisible() {
      return this.$route.meta.header;
    }
  }
};
</script>
<style scoped lang="sass">
.header
  position: fixed
  top: 0px
  height: 70px
  width: 100%
  background-color: rgb(250,250,250)
  border-bottom: 1px solid rgb(240,240,240)
  display: flex
  align-items: center
  justify-content: space-between
  padding: 0px 10%
  img
    height: 40px
  .btn
    padding: 12px
    font-size: 14px
  .btn:hover
    box-shadow: none
  .login
    color: grey
  .register, .register:hover
    color: #77a6f7

.header.hidden
  opacity: 0
  z-index: -2
  -webkit-transition: opacity 0.5s
  transition: opacity 0.5s
  transition-timing-function: ease-in
</style>