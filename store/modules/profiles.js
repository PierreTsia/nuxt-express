import axios from "~/plugins/axios";
const Cookie = process.client ? require("js-cookie") : undefined;
const PROFILE_END_POINT = "api/profiles";

export default {
  state: {
    currentUserProfile:{},
    errors: null,
    profileLoading: false,
  },
  getters: {
    userHasProfile: state => !!state.currentUserProfile,
    userProfile: state => state.currentUserProfile,
    profileErrors: state => state.errors,
    profileHasErrors: state => !!state.errors
  },
  actions: {
    updateProfile({ commit }, newProfile) {
      commit('setProfileLoading', true)
      const auth = Cookie.get("auth");
      const cookie = JSON.parse(auth);
      console.log(cookie);
      const { accessToken } = cookie;
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
      };
      console.log("auth", auth);
      axios
        .post(`${PROFILE_END_POINT}`, newProfile, config)
        .then(({data}) => {
          console.log(data)
          const profile = data
          commit('setProfileLoading', false)
          commit("setUserProfile", profile)
          commit("setProfileError", null)
        })
        .catch(err => {
          commit('setProfileLoading', false)
          const error = err.response.data;
          commit("setProfileError", error);
        })

    }
  },
  mutations: {
    setUserProfile(state, profile){
      console.log(state)
      state.currentUserProfile = profile
    },
    setProfileError(state, error){
      state.errors = error
    },
    setProfileLoading(state, value){
      state.profileLoading = value
    }
  }
};
