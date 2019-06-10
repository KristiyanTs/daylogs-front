<template>
  <div class="form-wrapper">
    <card
      type="secondary"
      shadow
      header-classes="pb-5"
      body-classes="px-lg-1 py-lg-3"
      class="col-xs-10 col-md-6 col-lg-3"
    >
      <div class="text-center text-muted mb-3">
        <h3>Reset password</h3>
      </div>
      <base-alert type="success" v-if="success">
        {{response}}
      </base-alert>
      <base-alert type="warning" v-if="failure">
        {{response}}
      </base-alert>
      <form @submit.prevent="submit" v-cloak>
        <base-input
          alternative
          class="mb-3 bg-white"
          placeholder="Email"
          addon-left-icon="at"
          v-model="email"
        >
        </base-input>
        <div class="text-center">
          <base-button
            type="primary"
            class="my-4"
            :class="{ disabled: success }"
            @click="submit"
          >
            Send a link
          </base-button>
        </div>
        <!-- The following line submits the form when pressing enter -->
        <input type="submit" value="Submit" class="d-none" />
      </form>
      <div class="row mt-3">
        <div class="col-6">
          <router-link to="/login">
            <small>Log in</small>
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
  data() {
    return {
      email: "",
      response: "",
      success: false,
      failure: false
    };
  },
  methods: {
    submit() {
      this.response = "";
      this.failure = false;
      this.success = false;

      if (!this.emailIsValid) {
        this.resetFailed("Please, use a real email.");
        return;
      }

      this.axios
        .post("/api/password", {
          user: {
            email: this.email
          }
        })
        .then(response => this.resetSuccessful(response))
        .catch(error => this.resetFailed(error));
    },
    resetSuccessful(response) {
      this.success = true;
      this.response = response.data.message;
    },
    resetFailed(error) {
      this.failure = true;
      this.response = error;
    }
  },
  computed: {
    emailIsValid() {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(this.email);
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