<template>
  <v-layout
    column
    justify-start
    align-center>
    <v-container 
      fluid
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
          <v-card 
            color="purple" 
            dark>
            <v-card-title 
              primary 
              class="title">Lorem</v-card-title>
            <v-card-text>{{ lorem }}</v-card-text>
          </v-card>
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
                    <v-card-text>{{ lorem.slice(0, 40) }}</v-card-text>
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
            <v-card-text>{{ lorem.slice(0, 100) }}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  fetch({ store, redirect }) {
    if (!store.state.auth.user) {
      return redirect("/login");
    }
  },
  layout:'dashboard',
  components: {
    Logo,
    VuetifyLogo
  },
  data(){
    return {
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
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
