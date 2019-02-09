<template>
  <v-layout 
    row 
    wrap>
    <v-flex 
      xs12>
      <v-menu
        ref="menu"
        :close-on-content-click="false"
        v-model="menu"
        :nudge-right="40"
        :return-value.sync="date"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          :value="userDob"
          label="Date of Birth"
          prepend-icon="event"
          readonly
        />
        <v-date-picker 
          v-model="date"
          header-color="accent"
          locale="us-US"
          scrollable>
          <v-spacer/>
          <v-btn 
            flat 
            color="primary"
            @click="menu = false">Cancel</v-btn>
          <v-btn 
            flat 
            color="primary" 
            @click="handleEmitClick">OK</v-btn>
        </v-date-picker>
      </v-menu>
    </v-flex>
  </v-layout>
</template>

<script>
import moment from "moment";
export default {
  name: "DatePicker",
  props: {
    userDob: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    menu: false,
    modal: false,
    date: null
  }),

  mounted() {
    this.date = this.userDob;
  },
  methods: {
    handleEmitClick() {
      this.$emit("onDateSave", { dob: this.date });
      this.menu = false;
    }
  }
};
</script>

<style scoped>
</style>
