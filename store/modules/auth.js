import axios from "~/plugins/axios";
const Cookie = process.client ? require("js-cookie") : undefined;
const END_POINT = "api/users";

export default {
  state: {
    user: null,
    token: null,
    errors: {}
  },
  getters: {
    isAuth: state => !!state.user
  },

  actions: {
    login({ commit }, payload) {
      axios
        .post(`${END_POINT}/login`, payload)
        .then(({ data }) => {
          const { user, accessToken } = data;
          const auth = { accessToken };
          Cookie.set("auth", auth);
          commit("setUser", user);
        })
        .catch(e => {
          const error = e;
          console.log(e);
          commit("setError", error);
        });
    },
    logout({ commit }) {
      axios
        .post(`${END_POINT}/logout`)
        .then(({ data }) => {
          Cookie.remove("auth");
          commit("setUser", false);
        })
        .catch(e => console.log(e));
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setError(state, errors) {
      state.errors = errors;
    }
  }
};
