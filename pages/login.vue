<template>
  <v-layout class="login">
    <v-progress-circular
      v-if="isLoading"
      :size="90"
      :width="7"
      class="login__loader"
      color="secondary"
      indeterminate
    />
    <div
      v-if="!isLoading"
      class="login__tabs__container">
      <v-tabs
        v-model="active_tab"
        centered
        color="transparent"
        icons-and-text
        light
      >
        <v-tabs-slider color="secondary" />
        <v-tab
          key="login"
          class="tab"
          light
          href="#login">
          <span class="primary--text">Login</span>

          <v-icon>fingerprint</v-icon>
        </v-tab>
        <v-tab
          key="register"
          class="tab"
          light
          href="#register">
          <span class="primary--text">Sign-up</span>
          <v-icon>person_add</v-icon>
        </v-tab>
        <v-tab-item value="login">
          <LoginForm
            v-if="!isLoading"
            :errors="loginErrors"
            class="loginForm"
            @userLogin="handleLoginRequest"
          />
        </v-tab-item>
        <v-tab-item value="register">
          <RegisterForm
            v-if="!isLoading"
            :errors="registerErrors"
            class="loginForm"
            @userRegister="handleRegisterRequest"
          />
        </v-tab-item>
      </v-tabs>
    </div>
  </v-layout>
</template>
<script>
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";

import { mapActions, mapGetters } from "vuex";
export default {
  fetch({ store, redirect }) {
    if (store.state.auth.user) {
      return redirect("/");
    }
  },
  components: {
    LoginForm,
    RegisterForm
  },
  data() {
    return {
      active_tab: "register"
    };
  },
  computed: {
    ...mapGetters({
      loginErrors: "loginErrors",
      registerErrors: "registerErrors",
      isAuth: "isAuth",
      isLoading: "isLoading"
    })
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
    ...mapActions(["login", "registerNewUser"]),
    async handleLoginRequest(user) {
      await this.login(user);
    },
    handleRegisterRequest(newUser) {
      this.registerNewUser(newUser);
    }
  }
};
</script>

<style lang="stylus">
.login
  display flex
  flex-direction column
  justify-content center
  .loginForm
      max-width 600px
      margin auto
  .login__loader
    margin auto
  .tab
    display flex
</style>
