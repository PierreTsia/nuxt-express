<template>
  <v-layout>
    <div
      v-if="!allProfilesLoading"
      class="usersPage">
      <div class="usersPage__menuBar">
        menu bar
      </div>
      <div
        v-if="allProfiles && allProfiles.length"
        class="usersPage__usersGrid">

        <UserCard
          v-for="profile in allProfiles"
          :profile="profile"
          :key="profile._id"
          class="usersPage__userCard" /></div>
    </div>
    <div
      v-else
      class="loader">
      <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
      />

    </div>
  </v-layout>

</template>
<script>
import UserCard from "@/components/UserCard.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  layout: "dashboard",
  components: {
    UserCard
  },

  computed: {
    ...mapGetters(["allProfiles", "allProfilesLoading"]),

  },
  async mounted(){
    await this.fetchAllProfiles()
  },
  methods: {
    ...mapActions(["fetchAllProfiles"])
  }
};
</script>
<style lang="stylus">
  //mobile size
  .loader
    width 100%
    display flex
    justify-content center
    padding 40px 0
  .usersPage
    width 100vw
    min-height 90vh

    .usersPage__menuBar
      width 100%
      height 100px
    .usersPage__usersGrid
      display grid
      grid-template-columns repeat(6, 1fr)
      grid-auto-rows 250px
      grid-gap 10px
    .usersPage__userCard
      grid-column span 6
      .v-card__text
        padding 0 16px

    //laptop size
    @media screen and (min-width: 900px)
      .usersPage__userCard
        grid-column span 3
        .v-card__text
          padding 16px

    @media screen and (min-width: 1600px)
      .usersPage__userCard
        grid-column span 2











</style>
