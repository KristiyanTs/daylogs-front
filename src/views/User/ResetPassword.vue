<template>
  <div class="form-wrapper">
    <card
      type="secondary"
      shadow
      header-classes="bg-white pb-5"
      body-classes="px-lg-1 py-lg-3"
      class="col-xs-10 col-md-6 col-lg-3"
    >
      <h3 class="text-center">Reset password</h3>
      <form @submit.prevent="submit" class="">
        <base-input
          alternative
          class="mt-3"
          v-model="password"
          placeholder="New password"
          input_type="password"
          addon-left-icon="key"
        />
        <base-input
          alternative
          class="mt-3"
          v-model="password_confirmation"
          placeholder="Confirm password"
          input_type="password"
          addon-left-icon="key"
        />
        <base-button
          class="float-right mt-3 mr-0"
          type="primary"
          @click="submit"
          >Submit
        </base-button>
        <!-- The following line submits the form when pressing enter -->
        <input type="submit" value="Submit" class="d-none" />
      </form>
    </card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      password_confirmation: ""
    };
  },
  methods: {
    submit() {
      this.axios
        .put("/api/password", {
          user: {
            reset_password_token: this.$route.params.key,
            password: this.password,
            password_confirmation: this.password_confirmation
          }
        })
        .then(response => {
          this.success(response);
        })
        .catch(error => {
          this.failure(error);
        });
    },
    success(message) {
      this.$store.commit("ADD_ALERT", [
        "Your password was successfully changed. You may now log in.",
        "success"
      ]);
      this.$router.push("login");
    },
    failure(message) {
      this.$store.commit("ADD_ALERT", [
        "There was a problem changnig your password.",
        "danger"
      ]);
      this.$router.push("login");
    }
  }
};
</script>

<style scoped>
.form-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>