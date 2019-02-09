import axios from "~/plugins/axios";
const Cookie = process.client ? require("js-cookie") : undefined;
const END_POINT = "api/users";

export default {
  state: {
    user: null,
    loginErrors: {},
    registerErrors: {},
    isLoading: false
  },
  getters: {
    isAuth: state => !!state.user,
    me: state => state.user,
    loginErrors: state => state.loginErrors,
    isLoading: state => state.isLoading,
    registerErrors: state => state.registerErrors,
  },
  actions: {
    login({ commit }, payload) {
      this.commit("setLoading", true);
      axios
        .post(`${END_POINT}/login`, payload)
        .then(({ data }) => {
          const { user, accessToken } = data;
          const auth = { accessToken };
          Cookie.set("auth", auth);
          commit("setUser", user);
          commit("setLoading", false);
        })
        .catch(e => {
          const error = e.response.data;
          commit("setLoginError", error);
          commit("setLoading", false);
        });
    },
    logout({ commit }) {
      commit("setLoading", true);
      axios
        .post(`${END_POINT}/logout`)
        .then(({ data }) => {
          Cookie.remove("auth");
          commit("setUser", false);
          commit('setUserProfile', false)
          commit("setLoading", false);
        })
        .catch(e => {
          commit("setLoading", false);
          console.log(e);
        });
    },
    registerNewUser({ commit }, newUserData) {
      commit("setLoading", true);
      axios
        .post(`${END_POINT}/register`, newUserData)
        .then(({ data }) => {
          const { user, accessToken } = data;
          const auth = { accessToken };
          Cookie.set("auth", auth);
          commit("setUser", user);
          commit("setLoading", false);
        })
        .catch(e => {
          console.log(e);
          const err = e.response.data;
          commit("setRegisterError", err);
          commit("setLoading", false);
        });
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setLoginError(state, errors) {
      state.loginErrors = errors;
    },
    setRegisterError(state, errors) {
      state.registerErrors = errors;
    },
    setLoading(state, isLoading) {
      state.isLoading = isLoading;
    }
  }
};
