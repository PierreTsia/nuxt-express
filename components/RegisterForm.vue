<template>
  <div class="register_form container">
    <v-text-field
      v-model="name"
      :error-messages="nameError"
      prepend-icon="person"
      class="register_textField"
      label="Name"
      required/>
    <v-text-field
      v-model="email"
      :error-messages="emailError"
      prepend-icon="email"
      class="register_textField"
      xs12
      label="Email"
      required
      type="text"/>

    <v-text-field
      v-model="password"
      :error-messages="passwordError"
      prepend-icon="lock_open"
      class="register_textField"
      xs12
      label="Password"
      required
      type="password"/>
    <v-text-field
      v-model="password2"
      :error-messages="password2Error"
      prepend-icon="lock_open"
      class="register_textField"
      xs12
      label="Confirm password"
      required
      type="password"/>
    <v-layout
      row
      justify-center>
      <v-btn
        color="secondary"
        @click="handleRegisterClick">submit</v-btn>
      <v-btn @click="handleClear">clear</v-btn>

    </v-layout>


  </div>

</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "RegisterForm",
  props: {
    errors: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password2: ""
    };
  },
  computed: {
    nameError() {
      return this.errors.name || null;
    },
    emailError() {
      return this.errors.email || null;
    },
    passwordError() {
      return this.errors.password || null;
    },
    password2Error() {
      return this.errors.password2 || null;
    }
  },
  methods: {
    ...mapMutations(['setRegisterError']),
    handleRegisterClick() {
      const user = {
        name: this.name,
        email: this.email,
        password: this.password,
        password2: this.password2
      };

      this.$emit("userRegister", user);
    },
    handleClear() {
      this.name = ""
      this.password = "";
      this.password2 = "";
      this.email = "";
      this.setRegisterError({})
    }
  }
};
</script>
<style lang="stylus" scoped>
  .register_form
    width 100%
    .register_textField
      margin-bottom 20px
</style>
