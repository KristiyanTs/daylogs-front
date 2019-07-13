<template>
  <v-layout>
    <v-flex xs10 sm6 offset-sm3 md4 offset-md4 class="card-wrapper">
      <v-card>
        <v-card-title class="text-center">
          <div class="text-center display-1">Log in</div>
        </v-card-title>

        <v-card-text>
          <v-alert :value="failure" color="error" outline>
            {{ response }}
          </v-alert>
          <form @submit.prevent="submit">
            <v-text-field type="email" v-model="email" label="Email"
              ><font-awesome-icon :icon="['fa', 'at']" slot="prepend"
            /></v-text-field>
            <v-text-field type="password" v-model="password" label="Password"
              ><font-awesome-icon :icon="['fa', 'key']" slot="prepend"
            /></v-text-field>
            <v-checkbox
              v-model="remember_me"
              label="Remember me"
              type="checkbox"
            ></v-checkbox>
            <div class="text-center">
              <v-btn large color="primary" @click="submit">
                Sign In
              </v-btn>
            </div>
            <!-- The following line submits the form when pressing enter -->
            <input type="submit" value="Submit" class="d-none" />
          </form>
        </v-card-text>

        <v-card-actions>
          <v-layout align-space-between justify-space-between row fill-height>
            <v-btn flat round to="/password">Forgot password?</v-btn>
            <v-btn flat round to="/signup">Register</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
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

<style>
.card-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.v-card {
  width: 100%;
}

label.v-label.theme--light {
  margin-bottom: 0px;
}

.display-1 {
  width: 100%;
}
</style>