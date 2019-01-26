import axios from "~/plugins/axios";
const Cookie = process.client ? require("js-cookie") : undefined;
const END_POINT = "api/users";

export default {
  state: {
    user: null,
    token: null,
    errors: {},
    isLoading: false
  },
  getters: {
    isAuth: state => !!state.user,
    authErrors: state => state.errors,
    isLoading: state => state.isLoading
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
          console.log(e.response);
          commit("setError", error);
          commit("setLoading", false);
        });
    },
    logout({ commit }) {
      commit("setLoading", true)
      axios
        .post(`${END_POINT}/logout`)
        .then(({ data }) => {
          Cookie.remove("auth");
          commit("setUser", false);
          commit("setLoading", false)

        })
        .catch(e =>  {
          commit("setLoading", false)
          console.log(e)
        });
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setError(state, errors) {
      state.errors = errors;
    },
    setLoading(state, isLoading) {
      state.isLoading = isLoading;
    }
  }
};
