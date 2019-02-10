import axios from "~/plugins/axios";
const Cookie = process.client ? require("js-cookie") : undefined;
const PROFILE_END_POINT = "api/profiles";

const setHeaderCookie = () => {
  if (process.client) {
    const auth = Cookie.get("auth");
    const cookie = JSON.parse(auth);
    const { accessToken } = cookie;
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };
  }
};

export default {
  state: {
    currentUserProfile: {},
    errors: null,
    profileLoading: false
  },

  getters: {
    userHasProfile: state => !!state.currentUserProfile,
    userProfile: state => state.currentUserProfile,
    profileErrors: state => state.errors,
    profileHasErrors: state => !!state.errors,
    userProfileTags: state => state.currentUserProfile.tags
  },

  actions: {
    async fetchUserProfile({ commit }) {
      if (process.client) {
        const profileQuery = await axios.get(
          `${PROFILE_END_POINT}/current`,
          setHeaderCookie()
        );
        try {
          const profile = profileQuery.data;
          return commit("setUserProfile", profile);
        } catch (e) {
          console.log(e.response.data);
        }
      }
    },

    updateProfile({ commit }, newProfile) {
      commit("setProfileLoading", true);
      axios
        .post(`${PROFILE_END_POINT}`, newProfile, setHeaderCookie())
        .then(({ data }) => {
          console.log(data);
          const profile = data;
          commit("setProfileLoading", false);
          commit("setUserProfile", profile);
          commit("setProfileError", null);
        })
        .catch(err => {
          commit("setProfileLoading", false);
          const error = err.response.data;
          commit("setProfileError", error);
        });
    },

    upsertUserTags({ commit }, tags) {
      console.log("from store", tags);
      axios.post(
        `${PROFILE_END_POINT}/tags/upsert`,
        tags,
        setHeaderCookie()
      ).then(({data}) => {
        console.log(data)
        const { tags } = data
        commit("setProfileTags", tags)
      })

    }
  },

  mutations: {
    setUserProfile(state, profile) {
      console.log(state);
      state.currentUserProfile = profile;
    },
    setProfileError(state, error) {
      state.errors = error;
    },
    setProfileLoading(state, value) {
      state.profileLoading = value;
    },
    setProfileTags(state, tags){
      state.currentUserProfile.tags = tags
    }
  }
};
