<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    this.attemptConfirmation();
  },
  methods: {
    attemptConfirmation() {
      this.axios
        .put("/api/confirmation", {
          confirmation_token: this.$route.params.key
        })
        .then(response => {
          this.success(response);
        })
        .catch(error => {
          this.failure(error);
        });
    },
    success(response) {
      this.$store.commit("ADD_ALERT", [
        "Your email was confirmed. You could log in now."
      ]);
      this.$router.push("/login");
    },
    failure(message) {
      this.$store.commit("ADD_ALERT", [
        "There was a problem with your email.",
        "danger"
      ]);
      this.$router.push("/signup");
    }
  }
};
</script>

<style scoped>

</style>