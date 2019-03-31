<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Update an image file</span>
      </v-card-title>
      <v-card-text>
        <v-layout wrap>
          <div
            v-if="!isLoading"
            class="editAvatar__preview">
            <div>
              <v-btn
                color="primary"
                fab
                small
                dark
                @click="handleUploadClick">
                <v-icon>backup</v-icon>
              </v-btn>
            </div>
            <input
              ref="upload"
              :style="{ display: 'none' }"
              type="file"
              @change="uploadNewUserImage"
            >

            <v-avatar
              v-if="tempUrl"
              class="userAvatar">
              <img
                :src="tempUrl"
                alt="avatar" >
            </v-avatar>
          </div>
          <v-flex
            v-else
            xs12>
            <div class="loader">
              <v-progress-circular
                :size="70"
                :width="7"
                color="purple"
                indeterminate
              />
            </div>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions
        v-if="tempUrl.length">
        <v-layout
          row
          wrap
          xs12
          justify-center>
          <v-btn
            color="white"
            class="mr-4 info"
            flat
            @click="$emit('onCancelClick')"
          >Close</v-btn
          >

          <v-btn
            color="white"
            class="info"
            flat
            @click.native="handleSubmitAvatar"
          >Save</v-btn
          >
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
  name: "EditAvatarModal",
  components: {
    DatePicker
  },
  props: {
    isShown: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    dialog: false,
    tempUrl: ""
  }),
  computed: {
    ...mapGetters(["userProfile", "profileErrors"]),
    handleError() {
      return (this.profileErrors && this.profileErrors.handle) || null;
    },
    statusError() {
      return (this.profileErrors && this.profileErrors.status) || null;
    }
  },
  watch: {
    isShown: {
      immediate: true,
      handler(val) {
        this.dialog = val;
      }
    }
  },

  mounted() {},
  methods: {
    handleDateSave({ dob }) {
      this.dob = dob;
    },
    formatDate(date) {
      return date
        ? moment(date).format("YYYY-MM-DD")
        : moment(new Date()).format("YYYY-MM-DD");
    },
    handleSubmitAvatar() {
      if (this.$refs.upload.files[0]) {
        const imgFile = this.$refs.upload.files[0];
        this.$emit("onConfirmClick", imgFile);
      }
    },
    handleUploadClick() {
      this.$refs.upload.click();
    },
    uploadNewUserImage() {
      const img = this.$refs.upload.files[0];
      this.tempUrl = URL.createObjectURL(img);
      console.log("​uploadNewUserImage -> this.tempUserImageUrl", this.tempUrl);
    }
  }
};
</script>
<style lang="stylus">
.loader
  display flex
  justify-content center
  align-items center

.editAvatar__preview
  width 100%
  display flex
  justify-content center
</style>
