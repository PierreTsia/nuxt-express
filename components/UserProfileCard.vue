<template>
  <v-card
    color="white"
    class="profileUserCard"
    elevation="2">
    <div class="profileUserCard_avatar">
      <h1 class="v-card__title white--text">{{ me.name }}</h1>
      <h2 class="grey--text mb-4 subheading">Javascript Developper</h2>
      <v-avatar
        :size="avatarSize">
        <img 
          :src="me.avatar"
          alt="avatar">
      </v-avatar>
    </div>
    <div class="profileUserCard_content">
      <v-layout
        fill-height
        column
        align-center
        justify-end
        fluid>
        <v-menu
          :close-on-content-click="false"
          :nudge-width="200"
          transition="slide-y-transition"
          offset-y
          class="pop-over-menu">
          <v-btn
            slot="activator"
            class="accent--text"
            bottom
            offset-y
            icon >
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile
              v-for="(item, index) in items"
              :key="index"
              class="menu__item"
              active-class="red"
              @click="isHovered(item.title)">
              <v-icon class="mr-2">{{ item.icon }}</v-icon>
              <v-list-tile-title>
                {{ item.title }}
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-card-title
          class="card_title"
          primary-title>
          <div>
            <div class="headline">Bio</div>
            <span class="grey--text">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</span>
          </div>
        </v-card-title>
        <v-card-title
          class="card_title"
          primary-title>
          <div>
            <div class="headline">Favorite Tags</div>
            <span class="grey--text">Subscribe to existing tags or create new ones...</span>

            <v-chip
              v-for="(tag, index) in mockTags"
              :key="index"
              :style="{backgroundColor: chipBackgroundColor}"
              class="white--text"
              close>{{ tag }}</v-chip>
          </div>
        </v-card-title>
      </v-layout>
    </div>
    <div class="profileUserCard_bottom_bar">
      <div class="text-xs-center">
        <v-btn 
          round 
          color="accent"
          dark>Rounded Button</v-btn>
      </div>


    </div>

  </v-card>

</template>
<script>
import { mapGetters } from "vuex";
import PopOverMenu from "./PopOverMenu";

export default {
  name: "UserProfileCard",
  components: {
    PopOverMenu
  },
  props: {
    profile: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      size: "150px",
      windowSize: "",
      activeMenuItem: null,
      mockTags: ["JavaScript", "VueJs", "React", "Node", "TypeScript"],
      items: [
        { title: "Edit Bio", icon: "create" },
        { title: "Edit Tags", icon: "collections_bookmark" }
      ],
      mockSocials: [
        "facebook",
        "twitter",
        "github",
        "instagram",
        "linkedin",
        "stackoverflow"
      ]
    };
  },
  computed: {
    ...mapGetters(["me"]),
    avatarSize() {
      if (this.windowSize <= 600) {
        return "75px";
      } else if (this.windowSize <= 900) {
        return "100px";
      } else if (this.windowSize <= 1200) {
        return "150px";
      } else {
        return "200px";
      }
    },
    chipBackgroundColor() {
      return "#000000".replace(/0/g, () => {
        return (~~(Math.random() * 16)).toString(16);
      });
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  mounted() {
    if (process.browser) {
      window.addEventListener("resize", this.handleResize);
    }
  },
  methods: {
    handleResize() {
      this.windowSize = document.documentElement.clientWidth;
    },
    isHovered(itemSlug) {
      this.activeMenuItem = itemSlug;
    },
    isActive(itemSlug) {
      console.log(itemSlug);
      return itemSlug === this.activeMenuItem;
    }
  }
};
</script>
<style lang="stylus" scoped>
  .profileUserCard
    display grid
    grid-template-rows repeat(6, 1fr)
    grid-template-columns repeat(6, 1fr)
    grid-template-areas "a a a a a a"\
    "a a a a a a"\
    "c c c c c c"\
    "c c c c c c"\
    "c c c c c c"\
    "bb bb bb bb bb bb"\

    .profileUserCard_avatar
      grid-area a
      background-color: #1c001c;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='288' height='288' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23404' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23610061'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E");
      background-repeat repeat
      display flex
      flex-direction column
      justify-content center
      align-items center
    .profileUserCard_content
      grid-area c
      background-color white
      position relative
      .pop-over-menu
        position absolute
        top 20px
        right 0
      .card_title
        width 100%
        .grey--text
          display block
          width 100%
    .profileUserCard_bottom_bar
      grid-area bb
      display flex
      align-items center
      justify-content center
      background-color rgba(lightgray, 0.5)



@media screen and (min-width: 768px)
  .profileUserCard
    grid-template-areas "a a a c c c"\
    "a a a c c c"\
    "a a a c c c"\
    "a a a c c c "\
    "a a a c c c "\
    "a a a bb bb bb"\





</style>