<template>

  <v-dialog 
    v-model="dialog" 
    persistent 
    max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">User Profile</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex 
              xs12>
              <v-text-field 
                v-model="handle"
                :error-messages="handleError"
                label="User name*"
                required/>
            </v-flex>
            <v-flex 
              xs12>
              <v-text-field
                v-model="status"
                :error-messages="statusError"
                label="Status*"
                required
                hint="Freelance..."/>
            </v-flex>
            <v-flex 
              xs12>
              <v-textarea
                v-model="bio"
                auto-grow
                label="Bio"
                rows="5"
                hint="Tell us a few words about yourself..."
              />
            </v-flex>

            <v-flex 
              xs12
              sm6>
              <DatePicker
                :user-dob="formatDate(dob)"
                @onDateSave="handleDateSave"/>
            </v-flex>
            <v-flex
              xs12
              sm6>
              <v-text-field
                v-model="location"
                label="City"/>
            </v-flex>

          </v-layout>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-layout 
          row 
          wrap 
          xs12 
          justify-center>
          <v-btn

            color="white"
            class="mr-4 info"
            flat
            @click="$emit('onCancelClick')">Close</v-btn>

          <v-btn
            color="white"
            class="info"
            flat
            @click.native="handleSubmitProfile">Save</v-btn>
        </v-layout>
        

        
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import DatePicker from "@/components/base/DatePicker.vue";
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  name: "EditProfileModal",
  components: {
    DatePicker
  },
  props: {
    isShown: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    dialog: false,
    bio: "",
    dob: new Date(),
    location: "",
    handle: "",
    status: "",
    newProfile: null,
  }),
  computed: {
    ...mapGetters(["userProfile", "profileErrors"]),
    handleError(){
      return this.profileErrors && this.profileErrors.handle || null;
    },
    statusError(){
      return this.profileErrors && this.profileErrors.status || null;
    }

  },
  watch: {
    isShown: {
      immediate: true,
      handler(val) {
        this.dialog = val;
      }
    },
  },

  mounted() {
    if (this.userProfile) {
      const { handle, bio, status, dob, location } = this.userProfile;
      this.handle = handle || "";
      this.bio = bio || "";
      this.status = status || "";
      this.dob = dob || new Date()
      this.location = location || null;
    }
  },
  methods: {
    handleDateSave({dob}) {
      this.dob = dob;
    },
    formatDate(date) {
      return date
        ? moment(date).format("YYYY-MM-DD")
        : moment(new Date()).format("YYYY-MM-DD");
    },
    handleSubmitProfile() {
      const newProfile = {
        handle: this.handle,
        bio: this.bio,
        status: this.status,
        dob: this.dob,
        location: this.location
      };
      this.$emit("onConfirmClick", newProfile);
    }
  }
};
</script>

<style scoped>
</style>
