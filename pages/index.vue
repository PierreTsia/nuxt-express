<template>
  <v-layout
    column
    justify-start
    align-center>
    <v-container
      class="pouet"
      fill-height
      grid-list-md>
      <v-layout 
        row 
        wrap>
        <v-flex 
          d-flex 
          xs12 
          sm12
          md12>
          <UserProfileCard :profile="mockProfile"/>
        </v-flex>

        <v-flex 
          d-flex 
          xs12 
          sm3
          md3>
          <v-layout 
            row 
            wrap>

            <v-flex d-flex>
              <v-layout 
                row 
                wrap>
                <v-flex
                  v-for="n in 4"
                  :key="n"
                  d-flex
                  xs12
                >
                  <v-card
                    color="red lighten-2"
                    dark
                  >
                    <v-card-text>Lorem</v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex
          d-flex 
          xs12 
          sm9
          md9>
          <v-card 
            color="blue lighten-2" 
            dark>
            <v-card-text>Lorem</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import UserProfileCard from '@/components/UserProfileCard.vue';


export default {
  fetch({ store, redirect }) {
    if (!store.state.auth.user) {
      return redirect("/login");
    }
  },
  layout:'dashboard',
  components: {
    UserProfileCard,
    },
  data(){
    return {
      mockProfile: {
        bio: 'I am a poor lonesome developer'
      }
    }


  },
  computed: {
    ...mapGetters(["isAuth"])
  },
  watch :{
    isAuth: {
      handler(auth){
        if(!auth)this.$router.push('/login')
      }
    }
  },
  methods: {
    ...mapActions(["logout"]),
    handleLogout() {
      this.logout();
    }
  }
};
</script>
