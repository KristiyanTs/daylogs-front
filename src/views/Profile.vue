<template>
  <div class="profile-page">
    <section class="section section-skew">
      <div class="container col-lg-4 col-xs-12">
        <h3 class="mt-5 text-white">Profile</h3>
        <card class="profile profile-1 mt-2 justify-cntent-center">
          <form @submit.prevent="submit" class="">
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
            <base-button class="float-right mt-3" type="primary" @click="submit"
              >Submit
            </base-button>
            <!-- The following line submits the form when pressing enter -->
            <input type="submit" value="Submit" class="d-none" />
          </form>
        </card>
        <!-- <h3 class="mt-5 text-white">Settings</h3>
        <card class="profile profile-1 mt-2">
          Helllo there
        </card> -->
      </div>
    </section>
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
.profile {

}
</style>
