import { createStore } from 'vuex'
import init from './config'

const store = createStore({
  state: {
    fighterEquipment: {
      nft: {},
      lefthand: {},
      righthand: {},
      armor: {},
      helmet: {},
    },
    isLoggedIn: false,
    nftName: '',
    isWinner: false,
    NFT: {},
  },
  mutations: {
    setFighterEquipment(state, nft, lefthand, righthand, armor, helmet) {
      state.fighterEquipment = {
        nft: nft,
        lefthand: lefthand,
        righthand: righthand,
        armor: armor,
        helmet: helmet,
      }
    },
    setNft(state, nft) {
      state.NFT = nft
    },
    setWinner(state, winner) {
      state.isWinner = winner
    },
    setNftName(state, name) {
      state.nftName = name
    },
  },
  actions: {},
  getters: {
    getFighterEquipment: (state) => {
      return state.fighterEquipment
    },
    getNft: (state) => {
      return state.NFT
    },
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
