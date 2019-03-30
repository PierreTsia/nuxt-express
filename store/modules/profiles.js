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
    currentUserProfile: null,
    errors: null,
    profileLoading: false,
    allProfilesLoading: false,
    allUsersProfiles: null
  },

  getters: {
    userHasProfile: state => !!state.currentUserProfile,
    userProfile: state => state.currentUserProfile,
    profileErrors: state => state.errors,
    profileHasErrors: state => !!state.errors,
    userProfileTags: state =>
      state.currentUserProfile ? state.currentUserProfile.tags : [],
    profileIsLoading: state => state.profileLoading,
    allProfilesLoading: state => state.allProfilesLoading,
    allProfiles: state => state.allUsersProfiles
  },

  actions: {
    async fetchUserProfile({ commit }) {
      commit("setProfileLoading", true);
      if (process.client) {
        const profileQuery = await axios.get(
          `${PROFILE_END_POINT}/current`,
          setHeaderCookie()
        );

        try {
          const { profile, errors } = profileQuery.data;
         if (errors) {
            commit("setProfileError", errors);
            commit("setProfileLoading", false);
          } else {
            commit("setUserProfile", profile);
            commit("setProfileLoading", false);
          }
        } catch (e) {
          console.log(e.response.data);
        }
      }
    },

    async fetchAllProfiles({ commit }) {
      commit("setAllProfilesLoading", true);
      const profilesQuery = await axios.get(
        `${PROFILE_END_POINT}/all`,
        setHeaderCookie()
      );
      try {
        const { profiles } = profilesQuery.data;
        commit("setProfiles", profiles);
        commit("setAllProfilesLoading", false);
      } catch (e) {
        console.log(e);
        commit("setAllProfilesLoading", false);
      }
    },

    updateProfile({ commit }, newProfile) {
      commit("setProfileLoading", true);
      axios
        .post(`${PROFILE_END_POINT}`, newProfile, setHeaderCookie())
        .then(({ data }) => {
          const { profile } = data;
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
      commit("setProfileLoading", true);
      axios
        .post(`${PROFILE_END_POINT}/tags/upsert`, tags, setHeaderCookie())
        .then(({ data }) => {
          const { tags } = data;
          commit("setProfileTags", tags);
          commit("setProfileLoading", false);
        });
    }
  },

  mutations: {
    setUserProfile(state, profile) {
      state.currentUserProfile = profile;
    },

    setProfiles(state, profiles) {
      state.allUsersProfiles = profiles;
    },

    setProfileError(state, error) {
      state.errors = error;
    },

    setProfileLoading(state, value) {
      state.profileLoading = value;
    },

    setAllProfilesLoading(state, value) {
      state.allProfilesLoading = value;
    },

    setProfileTags(state, tags) {
      state.currentUserProfile.tags = tags;
    }
  }
};
