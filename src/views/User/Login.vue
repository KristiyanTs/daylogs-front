<template>
  <div class="form-wrapper">
    <card
      type="secondary"
      shadow
      header-classes="bg-white pb-5"
      body-classes="px-lg-1 py-lg-3"
      class="col-xs-10 col-md-6 col-lg-3"
    >
      <h3 class="text-center mb-3">Sign in</h3>
      <base-alert type="danger" v-if="failure">
        {{response}}
      </base-alert>
      <form @submit.prevent="submit">
        <base-input
          alternative
          class="mb-3 bg-white"
          placeholder="Email"
          addon-left-icon="at"
          v-model="email"
        >
        </base-input>
        <base-input
          alternative
          class="mb-3 bg-white"
          input_type="password"
          placeholder="Password"
          addon-left-icon="key"
          v-model="password"
        >
        </base-input>
        <base-checkbox v-model="remember_me">
          Remember me
        </base-checkbox>
        <div class="text-center">
          <base-button type="primary" class="my-4" @click="submit">
            Sign In
          </base-button>
        </div>
        <!-- The following line submits the form when pressing enter -->
        <input type="submit" value="Submit" class="d-none" />
      </form>
      <div class="row mt-3">
        <div class="col-6">
          <router-link to="/password">
            <small>Forgot password?</small>
          </router-link>
        </div>
        <div class="col-6 text-right">
          <router-link to="/signup">
            <small>Register</small>
          </router-link>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
export default {
  props: {
    nextUrl: {
      type: String,
      default: "/tasks"
    }
  },
  data() {
    return {
      email: "",
      password: "",
      remember_me: false,
      failure: false,
      response: ""
    };
  },
  methods: {
    submit() {
      this.failure = false;

      this.axios
        .post("/api/login", {
          user: {
            email: this.email,
            password: this.password,
            remember_me: this.remember_me ? 1 : 0
          }
        })
        .then(response => {
          this.loginSuccessful(response);
        })
        .catch(error => this.loginFailed(error));
    },
    loginSuccessful(response) {
      this.$store.dispatch("signedIn", [
        response.headers.authorization,
        response.data.id,
        response.data.role
      ]);
      this.$store.commit("ADD_ALERT", ["You are now logged in.", "success"]);
      this.$router.push(this.nextUrl);
    },
    loginFailed(error) {
      this.failure = true;
      this.response = "Your email or password is incorrect";
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