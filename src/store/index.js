import { createStore } from 'vuex'
import init from './config'

const store = createStore({
  state: {
    isLoggedIn: false,
    nftName: '',
  },
  mutations: {},
  actions: {},
  getters: {
    getLoggedIn: (state) => {
      return state.isLoggedIn
    },
  },
})
init(store)
export default store
