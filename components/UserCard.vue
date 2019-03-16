<template>
  <v-card
    class="userCard"
    color="white"
    max-height="245"
    min-height="245"
    dark>
    <v-card-title>
      <v-list-tile class="grow">
        <v-list-tile-avatar color="grey darken-3">
          <v-img
            :src="profile.user.avatar"
            class="elevation-6"
          />
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title class="text--primary">{{ profile.user.name }}</v-list-tile-title>
          <v-list-tile-title class="text--secondary">{{ profile.status }} | {{ profile.location }}</v-list-tile-title>

        </v-list-tile-content>
      </v-list-tile>
    </v-card-title>
    <v-card-text class="card__body">
      <div>
        <span
          v-if="isActiveTab('bio_tab')"
          class="tab text--primary mb-0">{{ profile.bio }}</span>
        <span
          v-if="isActiveTab('tags_tab')"
          class="tab text--primary mb-0">
          <v-chip
            v-for="(tag, index) in userTags"
            :key="index"
            :style="{backgroundColor: tag.color? tag.color : chipBackgroundColor}"
            class="tag__chip white--text">
            {{ tag.label }}
          </v-chip>
        </span>
      </div>
    </v-card-text>
    <v-card-actions>
      <NavigationDots
        :menu-items="userCardTabs"
        :active-tab-name="activeTab"
        @onMenuItemChange="setActiveTab"
      />
    </v-card-actions>




  </v-card>

</template>

<script>
import NavigationDots from "@/components/base/NavigationDots.vue";
export default {
  name: "UserCard",
  components: {
    NavigationDots
  },
  props: {
    profile: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      userCardTabs: ["bio_tab", "tags_tab"],
      activeTab: "bio_tab"
    };
  },
  computed: {
    userTags() {
      return this.profile.tags.length ? this.profile.tags : [];
    }
  },

  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    isActiveTab(tabName) {
      return tabName === this.activeTab;
    }
  }
};
</script>

<style scoped lang="stylus">
  .userCard
    .card__body
      height 120px
      display flex
      justify-content center
      align-items center

</style>
