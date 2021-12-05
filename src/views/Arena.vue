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
          <div @click="enlistForArena()" class="fight-button">
            <img src="../assets/img/sword.png" class="sword-img" />
            <span class="fight-text">FIGHT!</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as R from 'ramda'

export default {
  name: 'Arena',
  components: {},
  data() {
    return {
      fighterEquipment: {},
      fighterName: 'undefined',
      canFight: false,
      ownedItems: [],
    }
  },
  mounted() {
    console.log('the whole store:', this.$store)

    this.queryMyNFT().then((nft) => {
      console.log('NFT:', nft)
      if (R.isEmpty(nft.name)) {
        this.fighterName = 'please give your NFT a proper name'
      } else {
        this.fighterName = nft.name
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
        console.log('Can fight with:')
        console.log(this.fighterEquipment.armor.ID)
        console.log(this.fighterEquipment.lefthand.ID)
        console.log(this.fighterEquipment.righthand.ID)
        console.log(this.fighterEquipment.nft.ID)
        this.$store
          .dispatch('Pylonstech.pylons.pylons/sendMsgEnlistForArena', {
            value: {
              '@type': '/Pylonstech.pylons.pylons.MsgEnlistForArena',
              creator: this.$store.getters['common/wallet/address'],
              nft: this.fighterEquipment.nft.ID,
              cookbookID: 'nftarena',
              lHitem: this.fighterEquipment.lefthand.ID,
              rHitem: this.fighterEquipment.righthand.ID,
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
