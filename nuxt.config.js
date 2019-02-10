const pkg = require("./package");

module.exports = {
  mode: "universal",

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#fff" },

  /*
  ** Global CSS
  */
  css: [
    "~/assets/style/app.styl",
    "node_modules/vue-multiselect/dist/vue-multiselect.min.css",
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ["@/plugins/vuetify", "@/plugins/vue-multiselect"],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    "@nuxtjs/axios",
    "nuxt-material-design-icons",
    ["@nuxtjs/moment", { locales: ["fr"], defaultLocale: "fr" }]
  ],

  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: `http://${process.env.HOST || "localhost"}:${process.env.PORT ||
      3000}`
    // See https://github.com/nuxt-community/axios-module#options
  },

  router: {},
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  }
};
