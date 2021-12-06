<template>
  <div v-if="isLoggedIn()" class="background">
    <div style="text-align: center" class="title" v-if="invalidItem">It seem's you haven't selected a valid item</div>
    <div v-else class="container">
      <div v-if="!getIsNew()" class="title">Congrats on your new item!</div>
      <div v-if="getIsNew()" class="title">Item overview</div>
      <div class="description">Enchant or equip your item!</div>
      <div class="content-wrapper">
        <div class="item-container">
          <div class="item-container__left">
            <EquipmentItem v-if="isInitialized" :name="this.item.name" class="equipment-item" />
            <!-- <img class="item-img" :src="itemImg" /> -->
          </div>
          <div class="item-container__right">
            <div class="item-name">{{ this.itemName }}</div>
            <div class="item-stats-container" v-if="this.item.itemName !== '' && this.item.ItemType === 'weapon'">
              <div class="item-stat">
                <span class="stat-description">Enchantment: </span>{{ this.item.Enchantment }}
              </div>
              <div class="item-stat"><span class="stat-description">Damage Type: </span>{{ this.item.DamageType }}</div>
              <div class="item-stat">
                <span class="stat-description">Damage: </span>{{ Number.parseFloat(this.item.damage).toFixed(0) }}
              </div>
              <div class="item-stat">
                <span class="stat-description">Accuracy:</span>{{ Number.parseFloat(this.item.accuracy).toFixed(2) }}
              </div>
              <div class="item-stat"><span class="stat-description">One Handed:</span>{{ this.item.oneHanded }}</div>
            </div>

            <div class="item-stats-container" v-if="this.item.itemName !== '' && this.item.ItemType === 'armor'">
              <div class="item-stat">
                <span class="stat-description">Enchantment: </span> {{ this.item.Enchantment }}
              </div>
              <div class="item-stat">
                <span class="stat-description">Accuracy Modifier: </span>
                {{ Number.parseFloat(this.item.accuracyModifier).toFixed(2) }}
              </div>
              <div class="item-stat">
                <span class="stat-description">Initiative: </span
                >{{ Number.parseFloat(this.item.initiative).toFixed(0) }}
              </div>
              <div class="item-stat">
                <span class="stat-description">Blunt Res: </span>{{ Number.parseFloat(this.item.bluntDef).toFixed(0) }}
              </div>
              <div class="item-stat">
                <span class="stat-description">Arrow Res: </span>{{ Number.parseFloat(this.item.boltDef).toFixed(0) }}
              </div>
              <div class="item-stat">
                <span class="stat-description">Slice Res: </span>{{ Number.parseFloat(this.item.sliceDef).toFixed(0) }}
              </div>
              <div class="item-stat">
                <span class="stat-description">Stab Res: </span>{{ Number.parseFloat(this.item.stabDef).toFixed(0) }}
              </div>
            </div>

            <div class="item-stats-container" v-if="this.item.itemName !== '' && this.item.ItemType === 'shield'">
              <div class="item-stat">
                <span class="stat-description">Enchantment: </span> {{ this.item.Enchantment }}
              </div>
              <div class="item-stat">
                <span class="stat-description">Accuracy Modifier: </span>
                {{ Number.parseFloat(this.item.accuracyModifier).toFixed(2) }}
              </div>
              <div class="item-stat">
                <span class="stat-description">Blunt Res: </span>{{ Number.parseFloat(this.item.bluntDef).toFixed(0) }}
              </div>
              <div class="item-stat">
                <span class="stat-description">Arrow Res: </span>{{ Number.parseFloat(this.item.boltDef).toFixed(0) }}
              </div>
              <div class="item-stat">
                <span class="stat-description">Slice Res: </span>{{ Number.parseFloat(this.item.sliceDef).toFixed(0) }}
              </div>
              <div class="item-stat">
                <span class="stat-description">Stab Res: </span>{{ Number.parseFloat(this.item.stabDef).toFixed(0) }}
              </div>
            </div>
          </div>
        </div>
        <div class="enchant-container">
          <div class="enchant-container__left" style="text-align: center">
            <div @click="enchant()" class="enchant-button" :class="{ enchanted: this.isEnchanted }">
              <img class="enchant-img" src="../assets/img/market/enchant_black.png" />
              <div class="enchant-text">ENCHANT</div>
            </div>
            <button @click="this.equipItem()" class="equip">Equip to NFT</button>
          </div>

          <div v-if="!this.isEnchanted" class="enchant-description">Enchant your item for 15 Tokens.</div>
          <div v-if="this.isEnchanted" class="enchant-description">Item is enchanted</div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="background">
    <PleaseLogIn />
  </div>
</template>

<script>
import PleaseLogIn from '../components/PleaseLogIn.vue'
import EquipmentItem from '@/components/EquipmentItem.vue'
import { getItems, enchantItem } from '../utils/pylonsInteraction.js'
import * as R from 'ramda'

export default {
  name: 'Enchant',
  props: {},
  components: {
    PleaseLogIn,
    EquipmentItem,
  },

  data() {
    return {
      itemID: -1,
      invalidItem: false,
      isNew: false,
      isEnchanted: false,
      enchantmentTitle: '',
      item: {},
      itemName: '',
      isInitialized: false,
    }
  },
  beforeCreate() {
    this.getItems = getItems.bind(this)
    this.enchantItem = enchantItem.bind(this)
  },

  mounted() {
    if (this.isLoggedIn()) {
      this.logItem()
      this.getItem()

      if (this.itemID === 'undefined' || this.itemID === -1) {
        this.invalidItem = true
        this.notifyFail(
          'This item does not exist',
          'You tried to enchant an non existant item?,\n Go to the forge and get a real one!',
        )
      }
    } else this.notifyFail('Epic fail', "You can't enchant anything without loggin in...")
  },

  methods: {
    isLoggedIn() {
      return this.$store.getters['common/wallet/loggedIn']
    },
    getItem() {
      console.log(this.itemID)
      return this.getItems().then((res) => {
        this.item = R.find(R.propEq('ID', this.itemID), res)
        //console.log(this.item)

        if (this.item === 'undefined' || this.itemID === -1) {
          this.notifyFail(
            'This item does not exist',
            'You tried to enchant a non existant item?,\n Go to the forge and get a real one!',
          )
        } else {
          this.itemName = this.item.name.toUpperCase()
          this.isEnchanted = this.item.Enchantment === 'none' ? false : true
          if (this.isEnchanted) {
            this.enchantmentTitle = this.item.Enchantment
          }
          this.isInitialized = true
        }
      })
    },
    enchant() {
      if (this.isEnchanted) {
        this.notifyInfo('Nice Try', 'Item is already enchanted!')
        return
      } else {
        this.notifyInfo('Enchanting', 'Item is being enchanted, please wait :)')
      }
      this.enchantItem(this.item.ItemType, this.itemID)
        .then((res) => {
          console.log('enchantment finished: ', res)

          this.getItem().then(() => {
            this.notifySuccess('Very Nice', this.enchantmentTitle + ' Enchantment applied.')
          })
        })
        .catch((err) => {
          this.notifyFail('YOU FAIL', 'Enchantment Unsuccessful :(' + err)
          console.error('YES, YOU DUN GOOFED:', err)
        })
    },
    updateItem() {},
    getIsNew() {
      return this.isNew
    },
    logItem() {
      this.itemID = this.$route.params.id
      this.isNew = this.$route.params.itemNew
      //console.log("id: " + this.itemID + " || isNew: " + this.isNew)
      //console.log()
    },
    equipItem() {
      let equipment = this.$store.getters['getFighterEquipment']
      let successfulEquip = true
      switch (this.item.ItemType) {
        case 'weapon': {
          if (this.item.oneHanded === 'true') {
            console.log('equipping 1H')

            if (R.isEmpty(equipment.righthand)) {
              console.log('righthand empty')
              this.$store.commit('setFighterRightHand', this.item)
            } else if (R.isEmpty(equipment.lefthand)) {
              console.log('lefthand empty')
              if (equipment.lefthand.ID === this.item.ID || equipment.righthand.ID === this.item.ID) {
                successfulEquip = false
                this.notifyFail('Already worn', 'You already wear this item. Pick another one.')
              } else {
                this.$store.commit('setFighterLeftHand', this.item)
              }
            } else {
              console.log('no hand empty')
              if (this.item.ID === equipment.righthand.ID) {
                this.notifyFail('Already worn', 'You already wear this item in your right hand.')
                successfulEquip = false
              } else if (this.item.ID === equipment.lefthand.ID) {
                this.notifyFail('Already worn', 'You already wear this item in your left hand.')
                successfulEquip = false
              } else {
                if (this.equipRightHandNext) {
                  this.$store.commit('setFighterRightHand', this.item)
                  this.equipRightHandNext = false
                } else {
                  this.$store.commit('setFighterLeftHand', this.item)
                  this.equipRightHandNext = true
                }
              }
            }
          } else {
            // 2H Weapon case
            if (this.item.ID === equipment.righthand.ID) {
              this.notifyFail('Already worn', 'You already wear this item.')
              successfulEquip = false
            } else {
              console.log('equipping 2H')
              this.$store.commit('setFighterRightHand', this.item)
              this.$store.commit('setFighterLeftHand', {})
            }
          }
          break
        }
        case 'armor': {
          if (this.item.ID === equipment.armor.ID) {
            this.notifyFail('Already worn', 'You already wear this item.')
            successfulEquip = false
          }
          this.$store.commit('setFighterArmor', this.item)
          break
        }
        case 'shield': {
          console.log('right hand empty?', R.isEmpty(equipment.righthand))
          console.log('right hand onehanded?', equipment.righthand.oneHanded)
          if (this.item.ID === equipment.lefthand.ID) {
            this.notifyFail('Already worn', 'You already wear this shield.')
            successfulEquip = false
          } else if (!R.isEmpty(equipment.righthand) && equipment.righthand.oneHanded == 'false') {
            console.log('REMOVE 2H')
            this.$store.commit('setFighterRightHand', {})
          }
          this.$store.commit('setFighterLeftHand', this.item)

          break
        }
      }
      if (successfulEquip) this.notifySuccess('Very Nice', 'Item equiped!')
      console.log('vvvv=== Get Fighter equipment ===vvv')
      console.log(this.$store.getters['getFighterEquipment'])
    },
  },
}
</script>

<style scoped lang="scss">
@import '../scss/variables';
.sp-fill {
  padding-top: 0;
}
.background {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $background-gradient;
}
.description {
  font-size: 25px;
  color: white;
}
.enchant-description {
  font-size: 25px;
  color: white;
  padding-top: 30px;
  padding-left: 15px;
}
.item-container__left {
  background-color: rgb(18, 209, 209);
  width: 190px;
  height: 190px;
  border-radius: 10px;
}
.item-container__right {
  display: flex;
  flex-direction: column;
  padding: 15px;
  height: auto;
  width: 190px;
}
.item-name {
  text-align: center;
  font-size: 21px;
  margin-bottom: 5px;
  color: white;
  font-weight: bold;
}
.equip {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  text-align: center;
  cursor: pointer;
  margin: 15px auto;
  background-color: black;
  color: white;
  font-size: 16px;
  border-width: 0px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 3px 2px;
  width: 80%;
}
.equipment-item {
  padding: 50px;
  width: 190;
  height: 190px;
}
.content-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-content: flex-start;
  margin: 100px;
}
.enchant-img {
  width: 80px;
  height: 80px;
}
.enchant-button {
  cursor: pointer;
  padding: 20px;
  text-align: center;
  width: 150px;
  height: 150px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: white;
  border-radius: 10px;
}
.enchant-container {
  display: flex;
  flex-direction: row;
}
.enchant-text {
  font-size: 18px;
  margin-top: 10px;
}
.item-container {
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  background-color: rgba(255, 198, 98, 0.3);
  width: 400px;
  height: 190px;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
}
.item-stat {
  font-size: 12px;
}
.title {
  font-size: 50px;
  color: white;
  padding: 20px 0;
}
.enchanted {
  background-color: gray !important;
}
</style>
