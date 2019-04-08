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
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <template>
              <div class="text-center text-muted mb-4">
                <h3>Sign up</h3>
              </div>
              <base-alert type="warning" v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                  <li v-for="error in errors" :key="error">{{ error }}</li>
                </ul>
              </base-alert>
              <form role="form" id="register">
                <base-input
                  alternative
                  class="mb-3"
                  placeholder="Name"
                  addon-left-icon="ni ni-single-02"
                  v-model="name"
                  required="true"
                >
                </base-input>
                <base-input
                  alternative
                  input_type="email"
                  class="mb-3"
                  placeholder="Email"
                  addon-left-icon="ni ni-email-83"
                  v-model="email"
                  required="true"
                >
                </base-input>
                <base-input
                  alternative
                  input_type="password"
                  placeholder="Password"
                  addon-left-icon="ni ni-lock-circle-open"
                  v-model="password"
                  required="true"
                >
                </base-input>
                <base-input
                  alternative
                  input_type="password"
                  placeholder="Confirm password"
                  addon-left-icon="ni ni-lock-circle-open"
                  v-model="password_confirmation"
                  required="true"
                >
                </base-input>
                <base-checkbox v-model="accept">
                  <span>I agree with the
                    <a href="#">Privacy Policy</a>
                  </span>
                </base-checkbox>
                <div class="text-center">
                  <base-button type="primary" class="my-4" @click="checkForm">
                    Create account
                  </base-button>
                </div>
              </form>
            </template>
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
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      accept: false,
      failure: false,
      errors: ""
    };
  },
  methods: {
    checkForm() {
      if (
        this.name &&
        this.email &&
        this.password.length >= 8 &&
        this.accept &&
        this.password == this.password_confirmation
      ) {
        this.submit();
      }

      this.errors = [];

      if (!this.name) {
        this.errors.push("Name required.");
      }
      if (!this.email) {
        this.errors.push("Email required.");
      }
      if (this.password.length < 8) {
        this.errors.push("Password has to be at least 8 symbols long.");
        this.password = "";
        this.password_confirmation = "";
      } else if (this.password != this.password_confirmation) {
        this.errors.push("Passwords do not match.");
        this.password = "";
        this.password_confirmation = "";
      }
      if (!this.accept) {
        this.errors.push(
          "Please, agree with the Privacy Policy and Terms of Use"
        );
      }
    },
    submit() {
      this.axios
        .post("/api/signup", {
          user: {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation,
            remember_me: this.remember_me ? 1 : 0
          }
        })
        .then(response => {
          this.signupSuccessful();
        })
        .catch(error => this.signupFailed(error));
    },
    signupSuccessful() {
      this.$store.commit("ADD_ALERT", [
        "Signup successfull. You may now login.",
        "success"
      ]);
      this.$router.push("/login");
    },
    signupFailed(error) {
      this.failure = true;
    }
  }
};
</script>
