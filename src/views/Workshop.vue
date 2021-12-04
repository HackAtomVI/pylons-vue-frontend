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
            <!-- <div class="selection-item">
              <span class="selection-text" style="color: rgb(18, 209, 209)">HELMET</span>
              <div class="arrow-left blue" />
              <div class="arrow-right blue" />
            </div> -->
            <div class="selection-item">
              <span class="selection-text" style="color: rgb(255, 198, 98)">ARMOR</span>
              <!-- <div class="selection-text__equiped">{{this.$store.getEquipedItemNames.armor}}</div> -->
              <!-- <div class="arrow-left orange" />
              <div class="arrow-right orange" /> -->
            </div>
            <div class="selection-item">
              <span class="selection-text" style="color: rgb(255, 118, 118)">RIGHT HAND</span>
              <!-- <div class="selection-text__equiped">{{this.$store.getEquipedItemNames.RightHand}}</div> -->
              <!-- <div class="arrow-left red" />
              <div class="arrow-right red" /> -->
            </div>
            <div class="selection-item">
              <span class="selection-text" style="color: rgb(255, 118, 118)">LEFT HAND</span>
              <!-- <div class="selection-text__equiped">{{this.$store.getEquipedItemNames.LeftHand}}</div> -->
              <!-- <div class="arrow-left red" />
              <div class="arrow-right red" /> -->
            </div>
          </div>
          <div class="inventory-container">
            <div class="inventory__left">
              <div id="item-list">
                <!-- <img src='@/assets/img/item_icons/art_armor_icon_13.png'> -->
                <!-- v-on:click="EquimpentItemSelected(item.id)" -->

                <EquipmentItem
                  class="grid-item"
                  v-for="(item, index) in ownedItems"
                  :class="{ wrapper__highlight: selectedItemIndex === index }"
                  :name="item.name"
                  :item="item.ItemType"
                  :key="item.id"
                  @click="onEquipmentClicked(item, index)"
                />
              </div>
            </div>
            <div class="inventory__right">
              <div class="item-name">{{ this.selectedItemName }}</div>

              <div
                class="item-stats-container"
                v-if="this.selectedItemName !== '' && this.selectedItemType === 'weapon'"
              >
                <div class="item-stat">
                  <span class="stat-description">Enchantment: </span>{{ this.selectedEnchantment }}
                </div>
                <div class="item-stat">
                  <span class="stat-description">Damage Type: </span>{{ this.selectedDamageType }}
                </div>
                <div class="item-stat">
                  <span class="stat-description">Damage: </span>{{ Number.parseFloat(this.selectedDamage).toFixed(0) }}
                </div>
                <div class="item-stat">
                  <span class="stat-description">Accuracy:</span
                  >{{ Number.parseFloat(this.selectedAccuracy).toFixed(2) }}
                </div>
                <div class="item-stat">
                  <span class="stat-description">One Handed:</span>{{ this.selectedOneHanded }}
                </div>
              </div>

              <div
                class="item-stats-container"
                v-if="this.selectedItemName !== '' && this.selectedItemType === 'armor'"
              >
                <div class="item-stat">
                  <span class="stat-description">Enchantment: </span> {{ this.selectedEnchantment }}
                </div>
                <div class="item-stat">
                  <span class="stat-description">Accuracy Modifier: </span>
                  {{ Number.parseFloat(this.selectedAccuracyMod).toFixed(2) }}
                </div>
                <div class="item-stat">
                  <span class="stat-description">Initiative: </span
                  >{{ Number.parseFloat(this.selectedInitiative).toFixed(0) }}
                </div>
                <div class="item-stat">
                  <span class="stat-description">Blunt Res: </span
                  >{{ Number.parseFloat(this.selectedBluntRes).toFixed(0) }}
                </div>
                <div class="item-stat">
                  <span class="stat-description">Arrow Res: </span
                  >{{ Number.parseFloat(this.selectedArrowDef).toFixed(0) }}
                </div>
                <div class="item-stat">
                  <span class="stat-description">Slice Res: </span
                  >{{ Number.parseFloat(this.selectedSliceDef).toFixed(0) }}
                </div>
                <div class="item-stat">
                  <span class="stat-description">Stab Res: </span
                  >{{ Number.parseFloat(this.selectedStabDef).toFixed(0) }}
                </div>
              </div>

              <div
                class="item-stats-container"
                v-if="this.selectedItemName !== '' && this.selectedItemType === 'shield'"
              >
                <div class="item-stat">
                  <span class="stat-description">Enchantment: </span> {{ this.selectedEnchantment }}
                </div>
                <div class="item-stat">
                  <span class="stat-description">Accuracy Modifier: </span>
                  {{ Number.parseFloat(this.selectedAccuracyMod).toFixed(2) }}
                </div>
                <div class="item-stat">
                  <span class="stat-description">Blunt Res: </span
                  >{{ Number.parseFloat(this.selectedBluntRes).toFixed(0) }}
                </div>
                <div class="item-stat">
                  <span class="stat-description">Arrow Res: </span
                  >{{ Number.parseFloat(this.selectedArrowDef).toFixed(0) }}
                </div>
                <div class="item-stat">
                  <span class="stat-description">Slice Res: </span
                  >{{ Number.parseFloat(this.selectedSliceDef).toFixed(0) }}
                </div>
                <div class="item-stat">
                  <span class="stat-description">Stab Res: </span
                  >{{ Number.parseFloat(this.selectedStabDef).toFixed(0) }}
                </div>
              </div>
              <button
                v-on:click="equipItem('')"
                class="equip"
                v-if="this.selectedItemName !== '' && singleButton() === true"
              >
                Equip
              </button>
              <button
                v-on:click="equipItem('right')"
                class="equip"
                v-if="this.selectedItemName !== '' && singleButton() === false"
              >
                Right
              </button>
              <button
                v-on:click="equipItem('left')"
                class="equip"
                v-if="this.selectedItemName !== '' && singleButton() === false"
              >
                Left
              </button>
            </div>
          </div>
          <router-link to="/market" class="buy-items">BUY MORE ITEMS</router-link>
        </div>
      </div>
      <div class="panel__right">
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
          <StickyArmor :name="this.$store.getters['getFighterEquipment'].armor.name" class="equipped-item" />
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
import StickyLeft from '@/components/StickyLeft.vue'
import StickyRight from '@/components/StickyRight.vue'
import StickyArmor from '@/components/StickyArmor.vue'

import { StringKeyValue } from '@/store/generated/Pylons-tech/pylons/Pylonstech.pylons.pylons'

export default {
  name: 'Workshop',
  components: {
    PleaseLogIn,
    EquipmentItem,
    StickyLeft,
    StickyRight,
    StickyArmor,
  },
  beforeCreate() {
    this.getNft = getNft.bind(this)
    this.getItems = getItems.bind(this)
  },
  data() {
    return {
      isLoggedIn: false,
      componentKey: 0,
      walletName: '',
      selectedItem: {},
      selectedItemIndex: -1,
      selectedItemName: '',
      selectedEnchantment: '',
      //Weapon specific
      selectedDamageType: '',
      selectedAccuracy: '',
      selectedDamage: '',
      selectedOneHanded: '',
      //armor specific
      selectedBluntRes: '',
      selectedAccuracyMod: '',
      selectedArrowDef: '',
      selectedInitiative: '',
      selectedSliceDef: '',
      selectedStabDef: '',

      equipRightHandNext: true,
      equipedItemNames: [],
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
    this.updateEquipedItemNames()
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
        console.log('owned items:', this.ownedItems)

        if (this.ownedItems.length === 0) {
          this.notifyFail(
            'No Items owned',
            "You don't have any equipment,\n do you want to stay naked your whole life?\n Go to the Forge and craft some.",
          )
        }
      })
    },
    onEquipmentClicked(item, index) {
      this.selectedItem = item
      this.selectedItemIndex = index
      this.selectedItemID = item.ID
      this.selectedItemType = item.ItemType
      this.selectedEnchantment = item.Enchantment

      if (this.selectedItemType === 'weapon') {
        this.selectedDamageType = item.DamageType
        this.selectedDamage = item.damage
        this.selectedOneHanded = item.oneHanded
        this.selectedAccuracy = item.accuracy
      } else if (this.selectedItemType === 'armor' || this.selectedItemType === 'shield') {
        this.selectedBluntRes = item.bluntDef
        this.selectedAccuracyMod = item.accuracyModifier
        this.selectedArrowDef = item.boltDef
        this.selectedSliceDef = item.sliceDef
        this.selectedStabDef = item.stabDef
        if (this.selectedItemType === 'armor') {
          this.selectedInitiative = item.initiative
        }
      }

      let name = item.name
      this.selectedItemName = name.charAt(0).toUpperCase() + name.slice(1)
      //console.log(this.singleButton())
    },
    singleButton() {
      return true //While Equipment is limited to being equiped in specific hand
      // if (
      //   (this.selectedOneHanded === 'true' || this.selectedItemType === 'shield') &&
      //   this.selectedItemType !== 'armor'
      // ) {
      //   return false
      // } else return true
    },
    isUserLoggedIn() {
      //console.log(this.$store)
      return this.$store.getters['common/wallet/loggedIn']
    },
    equipItem(hand) {
      let equipment = this.$store.getters['getFighterEquipment']

      switch (this.selectedItemType) {
        case 'weapon': {
          if (this.selectedOneHanded === 'true') {
            console.log('equipping 1H')

            if (R.isEmpty(equipment.righthand)) {
              console.log('righthand empty')
              this.$store.commit('setFighterRightHand', this.selectedItem)
            } else if (R.isEmpty(equipment.lefthand)) {
              console.log('lefthand empty')
              if (equipment.lefthand.ID === this.selectedItem.ID || equipment.righthand.ID === this.selectedItem.ID) {
                this.notifyFail('Already worn', 'You already wear this item. Pick another one.')
              } else {
                this.$store.commit('setFighterLeftHand', this.selectedItem)
              }
            } else {
              console.log('no hand empty')
              if (this.selectedItem.ID === equipment.righthand.ID) {
                this.notifyFail('Already worn', 'You already wear this item in your right hand.')
              } else if (this.selectedItem.ID === equipment.lefthand.ID) {
                this.notifyFail('Already worn', 'You already wear this item in your left hand.')
              } else {
                if (this.equipRightHandNext) {
                  this.$store.commit('setFighterRightHand', this.selectedItem)
                  this.equipRightHandNext = false
                } else {
                  this.$store.commit('setFighterLeftHand', this.selectedItem)
                  this.equipRightHandNext = true
                }
              }
            }

            // when do we need this here?
            this.$store.commit('setEquipmentNameRightHand', this.selectedItemName)
          } else {
            // 2H Weapon case
            if (this.selectedItem.ID === equipment.righthand.ID) {
              this.notifyFail('Already worn', 'You already wear this item.')
            } else {
              console.log('equipping 2H')
              this.$store.commit('setFighterRightHand', this.selectedItem)
              this.$store.commit('setFighterLeftHand', {})

              // this should be removed
              this.$store.commit('setEquipmentNameRightHand', this.selectedItemName)
              this.$store.commit('setEquipmentNameLeftHand', '')
            }

            console.log('worn items:', this.$store.getters['getFighterEquipment'])
          }
          break
        }
        case 'armor': {
          if (this.selectedItem.ID === equipment.armor.ID) {
            this.notifyFail('Already worn', 'You already wear this item.')
          }
          this.$store.commit('setFighterArmor', this.selectedItem)

          // should be removed
          this.$store.commit('setEquipmentNameArmor', this.selectedItemName)
          break
        }
        case 'shield': {
          console.log('right hand empty?', R.isEmpty(equipment.righthand))
          console.log('right hand onehanded?', equipment.righthand.oneHanded)
          if (this.selectedItem.ID === equipment.lefthand.ID) {
            this.notifyFail('Already worn', 'You already wear this shield.')
          } else if (!R.isEmpty(equipment.righthand) && equipment.righthand.oneHanded == 'false') {
            console.log('REMOVE 2H')
            this.$store.commit('setFighterRightHand', {})
          }

          this.$store.commit('setFighterLeftHand', this.selectedItem)

          console.log('worn items:', this.$store.getters['getFighterEquipment'])

          break
        }
      }
      this.updateEquipedItemNames()
      console.log('vvvv=== Get Fighter equipment ===vvv')
      console.log(this.$store.getters['getFighterEquipment'])
    },
    updateEquipedItemNames() {
      // console.log(this.$store.getters['getEquipedItemNames'])
      this.equipedItemNames = []
      this.equipedItemNames = Object.values(this.$store.getters['getEquipedItemNames'])
      this.equipedItemNames.reverse()
      console.log('Equiped item names: ' + this.equipedItemNames)
      this.$forceUpdate()
      this.componentKey += 1
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
.item-stats-container {
  font-size: 11px;
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
.equip {
  align-self: center;
  justify-self: end;
  text-align: center;
  cursor: pointer;
  margin-top: 5px;
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
.buy-items {
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  margin-top: 20px;
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
  overflow-y: auto;
  padding: 5px;
  row-gap: 3px;
  column-gap: 3px;
  width: 197px;
  height: 197px;
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
  display: flex;
  flex-direction: column;
  padding: 15px;
  height: auto;
  width: 100%;
}
.item-name {
  text-align: center;
  font-size: 21px;
  margin-bottom: 5px;
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
.grid-item {
  width: 55px;
  height: 55px;
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
