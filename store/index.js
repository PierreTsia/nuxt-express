import Vuex from "vuex";
import auth from "./modules/auth";
const cookieparser = process.server ? require('cookieparser') : undefined

const createStore = () => {
  return new Vuex.Store({
    actions: {
      nuxtServerInit({ commit }, {req }) {
        console.log(req.headers)
        let auth = null
        if (req.headers.cookie) {
          const parsed = cookieparser.parse(req.headers.cookie)
          try {
            auth = JSON.parse(parsed.auth)
          } catch (err) {
            // No valid cookie found
            console.log(err)
          }
        }
        commit('setUser', auth)
      }
    },
    modules: {
      auth
    }
  });
};

export default createStore;
