<template>
  <v-layout>
    <v-flex
      offset-sm3
      sm6 
      text-xs-center 
      xs12>

      <v-container>
        <img
          src="/v.png"
          alt="Vuetify.js"
          class="mb-5">
        <form>
          <v-text-field
            v-model="email"
            label="Email"
            required/>

          <v-text-field
            v-model="password"
            label="Password"
            required
            type="password"
          />


          <v-btn @click="handleLoginClick">submit</v-btn>
          <v-btn >clear</v-btn>
        </form>
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
    ...mapGetters(["isAuth"])
  },
  watch: {
    isAuth: {
      immediate: true,
      handler(user){
        if(user) this.$router.push('/')
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
    },
  }
};
</script>
