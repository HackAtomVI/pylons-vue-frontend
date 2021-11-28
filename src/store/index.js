import { createStore } from 'vuex'
import init from './config'

const store = createStore({
  state: {
    isLoggedIn: false,
    nftName: '',
    isWinner: false,
  },
  mutations: {
    setWinner(state, winner) {
      state.isWinner = winner
    },
    setNftName(state, name) {
      state.nftName = name
    },
  },
  actions: {},
  getters: {
    getLoggedIn: (state) => {
      return state.isLoggedIn
    },
    getNftName: (state) => {
      return state.nftName
    },
    getIsWinner: (state) => {
      return state.isWinner
    },
  },
})
init(store)
export default store
