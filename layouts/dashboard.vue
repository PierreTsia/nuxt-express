<template>
  <v-app>
    <v-navigation-drawer
      :clipped="clipped"
      v-model="drawer"
      class="accent"
      dark
      fixed
      app>
      <v-toolbar 
        flat 
        class="transparent">
        <v-list 
          class="pa-0 ml-auto">
          <v-list-tile
            avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider/>
      <v-list>
        <v-list-tile
          v-show="isAuth"
          key="logout"
          class="secondary--text"

          @click="handleLogout">
          <v-list-tile-action>
            <v-icon color="secondary">bubble_chart</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="'Logout'" />
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-show="!isAuth"
          key="login"
          @click="handleLogin">
          <v-list-tile-action>
            <v-icon>bubble_chart</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="'Login'" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      ref="toolbar"
      :clipped-left="clipped"
      color="transparent"
      app
      flat
      fixed>
      <v-toolbar-side-icon @click="drawer = !drawer" />

      <v-toolbar-title 
        class="text--secondary" 
        v-text="activePageName"/>
    </v-toolbar>
    <v-content>
      <v-container
        align-content-center
        fill-height>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {
    data() {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'apps', title: 'Welcome', to: '/' },
          { icon: 'bubble_chart', title: 'Login', to: '/login' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Page name',
      }
    },
    computed:{
      ...mapGetters(['isAuth']),
      activePageName(){
        return this.$route.name === 'index' ? 'Home' : this.$route.name
      }
    },
    methods:{
      ...mapActions(['logout']),
      handleLogout(){
        this.logout()
      },
      handleLogin(){
        this.$router.push("/login")
      }
    }

  }
</script>
<style lang="stylus">

</style>
