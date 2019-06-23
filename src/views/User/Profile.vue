<template>
  <Screen>
    <template v-slot:left>
      <h3 class="text-center">Profile</h3>
      <form @submit.prevent="submit">
        <v-flex xs12 class="text-right m-0">
          <v-text-field v-model="user.name" label="Name" required
            ><font-awesome-icon :icon="['fa', 'user']" slot="prepend"
          /></v-text-field>
          <v-text-field disabled v-model="user.email" label="Email" required
            ><font-awesome-icon :icon="['fa', 'at']" slot="prepend"
          /></v-text-field>
          <v-text-field
            type="password"
            v-model="user.password"
            label="New password"
            ><font-awesome-icon :icon="['fa', 'key']" slot="prepend"
          /></v-text-field>
          <transition name="fade" :duration="300">
            <div v-if="user.password">
              <v-text-field
                type="password"
                v-model="user.password_confirmation"
                label="Confirm new password"
                ><font-awesome-icon :icon="['fa', 'key']" slot="prepend"
              /></v-text-field>
              <v-text-field
                type="password"
                v-model="user.current_password"
                label="Current password"
                ><font-awesome-icon :icon="['fa', 'key']" slot="prepend"
              /></v-text-field>
            </div>
          </transition>
          <v-btn
            m-0
            depressed
            color="success"
            @click="submit"
            :loading="loading"
            >Save</v-btn
          >
        </v-flex>
        <!-- The following line submits the form when pressing enter -->
        <input type="submit" value="Submit" class="d-none" />
      </form>
    </template>
  </Screen>
</template>
<script>
import Screen from "@/views/components/Screen";

export default {
  components: {
    Screen
  },
  data() {
    return {
      loading: false,
      user: { name: "", email: "" }
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
          this.loading = false;
        })
        .catch(() => {});
    },
    submit() {
      this.loading = true;
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
          this.loading = false;
        })
        .catch(error => {
          this.$store.commit("ADD_ALERT", ["An error occurred.", "danger"]);
        });
    }
  }
};
</script>
<style>
h3 {
  padding-top: 100px;
}
</style>