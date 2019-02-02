import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: '#121212', // a color that is not in the material colors palette
    accent: "#1C001C",
    secondary: '#440044',
    info: "#610061",
    white: "#fff",
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3
  }
})
