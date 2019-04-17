<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-3 shape-default shape-skew">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card
            type="secondary"
            shadow
            header-classes="pb-5"
            body-classes="px-lg-5 py-lg-5"
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
                class="mb-3"
                placeholder="Email"
                addon-left-icon="ni ni-email-83"
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
      </div>
    </div>
  </section>
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
    validEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    submit() {
      this.response = "";
      this.failure = false;
      this.success = false;

      if (!this.validEmail()) {
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
  }
};
</script>

<style>
</style>