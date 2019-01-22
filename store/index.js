import Vuex from "vuex";
import auth from './modules/auth'



const createStore = () => {
  return new Vuex.Store({
    modules: {
      auth,
    },
  });
};

export default createStore;
