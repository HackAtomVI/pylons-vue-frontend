<template>
  <div class="background">
    <div v-if="this.isUserLoggedIn()" class="container">
      <div class="top-panels">
        <div class="panel-wrapper">
          <div class="panel__left">
            <div class="selection-wrapper">
              <!-- helmet is commented out, because helmet will not be finished until end of hackathon -->
              <!-- <div class="selection-item"> 
              <span class="selection-text" style="color: rgb(18, 209, 209)">HELMET</span>
              <div class="arrow-left blue" />
              <div class="arrow-right blue" />
            </div> -->
              <div class="selection-item">
                <span class="selection-text" style="color: rgb(255, 198, 98)">ARMOR: </span>

                <div
                  v-if="typeof this.$store.getters['getFighterEquipment'].armor.name === 'undefined'"
                  class="selection-text selection-text__equiped"
                  style="color: gray"
                >
                  not equiped
                </div>
                <div
                  v-else
                  @click="this.enchantEquipped('armor')"
                  class="selection-text selection-text__equiped"
                  style="color: rgb(255, 198, 98)"
                >
                  {{ getEquipedItemDisplayName('armor') }}
                </div>
              </div>
              <div class="selection-item">
                <span class="selection-text" style="color: rgb(255, 118, 118)">RIGHT HAND:</span>

                <div
                  v-if="typeof this.$store.getters['getFighterEquipment'].righthand.name === 'undefined'"
                  class="selection-text selection-text__equiped"
                  style="color: gray"
                >
                  not equiped
                </div>
                <div
                  v-else
                  @click="this.enchantEquipped('right')"
                  class="selection-text selection-text__equiped"
                  style="color: rgb(255, 118, 118)"
                >
                  {{ getEquipedItemDisplayName('right') }}
                </div>
              </div>
              <div class="selection-item">
                <span class="selection-text" style="color: rgb(255, 118, 118)">LEFT HAND:</span>
                <div
                  v-if="typeof this.$store.getters['getFighterEquipment'].lefthand.name === 'undefined'"
                  class="selection-text selection-text__equiped"
                  style="color: gray"
                >
                  not equiped
                </div>
                <div
                  v-else
                  @click="this.enchantEquipped('left')"
                  class="selection-text selection-text__equiped"
                  style="color: rgb(255, 118, 118)"
                >
                  {{ getEquipedItemDisplayName('left') }}
                </div>
              </div>
            </div>
            <div class="inventory-container" style="">
              <div class="inventory__left">
                <div id="item-list">
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
                <div v-if="this.selectedItemName !== ''" class="item-name">
                  {{ this.selectedItemName }}
                  <img
                    v-if="this.selectedEnchantment !== 'none'"
                    class="enchant-icon"
                    src="../assets/img/market/enchant.png"
                  />
                </div>

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
                    <span class="stat-description">Damage: </span
                    >{{ Number.parseFloat(this.selectedDamage).toFixed(0) }}
                  </div>
                  <div class="item-stat">
                    <span class="stat-description">Accuracy:</span
                    >{{ Number.parseFloat(this.selectedAccuracy).toFixed(2) }}
                  </div>
                  <div class="item-stat">
                    <span v-if="this.selectedOneHanded == false" class="stat-description"> </span>
                    {{ this.selectedOneHanded == 'true' ? 'Wield: One-Handed' : 'Wield: Two-Handed' }}
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
                  v-on:click="equipItem()"
                  class="equip regular-button"
                  v-if="this.selectedItemName !== '' && singleButton() === true"
                >
                  Equip
                </button>
                <button
                  v-on:click="this.enchant()"
                  class="equip regular-button"
                  v-if="this.selectedItemName !== '' && singleButton() === true && this.selectedEnchantment === 'none'"
                >
                  Enchant
                </button>
              </div>
            </div>
            <div>
              <router-link to="/market" style="display: inline">
                <div
                  class="awesome-button smaller-button"
                  style="float: left; margin-top: 50px; height: 40px; padding: 10px; width: 180px"
                >
                  <span class="awesome-button-text" style="">BUY MORE ITEMS</span>
                </div>
              </router-link>
              <router-link to="/arena" style="display: inline">
                <div
                  class="awesome-button smaller-button"
                  style="float: left; margin-top: 50px; margin-left: 90px; height: 40px; padding: 10px; width: 180px"
                >
                  <span class="awesome-button-text" style="">GO TO ARENA</span>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div class="panel__right">
          <div class="stickfigure-background">
            <img src="../assets/img/stick_items/sboi.png" class="stickfigure shifted-down" />
            <StickyLeft
              v-if="!R.isEmpty(this.$store.getters['getFighterEquipment'].lefthand)"
              :name="this.$store.getters['getFighterEquipment'].lefthand.name"
              class="equipped-item shifted-down"
              style="z-index: 100"
            />
            <StickyRight
              v-if="!R.isEmpty(this.$store.getters['getFighterEquipment'].righthand)"
              :name="this.$store.getters['getFighterEquipment'].righthand.name"
              class="equipped-item shifted-down"
              style="z-index: 100"
            />
            <StickyArmor
              v-if="!R.isEmpty(this.$store.getters['getFighterEquipment'].armor)"
              :name="this.$store.getters['getFighterEquipment'].armor.name"
              class="equipped-item shifted-down"
            />
            <img
              v-if="!R.isEmpty(this.$store.getters['getFighterEquipment'].nft.image)"
              :src="this.$store.getters['getFighterEquipment'].nft.image"
              class="nft-image shifted-down"
              style="z-index: 9999"
            />
          </div>
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
import { getNft, getItems } from '../utils/pylonsInteraction.js'
import EquipmentItem from '@/components/EquipmentItem.vue'
import PleaseLogIn from '../components/PleaseLogIn.vue'
import StickyLeft from '@/components/StickyLeft.vue'
import StickyRight from '@/components/StickyRight.vue'
import StickyArmor from '@/components/StickyArmor.vue'

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
      equippedItems: [{}],
      ownedItems: [],
    }
  },
  mounted() {
    console.log(this.$store)
    if (this.isUserLoggedIn()) {
      this.init()
    } else this.notifyFail('Epic fail', "How could you have an NFT Hero, if you're not even logged in??")

    console.log('Fighter Equipment:', this.$store.getters['getFighterEquipment'])
  },
  computed: {},
  methods: {
    init() {
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
      this.queryMyNFT().then((res) => {
        console.log('res of mynft:', res)
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
    },
    singleButton() {
      return true
    },
    isUserLoggedIn() {
      return this.$store.getters['common/wallet/loggedIn']
    },
    equipItem() {
      let successfulEquip = true
      let equipment = this.$store.getters['getFighterEquipment']

      switch (this.selectedItemType) {
        case 'weapon': {
          if (this.selectedOneHanded === 'true') {
            if (R.isEmpty(equipment.righthand)) {
              this.$store.commit('setFighterRightHand', this.selectedItem)
            } else if (R.isEmpty(equipment.lefthand)) {
              if (equipment.lefthand.ID === this.selectedItem.ID || equipment.righthand.ID === this.selectedItem.ID) {
                this.notifyFail('Already worn', 'You are already wearing this item. ')
                successfulEquip = false
              } else {
                this.$store.commit('setFighterLeftHand', this.selectedItem)
                if (!R.isEmpty(equipment.righthand) && !equipment.righthand.oneHanded) {
                  this.$store.commit('setFighterRightHand', {})
                }
              }
            } else {
              if (this.selectedItem.ID === equipment.righthand.ID) {
                this.notifyFail('Already worn', 'You are already wearing this item. ')
                successfulEquip = false
              } else if (this.selectedItem.ID === equipment.lefthand.ID) {
                this.notifyFail('Already worn', 'You are already wearing this item. ')
                successfulEquip = false
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
          } else {
            // 2H Weapon case
            if (this.selectedItem.ID === equipment.righthand.ID) {
              this.notifyFail('Already worn', 'You are already wearing this item. ')
              successfulEquip = false
            } else {
              this.$store.commit('setFighterRightHand', this.selectedItem)
              this.$store.commit('setFighterLeftHand', {})
            }
            console.log('worn items:', this.$store.getters['getFighterEquipment'])
          }
          break
        }
        case 'armor': {
          if (this.selectedItem.ID === equipment.armor.ID) {
            this.notifyFail('Already worn', 'You are already wearing this item. ')
            successfulEquip = false
          }
          this.$store.commit('setFighterArmor', this.selectedItem)

          break
        }
        case 'shield': {
          if (this.selectedItem.ID === equipment.lefthand.ID) {
            this.notifyFail('Already worn', 'You are already wearing this item. ')
            successfulEquip = false
          } else if (!R.isEmpty(equipment.righthand) && equipment.righthand.oneHanded == 'false') {
            this.$store.commit('setFighterRightHand', {})
          }
          this.$store.commit('setFighterLeftHand', this.selectedItem)

          console.log('worn items:', this.$store.getters['getFighterEquipment'])
          break
        }
      }
      if (successfulEquip) this.notifySuccess('Very Nice', 'Item equiped!')
      console.log('Get Fighter equipment', this.$store.getters['getFighterEquipment'])
    },
    enchant() {
      console.log('selectedItem: ', this.selectedItem)
      if (this.selectedItem.Enchantment === 'none') {
        this.$router.push({
          name: 'Enchant',
          params: { itemNew: false, id: this.selectedItem.ID },
        })
      } else {
        this.notifyInfo('Already Enchanted', 'This item is already enchanted.')
      }
    },
    enchantEquipped(slot) {
      let equippedID
      switch (slot) {
        case 'left': {
          equippedID = this.$store.getters['getFighterEquipment'].lefthand.ID
          break
        }
        case 'right': {
          equippedID = this.$store.getters['getFighterEquipment'].righthand.ID
          break
        }
        case 'armor': {
          equippedID = this.$store.getters['getFighterEquipment'].armor.ID
          break
        }
      }
      if (typeof equippedID === 'undefined') {
        return
      }
      this.$router.push({
        name: 'Enchant',
        params: { itemNew: false, id: equippedID },
      })
    },

    getEquipedItemDisplayName(slot) {
      switch (slot) {
        case 'left': {
          return (
            this.$store.getters['getFighterEquipment'].lefthand.name.charAt(0).toUpperCase() +
            this.$store.getters['getFighterEquipment'].lefthand.name.slice(1)
          )
        }
        case 'right': {
          return (
            this.$store.getters['getFighterEquipment'].righthand.name.charAt(0).toUpperCase() +
            this.$store.getters['getFighterEquipment'].righthand.name.slice(1)
          )
        }
        case 'armor': {
          return (
            this.$store.getters['getFighterEquipment'].armor.name.charAt(0).toUpperCase() +
            this.$store.getters['getFighterEquipment'].armor.name.slice(1)
          )
        }
        default:
          return
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
  font-size: 12px;
  color: white;
  padding-left: 20px;
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
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
  width: 205px;
  height: 205px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.inventory__left {
  width: 200px;
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
  border-radius: 10px;
}

.inventory-container {
  display: flex;
  flex-direction: row;
  background-color: rgba(255, 198, 98, 0.3);
  width: 450px;
  border-radius: 10px;
  margin-top: 50px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
}
.stickfigure-background {
  width: 450px;
  height: 450px;
  background-image: url('../assets/img/stick_items/sboiBG.png');
  background-size: 100%;
  display: grid;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
}
.stickfigure {
  width: 100%;
  height: 100%;
  grid-column: 1;
  grid-row: 1;
}
.equipped-item {
  grid-column: 1;
  grid-row: 1;
  width: 100%;
  height: 100%;
}
.selection-wrapper {
  width: 100%;
  font-size: 21px;
  display: flex;
  font-family: $font-family;
  font-weight: bolder;
  flex-direction: column;
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
}
.edit-icon {
  display: inline;
  width: 20px;
  height: 20px;
  transform: translateY(3px);
  margin-left: 5px;
}

.container {
  padding-top: 110px;
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
.top-panels {
  display: flex;
  flex-direction: row;
  height: 70%;
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
.enchant-icon {
  width: 20px;
  height: 20px;
}
.item-name:hover {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.item-name {
  cursor: pointer;
  text-align: center;
  font-size: 21px;
  margin-bottom: 5px;
  color: white;
}
.nft-image {
  grid-column: 1;
  grid-row: 1;
  width: 30%;
  height: 30%;
  margin: 0px auto;
  z-index: 1;
}
.selection-text__equiped:hover {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.smaller-button {
  height: 90px;
}

.shifted-down {
  margin-top: 5%;
  border-width: 0px;
}
</style>
