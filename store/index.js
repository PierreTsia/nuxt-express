import Vuex from "vuex";
import auth from "./modules/auth";
import profiles from "./modules/profiles"

import axios from "~/plugins/axios";

const cookieparser = process.server ? require("cookieparser") : undefined;
const USERS_END_POINT = "api/users";

const createStore = () => {
  return new Vuex.Store({
    actions: {
      async nuxtServerInit({ commit, dispatch }, { req }) {
        let cookie = null;
        if (req.headers.cookie) {
          const parsed = cookieparser.parse(req.headers.cookie);
          try {
            cookie = JSON.parse(parsed.auth);
            const { accessToken } = cookie;
            const config = {
              headers: { Authorization: `Bearer ${accessToken}` }
            };
            const userQuery = await axios.get(`${USERS_END_POINT}/current`, config);
            const { user, profile } = userQuery.data;
            await commit("setUser", user);
            await commit("setUserProfile", profile)
           /* const profileQuery = await axios.get(`${PROFILE_END_POINT}/current`, config);
            const { profile } = profileQuery.data;
            await commit("setUserProfile", profile);*/


          } catch (err) {
            // No valid cookie found
            console.log(err);
          }
        } else {
          commit("setUser", false);
          commit("setUserProfile", false);

        }
      }
    },
    modules: {
      auth,
      profiles,
    }
  });
};

export default createStore;
