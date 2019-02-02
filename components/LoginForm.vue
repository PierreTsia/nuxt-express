<template>
  <div class="login__form container">


    <v-text-field
      v-model="email"
      :error-messages="emailError"
      prepend-icon="email"
      class="login_textField"
      xs12
      label="Email"
      required
      type="text"/>

    <v-text-field
      v-model="password"
      :error-messages="passwordError"
      prepend-icon="lock_open"
      class="login_textField"
      xs12
      label="Password"
      required
      type="password"/>
    <v-layout
      row
      justify-center>
      <v-btn
        color="secondary"
        @click="handleLoginClick">submit</v-btn>
      <v-btn @click="handleClear">clear</v-btn>

    </v-layout>


  </div>

</template>
<script>
import {mapMutations} from 'vuex';
export default {
  name: "LoginForm",
  props: {
    errors: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    emailError() {
      return this.errors.email || null;
    },
    passwordError() {
      return this.errors.password || null;
    }
  },
  methods: {
    ...mapMutations(['setLoginError']),
    handleLoginClick() {
      const user = {
        email: this.email,
        password: this.password
      };

      this.$emit("userLogin", user);
    },
    handleClear(){
      this.email="";
      this.password="";
      this.setLoginError({})
    }
  }
};
</script>
<style lang="stylus" scoped>
  .login__form
    width 100%
    .login_textField
      margin-bottom 20px
</style>
