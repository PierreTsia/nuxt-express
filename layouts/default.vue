<template>
  <v-app>
    <v-navigation-drawer
      :clipped="clipped"
      v-model="drawer"
      fixed
      app>
      <v-list>
        <v-list-tile
          v-show="isAuth"
          key="logout"
          @click="handleLogout">
          <v-list-tile-action>
            <v-icon>bubble_chart</v-icon>
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
      app
      fixed>
      <v-toolbar-side-icon @click="drawer = !drawer" />

      <v-toolbar-title v-text="title"/>
    </v-toolbar>
    <v-content>
      <v-container 
        align-content-center
        fill-height>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      :right="right"
      v-model="rightDrawer"
      temporary
      fixed
    >
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; 2017</span>
    </v-footer>x
  </v-app>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {
    data() {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        menuItems: [
            { icon: 'apps', title: 'Welcome', to: '/' },
          { icon: 'bubble_chart', title: 'Login', to: '/login' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js',
      }
    },
    computed:{
      ...mapGetters(['isAuth']),
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
