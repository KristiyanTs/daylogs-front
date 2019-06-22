<template>
  <div class="row max-height">
    <div class="col-lg-5 col-xs-12 px-4 profile-wrapper">
      <h3 class="text-center">Profile</h3>
      <form @submit.prevent="submit" class="">
        <v-flex xs12 md4>
          <v-text-field
            v-model="user.name"
            label="Name"
            required
          ></v-text-field>
        </v-flex>
        <base-input v-model="user.name" alternative addon-left-icon="user">
        </base-input>
        <base-input
          alternative
          v-model="user.email"
          class="mt-3"
          disabled
          addon-left-icon="at"
        >
        </base-input>

        <base-input
          alternative
          class="mt-3"
          v-model="user.password"
          placeholder="Change password"
          input_type="password"
          addon-left-icon="key"
        >
        </base-input>
        <transition name="fade" :duration="300">
          <div v-if="user.password">
            <base-input
              alternative
              class="mt-3"
              v-model="user.password_confirmation"
              placeholder="Confirm new password"
              input_type="password"
              addon-left-icon="key"
            >
            </base-input>
            <base-input
              alternative
              class="mt-3"
              v-model="user.current_password"
              placeholder="Current password"
              input_type="password"
              addon-left-icon="key"
            >
            </base-input>
          </div>
        </transition>
        <v-btn color="success" @click="submit">Save</v-btn>
        <!-- The following line submits the form when pressing enter -->
        <input type="submit" value="Submit" class="d-none" />
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
      user: { name: "", email: "" },
      errors: null
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.loading = true;
      this.axios
        .get("/api/profile", {
          headers: { Authorization: window.$cookies.get("jwt") }
        })
        .then(response => {
          this.user = response.data;
        })
        .catch(() => {
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    submit() {
      this.axios
        .put("/api/profile/update", {
          user: this.user
        })
        .then(response => {
          this.user = response.data;
          this.$store.commit("ADD_ALERT", [
            "Your profile was updated successfully",
            "success"
          ]);
        })
        .catch(error => {
          this.$store.commit("ADD_ALERT", ["An error occurred.", "danger"]);
          this.errors = error;
        });
    }
  }
};
</script>
<style>
.profile-wrapper {
  padding-top: 100px;
  max-height: 100vh;
  -webkit-box-shadow: 0px 0px 18px -14px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 18px -14px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 18px -14px rgba(0,0,0,0.75);
}
</style>