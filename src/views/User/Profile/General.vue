<template>
  <v-form @submit.prevent="submit">
    <v-layout align-center align-content-center justify-center wrap>
      <v-btn @click="show = true" text x-large>
        <v-avatar size="50">
          <img :src="user.avatar" alt="avatar" />
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
    <!-- The following line submits the form when pressing enter -->
    <input type="submit" value="Submit" class="d-none" />
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";
import UploadAvatar from "vue-image-crop-upload";
import store from "@/store";
import {
  UPDATE_USER
} from "@/store/actions.type";

export default {
  components: {
    UploadAvatar
  },
  data() {
    return {
      show: false,
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
    this.user = {
      name: this.current_user.name,
      email: this.current_user.email,
      avatar: "https://cdn.pixabay.com/photo/2018/09/06/18/26/person-3658927_1280.png"
    }
  },
  methods: {
    cropUploadSuccess(jsonData, field) {
      this.show = false;
      this.user.avatar = jsonData.avatar;
      this.$store.commit("ADD_ALERT", [
        "Avatar updated successfully!!",
        "success"
      ]);
    },
    submit() {
      this.loading = true;
      store.dispatch(UPDATE_USER, this.user);
    }
  },
  computed: {
    ...mapGetters(["current_user"]),
  }
};
</script>