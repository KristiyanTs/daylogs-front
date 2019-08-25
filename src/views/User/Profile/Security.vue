<template>
  <v-form @submit.prevent="submit">
    <v-text-field type="password" v-model="user.password" label="New password"
      ><font-awesome-icon
        class="grey--text"
        :icon="['fa', 'key']"
        slot="prepend"
    /></v-text-field>
    <v-text-field
      type="password"
      v-model="user.password_confirmation"
      label="Confirm new password"
      ><font-awesome-icon
        class="grey--text"
        :icon="['fa', 'key']"
        slot="prepend"
    /></v-text-field>
    <v-text-field
      type="password"
      v-model="user.current_password"
      label="Current password"
      ><font-awesome-icon
        class="grey--text"
        :icon="['fa', 'key']"
        slot="prepend"
    /></v-text-field>
    <v-btn m-0 depressed color="success" @click="submit"
      >Save</v-btn
    >
    <!-- The following line submits the form when pressing enter -->
    <input type="submit" value="Submit" class="d-none" />
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      user: { password: "", password_confirmation: "", current_password: "" }
    };
  },
  methods: {
    submit() {
    }
  }
};
</script>