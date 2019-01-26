import Vuex from "vuex";
import auth from "./modules/auth";
import axios from "~/plugins/axios";

const cookieparser = process.server ? require("cookieparser") : undefined;
const END_POINT = "api/users";


const createStore = () => {
  return new Vuex.Store({
    actions: {
     async nuxtServerInit({ commit, dispatch}, { req }) {
        let cookie = null;
        if (req.headers.cookie) {
          const parsed = cookieparser.parse(req.headers.cookie);
          try {
            cookie = JSON.parse(parsed.auth);
            const {accessToken} = cookie
            const config = {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }
            const response = await axios.get(`${END_POINT}/current`, config)

            const user = response.data
            await commit('setUser', user)
          } catch (err) {
            // No valid cookie found
            console.log(err);
          }
        }
      }
    },
    modules: {
      auth
    }
  });
};

export default createStore;
