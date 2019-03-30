import axios from "~/plugins/axios";
const Cookie = process.client ? require("js-cookie") : undefined;
const END_POINT = "api/tags";

export default {
  state: {
    tags: []
  },
  getters: {
    allTags: state => state.tags
  },
  actions: {
    fetchAllTags({ commit }) {
      axios
        .get(`${END_POINT}/all`)
        .then(({ data }) => {
          const tags  = data;
          commit("setAllTags", tags);
        })
        .catch(e => {
          const error = e.response.data;
          console.log(error)
        });
    }
  },
  mutations: {
    setAllTags(state, tags) {
      state.tags = tags;
    }
  }
};
