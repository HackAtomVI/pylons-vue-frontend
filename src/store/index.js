import { createStore } from 'vuex'
import init from './config'

const store = createStore({
  state: {
    fighterEquipment: {
      nft: {},
      lefthand: -1,
      righthand: -1,
      armor: -1,
      helmet: -1,
    },
    equipedItemNames: {
      lefthand: '',
      righthand: '',
      armor: '',
      helmet: '',
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
    setFighterNft(state, nft) {
      state.fighterEquipment.nft = nft
    },
    setFighterLeftHand(state, lefthand) {
      state.fighterEquipment.lefthand = lefthand
    },
    setFighterRightHand(state, righthand) {
      state.fighterEquipment.righthand = righthand
    },
    setFighterArmor(state, armor) {
      console.log('wrote to state.fighterEquipment.armor')
      state.fighterEquipment.armor = armor
    },
    setFighterHelmet(state, helmet) {
      state.fighterEquipment.helmet = helmet
    },

    setEquipmentNameLeftHand(state, lefthand) {
      state.equipedItemNames.lefthand = lefthand
    },
    setEquipmentNameRightHand(state, righthand) {
      state.equipedItemNames.righthand = righthand
    },
    setEquipmentNameArmor(state, armor) {
      state.equipedItemNames.armor = armor
    },
    setEquipmentNameHelmet(state, helmet) {
      state.equipedItemNames.helmet = helmet
    },

    setNft(state, nft) {
      state.fighterEquipment = nft
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
    getEquipedItemNames: (state) => {
      return state.equipedItemNames
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
