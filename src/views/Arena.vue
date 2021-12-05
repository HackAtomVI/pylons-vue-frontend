<template>
  <div class="background">
    <div v-if="isLoggedIn()" class="container">
      <div class="container--top">
        <div class="title">Arena</div>
        <div class="description">Enter into battle with your NFT Hero!</div>
      </div>
      <div class="container--bot">
        <div class="nft-name" id="nftName">
          <span>Fighter {{ fighterName }}</span>
        </div>
        <div class="hero_wrapper">
          <div class="nft-img_wrapper">
            <div class="stickfigure-background">
              <img src="../assets/img/stick_items/sboi.png" class="stickfigure" />
              <StickyLeft
                :name="this.$store.getters['getFighterEquipment'].lefthand.name"
                class="equipped-item"
                style="z-index: 100"
              />
              <StickyRight
                :name="this.$store.getters['getFighterEquipment'].righthand.name"
                class="equipped-item"
                style="z-index: 100"
              />
              <StickyArmor
                :name="this.$store.getters['getFighterEquipment'].armor.name"
                class="equipped-item"
                style="z-index: 10"
              />
              <img :src="nftImg" class="nft-image" />
            </div>
          </div>
          <div class="stats_wrapper">
            <div class="stats-column">
              <div class="stat-text"><span style="font-weight: bold">WINS:</span> {{ this.getWins() }}</div>
              <div class="stat-text"><span style="font-weight: bold">LOSSES:</span> {{ this.getLosses() }}</div>
              <div class="stat-text">
                <span style="font-weight: bold">W/L ratio:</span> {{ this.getWinLossRatio() }}
              </div>
            </div>
          </div>
          <div @click="enlistForArena()" class="fight-button">
            <img src="../assets/img/sword.png" class="sword-img" />
            <span class="fight-text">FIGHT!</span>
          </div>
        </div>
      </div>
    </div>
    <PleaseLogIn v-else />
  </div>
</template>

<script>
import * as R from 'ramda'
import StickyLeft from '@/components/StickyLeft.vue'
import StickyRight from '@/components/StickyRight.vue'
import StickyArmor from '@/components/StickyArmor.vue'
import PleaseLogIn from '../components/PleaseLogIn.vue'

export default {
  name: 'Arena',
  components: {
    PleaseLogIn,
    StickyLeft,
    StickyRight,
    StickyArmor,
  },
  data() {
    return {
      fighterEquipment: {},
      fighterName: 'undefined',
      canFight: false,
      ownedItems: [],
      nftImg: 'undefined',
    }
  },
  mounted() {
    console.log('the whole store:', this.$store)
    //console.log("IMAGE: ", this.$store.getters['getFighterEquipment'].nft.image)
    this.nftImg = this.$store.getters['getFighterEquipment'].nft.image
    this.queryMyNFT().then((nft) => {
      console.log('NFT:', nft)
      if (R.isEmpty(nft.name)) {
        this.fighterName = 'please give your NFT a proper name'
      } else {
        this.fighterName = nft.name
      }
      if (R.isEmpty(nft.image)) {
        this.nftImg = ''
      } else {
        this.nftImg = nft.image
      }
      this.fighterEquipment.nft = nft
    })

    this.queryMyItems().then((items) => {
      this.ownedItems = items
      console.log('owned items', items)
    })

    console.log('store fighter equipment', this.$store.getters['getFighterEquipment'])
    this.fighterEquipment = this.$store.getters['getFighterEquipment']

    this.canFight = true
    if (R.isEmpty(this.fighterEquipment.nft)) {
      this.canFight = false
      this.notifyFail('No NFT', "Boi, you haven't even uploaded an NFT... \nDo it in the UPLAOD page!.")
    }
    if (R.isEmpty(this.fighterEquipment.armor)) {
      this.canFight = false
      this.notifyFail(
        'No Armor worn',
        "Boi, you don't even wear an armor... \nI will look up if you own on and equip it.",
      )
    }
    if (
      (R.isEmpty(this.fighterEquipment.lefthand) || this.fighterEquipment.lefthand.ItemType === 'shield') &&
      R.isEmpty(this.fighterEquipment.righthand || this.fighterEquipment.righthand.ItemType === 'shield')
    ) {
      this.canFight = false
      this.notifyFail(
        'No Weapon in Hand',
        "Boi, you don't even have an item in your hand.\nLet's see if you have any weapons, lol.",
      )
    }
  },
  methods: {
    enlistForArena() {
      this.notifyInfo('Enlisting', 'You are being enlisted into the arena, please wait')
      if (this.canFight) {
        let leftID = this.fighterEquipment.lefthand.ID
        let rightID = this.fighterEquipment.righthand.ID
        if (this.fighterEquipment.lefthand.oneHanded === 'false') {
          rightID = this.fighterEquipment.lefthand.ID
        }
        if (this.fighterEquipment.righthand.oneHanded === 'false') {
          leftID = this.fighterEquipment.righthand.ID
        }
        this.$store
          .dispatch('Pylonstech.pylons.pylons/sendMsgEnlistForArena', {
            value: {
              '@type': '/Pylonstech.pylons.pylons.MsgEnlistForArena',
              creator: this.$store.getters['common/wallet/address'],
              nft: this.fighterEquipment.nft.ID,
              cookbookID: 'nftarena',
              lHitem: leftID,
              rHitem: rightID,
              armoritem: this.fighterEquipment.armor.ID,
            },
          })
          .then((res) => {
            console.log('EnlistForArena')
            console.log(res)
            this.$store
              .dispatch('Pylonstech.pylons.pylons/QueryFight', {
                params: {
                  '@type': 'Pylonstech.pylons.pylons/QueryFight',
                },
              })
              .then((res) => {
                console.log('All fights: ')
                console.log(res)
              })
            // if success link to page fight with id of the fight
            //<router-link to="/fight" class="">
            //</router-link>
          })
      } else {
        this.notifyFail(
          'Not ready for Fight!',
          "You don't meet the requirements for the Arena. \nNot listening to the error messages here, eh?",
        )
      }
    },
    getWinLossRatio() {
      if (typeof this.fighterEquipment.nft !== 'undefined')
        return this.fighterEquipment.nft.wins / this.fighterEquipment.nft.losses
    },
    getWins() {
      if (typeof this.fighterEquipment.nft !== 'undefined')
        return Number.parseFloat(this.fighterEquipment.nft.wins).toFixed(0)
    },
    getLosses() {
      if (typeof this.fighterEquipment.nft !== 'undefined')
        return Number.parseFloat(this.fighterEquipment.nft.losses).toFixed(0)
    },
    isLoggedIn() {
      return this.$store.getters['common/wallet/loggedIn']
    },
  },
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
  cursor: pointer;
  width: 180px;
  height: 180px;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  font-size: 18px;
  padding: 20px;
  margin: 2.5%;
  background-color: #29eddb;
  // background-color: #d61224;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  filter: invert(1);
  -webkit-filter: invert(1);
}
.stats_wrapper {
  width: 65%;
  padding: 20px;
}
.stat-text {
  font-size: 20px;
  margin: 5px;
  color: black;
}

.nft-img_wrapper {
  width: 250px;
  background-color: white;
  // height: 20%;
}
.stickfigure-background {
  width: 100%;
  height: 100%;
  background-image: url('../assets/img/stick_items/sboiBG.png');
  display: grid;
  z-index: -3;
}
.stickfigure {
  width: 100%;
  height: 100%;
  grid-column: 1;
  grid-row: 1;
  z-index: 0;
  //background-image: url("../assets/img/stick_items/sboi.png");
}
.equipped-item {
  grid-column: 1;
  grid-row: 1;
  width: 100%;
  height: 100%;
}
.nft-image {
  grid-column: 1;
  grid-row: 1;
  width: 30%;
  height: 30%;
  margin: 0px auto;
  z-index: 1;
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
.description {
  margin-top: 30px;
  font-size: 25px;
  color: white;
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
