import axios from '~/plugins/axios'

const storeToken = token => {
  if(process.browser){
    localStorage.setItem("token", token);
  }
}

const END_POINT = 'api/users'

export default{
  state: {
    user: null,
    token:null,
    errors:{},
  },
  getters: {
    token: state => state.token
  },

  actions:{
    login: function ({commit}, payload) {
      axios.post(`${END_POINT}/login`, payload)
        .then(({data}) => {
          storeToken(data.token)
          commit('setAuthToken', data.token)
        })
        .catch(e => {
          console.log(e)
        })
    },
    async getCurrentUser({commit, getters}){
      const config = {
        headers: {
          Authorization: getters.token
        }
      }
      const resp = await this.$axios.get(`${END_POINT}/current`, config)
      const user = resp.data
      commit('setUser', user)
    }
  },
  mutations:{
    setUser(state, user) {
      state.user = user
    },
    setError(state, errors){
      state.errors = errors
    },
    setAuthToken(state, token){
      state.token = token
    }

  }
}
