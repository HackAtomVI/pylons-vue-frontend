<template>
  <div class="background">
    <div v-if="this.isUserLoggedIn()" class="container">
      <!-- LOCAL HEADER -->
      <!-- <div class="local-header">
        <div class="header-item">
          ITEM COLLECTION
        </div>
        <div class="header-item">
          HERO
        </div>
      </div> -->
      <div class="panel-wrapper">
        <div class="panel__left">
          <div class="selection-wrapper">
            <div class="selection-item">
              <span class="selection-text" style="color: rgb(18, 209, 209)">HELMET</span>
              <div class="arrow-left blue" />
              <div class="arrow-right blue" />
            </div>
            <div class="selection-item">
              <span class="selection-text" style="color: rgb(255, 198, 98)">ARMOR</span>
              <div class="arrow-left orange" />
              <div class="arrow-right orange" />
            </div>
            <div class="selection-item">
              <span class="selection-text" style="color: rgb(255, 118, 118)">RIGHT HAND</span>
              <div class="arrow-left red" />
              <div class="arrow-right red" />
            </div>
            <div class="selection-item">
              <span class="selection-text" style="color: rgb(255, 118, 118)">LEFT HAND</span>
              <div class="arrow-left red" />
              <div class="arrow-right red" />
            </div>
          </div>
          <div class="inventory-container">
            <div class="inventory__left">
              <div id="item-list">
                <!-- <img src='@/assets/img/item_icons/art_armor_icon_13.png'> -->
                <!-- v-on:click="EquimpentItemSelected(item.id)" -->
                <EquipmentItem
                  class="grid-item"
                  :class="{ wrapper__highlight: selectedItem === item.id }"
                  v-for="item in ownedItems"
                  :name="item.name"
                  :img="item.img"
                  :key="item.id"
                  @click="onEquipmentClicked(item)"
                />
              </div>
            </div>
            <div class="inventory__right">
              <div class="item-name">{{ this.selectedItemName }}</div>
            </div>
          </div>
          <button v-on:click="buyNft()" class="buy-items">BUY MORE ITEMS</button>
        </div>
      </div>
      <div class="panel__right">
        <div class="stickfigure-background">
          <img src="../assets/img/stick_items/sboi.png" class="stickfigure" />
          <img
            src="../assets/img/stick_items/Stickyboi_Items_Helmet_Greathelm.png"
            style="z-index: 10"
            class="equipped-item"
          />
          <img src="../assets/img/stick_items/Stickyboi_Items_SR_PoleAxe.png" class="equipped-item" />
          <img src="../assets/img/stick_items/Stickyboi_Items_SL_ShieldHeater.png" class="equipped-item" />
          <img src="../assets/img/stick_items/Stickyboi_Items_Armor_Gambeson.png" class="equipped-item" />
        </div>
      </div>
    </div>
    <div v-if="!this.isUserLoggedIn()">
      <PleaseLogIn />
    </div>
  </div>
</template>

<script>
import * as R from 'ramda'
import { getNft } from '../utils/pylonsInteraction.js'
import { getItems } from '../utils/pylonsInteraction.js'
import EquipmentItem from '@/components/EquipmentItem.vue'
import PleaseLogIn from '../components/PleaseLogIn.vue'
import StickyboiItem from '@/components/EquipmentItem.vue'
import { StringKeyValue } from '@/store/generated/Pylons-tech/pylons/Pylonstech.pylons.pylons'

export default {
  name: 'Workshop',
  components: {
    PleaseLogIn,
    EquipmentItem,
    //StickyboiItem,
  },
  beforeCreate() {
    this.getNft = getNft.bind(this)
    this.getItems = getItems.bind(this)
  },
  data() {
    return {
      isLoggedIn: false,
      walletName: '',
      selectedItem: -1,
      selectedItemName: '',
      heroNft: {},
      dummyItems: [
        {
          name: 'Brigandine',
          img: 'img/item_icons/art_armor_icon_13.png',
          id: 0,
        },
        {
          name: 'Heater Shield',
          img: 'img/item_icons/weapon_icon_1_64.png',
          id: 1,
        },
        {
          name: 'Pole Axe',
          img: 'img/item_icons/weapon_icon_1_84.png',
          id: 2,
        },
        {
          name: 'Heater Shield',
          img: 'img/item_icons/weapon_icon_1_64.png',
          id: 3,
        },
      ],
      equippedItems: [{}],
      ownedItems: [],
    }
  },
  mounted() {
    console.log(this.$store)
    this.setLoginStatus()
    if (this.isLoggedIn) {
      this.init()
    }
  },
  computed: {},
  methods: {
    init() {
      this.$axios
        .post(
          'http://v2202008103543124756.megasrv.de:4500',
          {
            address: this.$store.getters['common/wallet/address'],
            coins: ['5000upylon'],
          },
          {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          },
        )
        .then((res) => {
          this.$store
            .dispatch('Pylonstech.pylons.pylons/MsgCreateAccount', {
              value: {
                '@type': '/Pylonstech.pylons.pylons.MsgCreateAccount',
                creator: this.$store.getters['common/wallet/address'],
                username: this.$store.getters['common/wallet/walletName'],
              },
            })
            .then((res) => {
              //console.log('after create account, yes')
              this.$store.dispatch('Pylonstech.pylons.pylons/sendMsgExecuteRecipe', {
                value: {
                  '@type': '/Pylonstech.pylons.pylons.MsgExecuteRecipe',
                  creator: this.$store.getters['common/wallet/address'],
                  cookbookID: 'nftarena',
                  recipeID: 'getcoins',
                  coinInputsIndex: '0',
                  itemIDs: [],
                  paymentInfos: [],
                },
              })
            })
        })

      this.getItems().then((res) => {
        this.ownedItems = R.reject((x) => x.ItemType === 'nft', res)
        console.log('items:', this.ownedItems)
      })
    },
    buyNft() {
      this.$store
        .dispatch('Pylonstech.pylons.pylons/sendMsgExecuteRecipe', {
          value: {
            '@type': '/Pylonstech.pylons.pylons.MsgExecuteRecipe',
            creator: this.$store.getters['common/wallet/address'],
            cookbookID: 'nftarena',
            recipeID: 'importnft',
            coinInputsIndex: '0',
            itemIDs: [],
            paymentInfos: [],
          },
        })
        .then((res) => {
          console.log(res)
        })
        .then(this.getNft)
        .then((res) => {
          console.log('nft:', res)
        })
    },
    onEquipmentClicked(item) {
      this.selectedItem = item.id
      this.selectedItemName = item.name
      console.log(this.selectedItem + ' clicked.')
    },
    isUserLoggedIn() {
      //console.log(this.$store)
      return this.$store.getters['common/wallet/loggedIn']
    },
    log() {
      console.log('store:', this.$store)
    },
    setLoginStatus() {
      this.walletName = this.$store.getters['common/wallet/walletName']
      console.log('walletname:', this.walletName)
      if (this.walletName != null) {
        this.isLoggedIn = true
      } else {
        this.isLoggedIn = false
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
.blue {
  filter: brightness(50%) sepia(1);
  //background: rgb(18, 209, 209);
}
.arrow-left {
  background-image: url('../assets/img/triangle.png');
  background-size: 80%;
  background-repeat: no-repeat;
  width: 21px;
  height: 21px;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
.arrow-right {
  margin-left: 20px;
  //background: rgb(18, 209, 209);
  background-image: url('../assets/img/triangle.png');
  background-size: 80%;
  background-repeat: no-repeat;
  width: 21px;
  height: 21px;
}
.buy-items {
  cursor: pointer;
  margin-top: 10px;
  background-color: black;
  color: white;
  font-size: 16px;
  border-width: 0px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 3px 2px;
  width: 50%;
}
.background {
  top: 0;
  font-family: $font-family;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(85.0000025331974, 5.000000176951289, 66.00000366568565, 1);
}
.wrapper__highlight {
  border: 0.5px solid rgba(0, 0, 0, 1);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
#item-list {
  padding: 5px;
  row-gap: 5px;
  column-gap: 5px;
  width: 190px;
  height: 190px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.inventory__left {
  width: 190px;
  background-color: rgb(255, 198, 98);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.inventory__right {
  padding: 15px;
  height: auto;
}
.item-name {
  font-size: 22px;
  color: white;
}
.inventory-container {
  display: flex;
  flex-direction: row;
  background-color: rgba(255, 198, 98, 0.3);
  width: 400px;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
}
.stickfigure-background {
  width: 450px;
  height: 450px;
  background-image: url('../assets/img/stick_items/sboiBG.png');
  display: grid;
}
.stickfigure {
  width: 100%;
  height: 100%;
  grid-column: 1;
  grid-row: 1;
  //background-image: url("../assets/img/stick_items/sboi.png");
}
.equipped-item {
  grid-column: 1;
  grid-row: 1;
  width: 100%;
  height: 100%;
}
.selection-wrapper {
  width: 100%;
  height: 30%;
  font-size: 21px;
  display: flex;
  font-family: $font-family;
  font-weight: bolder;
  padding: 30px 0;
  flex-direction: column;
  justify-content: space-evenly;
}
.selection-item {
  display: flex;
  flex-direction: row;
}
.selection-text {
  width: 210px;
}
// =====================================================

.button-wrapper {
  display: flex;
  flex-direction: row;
}
.nft-img-container {
  text-decoration: none;
  width: 400px;
  height: 400px;
  margin: 30px 0;
  background-color: rgba(255, 255, 255, 0.5);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.btn-g {
  display: inline-block;
  text-align: center;
  font-size: 18px;
  vertical-align: middle;
  line-height: 40px;
}
.to-arena {
  text-decoration: none;
  color: black;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 1);
  width: 230px;
  height: 46px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.save-hero {
  color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: rgba(0, 0, 0, 1);
  width: 190px;
  height: 46px;
  margin-right: 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.workshop-icon {
  display: inline;
  width: 40px;
  height: 40px;
  transform: translateY(7px);
  //background-image: url('../assets/img/settings.png');
}
.edit-icon {
  display: inline;
  width: 20px;
  height: 20px;
  transform: translateY(3px);
  margin-left: 5px;
}

.container {
  padding-top: 50px;
  display: flex;
  flex-direction: row;
  width: 85%;
  height: 100%;
}
.panel-wrapper {
  width: 50%;
  padding-right: 2%;
}
.panel__left {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.panel__right {
  width: 50%;
  padding-left: 2%;
}
.title {
  color: white;
  font-size: 40px;
  font-family: $font-family;
  padding-top: 35px;
  font-weight: bold;
}
.text--main {
  margin-top: 10px;
  font-size: 20px;
}
.text {
  font-family: Roboto;
  color: white;
}
</style>
