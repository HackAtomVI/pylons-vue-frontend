<template>
  <div class="background">
    <div class="container">
      <div class="container--top">
        <div class="title">Arena</div>
      </div>
      <div class="container--bot">
        <div class="nft-name" id="nftName">
          <span>Fighter {{ fighterName }}</span>
        </div>
        <div class="hero_wrapper">
          <div class="nft-img_wrapper"></div>
          <div class="stats_wrapper"></div>
          <router-link to="/fight" class="fight-button">
            <img src="../assets/img/sword.png" class="sword-img" />
            <span class="fight-text">FIGHT!</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNft, getItems } from '../utils/pylonsInteraction.js'

export default {
  name: 'Arena',
  components: {},
  data() {
    return {
      fighterEquipment: {},
      fighterName: 'loserboi',
      heroNft: {},
      canFight: false,
      ownedItems: [],
    }
  },
  beforeCreate() {
    this.getNft = getNft.bind(this)
    this.getItems = getItems.bind(this)
  },
  mounted() {
    this.getNft()
      .then((res) => {
        if (res === false) {
          console.log('YOU DONT OWN NFT - GO TO "UPLOAD NFT" - DONT PASS GO - DONT COLLECT $400')
        } else {
          console.log('getnft', res)
          this.heroNft = res
          this.figtherEquipment = this.heroNft
        }
      })
      .catch((err) => {
        this.notifyFail('LOGGED IN?', "'NOT LOGGED IN? IS IT POSSIBLE THAT YOU ARE NOT LOGGED IN YES?'")
        console.log()
        console.error(err)
      })

    this.getItems().then((items) => {
      this.ownedItems = items
      console.log('items', items)
    })
    console.log('store', this.$store.getters['getFighterEquipment'])
    this.figtherEquipment = this.$store.getters['getFighterEquipment']

    if (!this.fighterEquipment.nft) {
      this.notifyFail('No NFT', "Boi, you don't even have uploaded an NFT... \nDo it in the Hero workshop.")
    }
    if (!this.fighterEquipment.armor) {
      this.notifyFail(
        'No Armor worn',
        "Boi, you don't even wear an armor... \nI will look up if you own on and equip it.",
      )
    }
    if (!this.fighterEquipment.lefthand) {
      this.notifyFail(
        'No Weapon in Left Hand',
        "Boi, you don't even have an item in your left hand.\nLet's see if you have any weapons, lol.",
      )
    }
    if (!this.fighterEquipment.righthand) {
      this.notifyFail(
        'No Weapon in Right Hand',
        "Boi, you don't even have an item your right hand.\nLet's see if you have any weapons, lol.",
      )
    }
  },
  methods: {},
}
</script>

<style scoped lang="scss">
@import '../scss/variables';
.sp-fill {
  padding-top: 0;
}
.text {
  font-family: Roboto;
  color: white;
}
.nft-name {
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: bolder;
}
.fight-text {
  text-decoration: none;
  color: black;
}
.fight-button {
  width: 180px;
  height: 180px;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  font-size: 18px;
  padding: 20px;
  margin: 2.5%;
  background-color: #d61224;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.stats_wrapper {
  width: 65%;
}
.nft-img_wrapper {
  width: 250px;
  height: 250px;
  background-color: white;
  // height: 20%;
}
.hero_wrapper {
  display: flex;
  flex-direction: row;
  background-color: rgba(255, 255, 255, 0.5);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.sword-img {
  //vertical-align: middle;
  width: 100px;
  height: 100px;
  margin-left: 20px;
  margin-bottom: 20px;
  display: block;
}
.container {
  width: 100%;
  padding: 0;
  height: 100%;
  max-width: unset;
  margin: 0;
}
.container--top {
  text-align: right;
  padding: 5% 10%;
  height: 35%;
  width: 100%;
  background-color: rgba(85.0000025331974, 5.000000176951289, 66.00000366568565, 1);
}
.container--bot {
  height: 65%;
  width: 100%;
  padding: 5% 10%;
  background-color: rgba(255, 198.00000339746475, 98.00000175833702, 1);
}
.title {
  //margin-right: 5%;
  color: white;
  font-size: 40px;
  font-family: $font-family;
  padding-top: 35px;
  font-weight: bold;
}
.background {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  background: $background-gradient;
}
</style>
