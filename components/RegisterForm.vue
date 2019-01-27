<template>
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

        <v-text-field
          v-model="password2"
          :error-messages="password2Error"
          class="login_textField"
          xs12
          label="Confirm password"
          required
          type="password"/>
        <v-btn @click="handleRegisterClick">submit</v-btn>
        <v-btn >clear</v-btn>
      </v-form>
    </v-container>
  </v-flex>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "RegisterForm",
  data() {
    return {
      email:"",
      password: "",
      password2:""
    };
  },
  computed: {
    ...mapGetters({ errors: "authErrors", isLoading: "isLoading" }),
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
  methods:{
    handleLoginClick() {
      const user = {
        email: this.email,
        password: this.password
      };

      this.$emit('userLogin',user);
    }
  }

};
</script>
