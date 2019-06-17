<template>
  <div class="form-wrapper">
    <card
      type="secondary"
      shadow
      header-classes="pb-5"
      body-classes="px-lg-1 py-lg-3"
      class="col-xs-10 col-md-6 col-lg-3"
    >
      <h3 class="text-center mb-4">Sign up</h3>
      <base-alert type="warning" v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </base-alert>
      <form @submit.prevent="validateForm">
        <base-input
          alternative
          class="mb-3 bg-white"
          placeholder="Name"
          addon-left-icon="user"
          v-model="name"
        >
        </base-input>
        <base-input
          alternative
          input_type="email"
          class="mb-3 bg-white"
          placeholder="Email"
          addon-left-icon="at"
          v-model="email"
        >
        </base-input>
        <base-input
          alternative
          input_type="password"
          class="mb-3 bg-white"
          placeholder="Password"
          addon-left-icon="key"
          v-model="password"
        >
        </base-input>
        <base-input
          alternative
          input_type="password"
          class="mb-3 bg-white"
          placeholder="Confirm password"
          addon-left-icon="key"
          v-model="password_confirmation"
        >
        </base-input>
        <base-checkbox v-model="accept">
          I agree with the <a href="#">Privacy Policy</a>
        </base-checkbox>
        <div class="text-center">
          <base-button type="primary" class="my-4" @click="validateForm">
            Create account
          </base-button>
        </div>
        <!-- The following line submits the form when pressing enter -->
        <input type="submit" value="Submit" class="d-none" />
      </form>
    </card>
    <modal
      :show.sync="open"
      gradient="success"
      modal-classes="modal-success modal-dialog-centered">
      <h6 slot="header" class="modal-title" id="modal-title-notification"></h6>
      <div class="py-3 text-center">
        <i class="ni ni-bell-55 ni-3x"></i>
        <h4 class="heading mt-4">You signed up!</h4>
        <p>
          A link was sent to your email. Click on it to verify your account.
        </p>
      </div>
      <template slot="footer">
        <base-button @click="open = false" type="link">Close</base-button>
        <base-button
          type="link"
          text-color="white"
          class="ml-auto"
          @click="$router.push('/login')"
        >
          Log in
        </base-button>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal";

export default {
  components: {
    Modal
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      accept: false,
      errors: [],
      open: false
    };
  },
  methods: {
    validateForm() {
      if (
        this.name &&
        this.emailIsValid &&
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
      if (!this.email || !this.emailIsValid) {
        this.errors.push("Enter a valid email.");
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
            password_confirmation: this.password_confirmation
          }
        })
        .then(() => {
          this.signupSuccessful();
        })
        .catch(error => this.signupFailed(error));
    },
    signupSuccessful() {
      this.open = true;
    },
    signupFailed(error) {
      this.errors = error.response.data;
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