<template>
  <form @submit.prevent="submit" class="px-3 py-3">
    <v-flex xs12 class="text-right m-0">
      <v-layout align-center align-content-center justify-center wrap>
        <v-btn @click="show = true" text x-large>
          <v-avatar size="50">
            <img :src="avatar" alt="avatar" />
          </v-avatar>
        </v-btn>
      </v-layout>
      <upload-avatar
        @crop-upload-success="cropUploadSuccess"
        v-model="show"
        :width="300"
        :height="300"
        :headers="header"
        url="/api/profile/update"
        method="put"
        field="user[avatar]"
        lang-type="en"
        img-format="png"
      ></upload-avatar>
      <v-text-field v-model="user.name" label="Name" required
        ><font-awesome-icon
          class="grey--text"
          :icon="['fa', 'user']"
          slot="prepend"
      /></v-text-field>
      <v-text-field disabled v-model="user.email" label="Email" required
        ><font-awesome-icon
          class="grey--text"
          :icon="['fa', 'at']"
          slot="prepend"
      /></v-text-field>
      <v-btn m-0 depressed color="success" @click="submit" :loading="loading"
        >Save</v-btn
      >
    </v-flex>
    <!-- The following line submits the form when pressing enter -->
    <input type="submit" value="Submit" class="d-none" />
  </form>
</template>

<script>
import UploadAvatar from "vue-image-crop-upload";

export default {
  components: {
    UploadAvatar
  },
  data() {
    return {
      show: false,
      avatar: "",
      loading: false,
      params: {
        token: "123456798",
        name: "avatar"
      },
      headers: {
        smail: "*_~"
      },
      user: { name: "", email: "", avatar: "" },
      header: { Authorization: window.$cookies.get("jwt") }
    };
  },
  mounted() {
    this.getUser();
  },
  beforeMount() {
    this.avatar = "https://cdn.pixabay.com/photo/2018/09/06/18/26/person-3658927_1280.png";
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
    cropUploadSuccess(jsonData, field) {
      this.show = false;
      this.avatar = jsonData.avatar;
      this.$store.commit("ADD_ALERT", [
        "Avatar updated successfully!!",
        "success"
      ]);
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

<style scoped lang="sass">
</style>