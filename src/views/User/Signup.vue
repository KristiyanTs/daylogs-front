<template>
  <v-layout>
    <v-flex xs10 sm6 offset-sm3 md4 offset-md4 class="card-wrapper">
      <v-card v-if="!registered">
        <v-card-title class="text-center mb-4">
          <div class="text-center display-1">Sign up</div>
        </v-card-title>
        <v-card-text>
          <v-alert v-if="errors.length" color="error" class="mb-4" outlined>
            {{ errors[0] }}
          </v-alert>
          <v-form v-model="valid">
            <v-text-field
              type="text"
              v-model="user.name"
              label="Name"
              outlined
              :rules="rules.name"
              validate-on-blur
              ><font-awesome-icon :icon="['fa', 'user']" slot="prepend-inner"
            /></v-text-field>
            <v-text-field
              type="email"
              v-model="user.email"
              label="Email"
              outlined
              :rules="rules.email"
              validate-on-blur
              ><font-awesome-icon :icon="['fa', 'at']" slot="prepend-inner"
            /></v-text-field>
            <v-text-field
              :rules="rules.password"
              type="password"
              v-model="user.password"
              label="Password"
              outlined
              validate-on-blur
              ><font-awesome-icon :icon="['fa', 'key']" slot="prepend-inner"
            /></v-text-field>
            <v-text-field
              :rules="rules.password_confirmation"
              type="password"
              v-model="user.password_confirmation"
              label="Password confirmation"
              outlined
              validate-on-blur
              ><font-awesome-icon :icon="['fa', 'key']" slot="prepend-inner"
            /></v-text-field>
            <v-checkbox v-model="accept" type="checkbox" :rules="rules.accept">
              <span slot="label">
                I agree with the
                <router-link to="/privacy">Privacy Policy</router-link>
              </span>
            </v-checkbox>
            <div class="text-center">
              <v-btn
                large
                color="primary"
                @click="submit"
                :disabled="!valid"
                :loading="loading"
              >
                Create account
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
      <v-card v-else class="text-xs-center">
        <v-card-title>
          <div class="display-1 text-xs-center">
            You signed up!
          </div>
        </v-card-title>
        <v-card-text class="text-xs-center">
          A confirmation link was sent to your email. Click on it to verify your account.
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      user: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      },
      accept: false,
      registered: false,
      loading: false,
      errors: [],
      rules: {
        name: [val => !!val || "Name is required"],
        email: [val => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val) || "Enter a valid email"],
        password: [val => val.length > 7 || "Password should be at 8 symbols"],
        password_confirmation: [val => val == this.user.password || "Passwords don't match"],
        accept: [val => val || "Please, agree with the Privacy Policy and Terms of Use"]
      }
    };
  },
  methods: {
    submit() {
      this.loading = true;
      this.errors = [];

      this.axios
        .post("/api/signup", {
          user: this.user
        })
        .then(() => {
          this.loading = false;
          this.registered = true;
        })
        .catch(error => {
          this.errors = error.response.data;
          this.loading = false;
        });
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