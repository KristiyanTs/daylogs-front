<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    alert("Mounted");
    this.attemptConfirmation();
  },
  methods: {
    attemptConfirmation() {
      alert("Sending a request to the API");
      console.log("Hey");
      this.axios
        .post(`/api/confirmation?confirmation_token=${this.$route.params.key}`)
        .then(response => {
          this.success(response);
        })
        .catch(error => {
          this.failure(error);
        });
    },
    success(message) {
      this.$store.commit("ADD_ALERT", [
        "Your email was confirmed. You may now log in.",
        "success"
      ]);
      this.$router.push("login");
    },
    failure(message) {
      this.$store.commit("ADD_ALERT", [
        "There was a problem with your email.",
        "danger"
      ]);
      this.$router.push("signup");
    }
  }
};
</script>

<style scoped>

</style>