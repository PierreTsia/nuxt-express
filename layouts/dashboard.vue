<template>
  <v-app class="grey lighten-4">
    <v-navigation-drawer
      :clipped="clipped"
      v-model="drawer"
      class="accent nav_drawer"
      dark
      fixed
      app
    >
      <v-toolbar
        flat
        class="transparent">
        <v-list class="pa-0 ml-auto">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="me.avatar" >
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ me.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider />
      <v-flex class="dashboard__nav">
        <v-list>
          <v-list-tile
            v-for="link in links"
            :key="link.title"
            :to="link.route"
            router
            class="white--text"
          >
            <v-list-tile-action>
              <v-icon color="white">{{ link.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ link.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider />

        <v-list class="logout__button">
          <v-list-tile
            key="logout"
            class="white--text"
            @click="handleLogout">
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-navigation-drawer>
    <v-toolbar
      ref="toolbar"
      :clipped-left="clipped"
      class="grey lighten-4"
      app
      flat
      fixed
    >
      <v-toolbar-side-icon @click="drawer = !drawer" />

      <v-toolbar-title
        class="text--secondary"
        v-text="activePageName" />
    </v-toolbar>
    <v-content>
      <v-container class="grey lighten-4">
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      links: [
        {
          icon: "home",
          title: "Home",
          route: "/",
          slug: "index"
        },
        {
          icon: "widgets",
          title: "Dashboard",
          route: "/dashboard",
          slug: "dashboard"
        },
        {
          icon: "local_activity",
          title: "Events",
          route: "/events",
          slug: "events"
        },
        {
          icon: "face",
          title: "Users",
          route: "/users",
          slug: "users"
        },
        {
          icon: "bubble_chart",
          title: "News",
          route: "/news",
          slug: "news"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Page name"
    };
  },
  computed: {
    ...mapGetters(["isAuth", "me"]),
    activePageName() {
      return this.$route.name === "index" ? "Home" : this.$route.name;
    }
  },
  methods: {
    ...mapActions(["logout"]),
    handleLogout() {
      this.logout();
    },
    handleLogin() {
      this.$router.push("/login");
    },
    handleRouteChange(route) {
      this.$router.push(route);
    }
  }
};
</script>
<style lang="stylus">
.v-list__tile--active
  color white !important
  background-color #610061
</style>
