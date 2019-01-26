<template>
  <v-layout>
    <v-flex
      text-xs-center
      align-content-center
      xs12
      sm8
      offset-sm2>
      <v-container
        class="login_container"
        fill-height
        xs12>
        <v-progress-circular
          v-if="isLoading"
          :size="90"
          :width="7"
          class="login__loader"
          color="light"
          indeterminate/>
        <v-form
          v-if="!isLoading"
          class="login__form">
          <v-text-field
            v-model="email"
            :error-messages="emailError"
            class="login_textField"
            xs12
            label="Email"
            required/>

          <v-text-field
            v-model="password"
            :error-messages="passwordError"
            class="login_textField"
            xs12
            label="Password"
            required
            type="password"/>
          <v-btn @click="handleLoginClick">submit</v-btn>
          <v-btn >clear</v-btn>
        </v-form>
      </v-container>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from "~/plugins/axios";

import { mapActions, mapGetters } from "vuex";
export default {
  fetch({ store, redirect }) {
    if (store.state.auth.user) {
      return redirect("/");
    }
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters({
      errors: "authErrors",
      isAuth: "isAuth",
      isLoading: "isLoading"
    }),
    emailError() {
      return this.errors.email || null;
    },
    passwordError() {
      return this.errors.password || null;
    }
  },
  watch: {
    isAuth: {
      immediate: true,
      handler(user) {
        if (user) this.$router.push("/");
      }
    }
  },
  methods: {
    ...mapActions(["login", "getCurrentUser"]),
    handleLoginClick() {
      const user = {
        email: this.email,
        password: this.password
      };

      this.login(user);
    }
  }
};
</script>
<style lang="stylus">
  .login_container
    .login__loader
      margin auto
    .login__form
      width 100%
      height 33vh
      .login_textField
        margin 20px


</style>
