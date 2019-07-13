<template>
  <v-layout>
    <v-flex xs10 sm6 offset-sm3 md4 offset-md4 class="card-wrapper">
      <v-card>
        <v-card-title class="text-center">
          <div class="text-center display-1">Sign up</div>
        </v-card-title>
        <v-card-text>
          <base-alert type="warning" v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
              <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
          </base-alert>
          <form @submit.prevent="validateForm">
            <v-text-field type="text" v-model="name" label="Name"
              ><font-awesome-icon :icon="['fa', 'user']" slot="prepend"
            /></v-text-field>
            <v-text-field type="email" v-model="email" label="Email"
              ><font-awesome-icon :icon="['fa', 'at']" slot="prepend"
            /></v-text-field>
            <v-text-field type="password" v-model="password" label="Password"
              ><font-awesome-icon :icon="['fa', 'key']" slot="prepend"
            /></v-text-field>
            <v-text-field
              type="password"
              v-model="password_confirmation"
              label="Password confirmation"
              ><font-awesome-icon :icon="['fa', 'key']" slot="prepend"
            /></v-text-field>
            <v-checkbox v-model="accept" type="checkbox">
              <span slot="label">
                I agree with the
                <router-link to="/privacy">Privacy Policy</router-link>
              </span>
            </v-checkbox>
            <div class="text-center">
              <v-btn large color="primary" @click="validateForm">
                Create account
              </v-btn>
            </div>
            <!-- The following line submits the form when pressing enter -->
            <input type="submit" value="Submit" class="d-none" />
          </form>
        </v-card-text>
      </v-card>
    </v-flex>
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
  </v-layout>
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