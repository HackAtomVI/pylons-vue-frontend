<template>
  <div v-if="isLoggedIn()" class="background">
    <div style="text-align: center" class="title" v-if="invalidItem">It seem's you haven't selected a valid item</div>
    <div v-else class="container">
      <div v-if="this.isNew" class="title">Congrats on your new item!</div>
      <div v-else class="title">Item overview</div>
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
                <span class="stat-description">Enchantment: </span> {{ this.selectedEnchantment }}
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

            <div class="item-stats-container" v-if="this.selectedItemName !== '' && this.selectedItemType === 'shield'">
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
                <span class="stat-description">Stab Res: </span>{{ Number.parseFloat(this.selectedStabDef).toFixed(0) }}
              </div>
            </div>
          </div>
        </div>
        <div class="enchant-container">
          <div class="enchant-container__left" style="text-align: center">
            <div @click="enchant()" class="enchant-button">
              <img class="enchant-img" src="../assets/img/market/enchant_black.png" />
              <div class="enchant-text">ENCHANT</div>
            </div>
            <button @click="equip()" class="equip">Equip to NFT</button>
          </div>

          <div class="enchant-description">Enchant your item for 15 Tokens.</div>
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
import { getItems } from '../utils/pylonsInteraction.js'
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
      item: {},
      itemName: '',
      isInitialized: false,
    }
  },
  beforeCreate() {
    this.getItems = getItems.bind(this)
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
    }
  },

  methods: {
    isLoggedIn() {
      return this.$store.getters['common/wallet/loggedIn']
    },
    getItem() {
      console.log(this.itemID)
      this.getItems().then((res) => {
        this.item = R.find(R.propEq('ID', this.itemID), res)
        console.log(this.item)

        if (this.item === 'undefined' || this.itemID === -1) {
          this.notifyFail(
            'This item does not exist',
            'You tried to enchant an non existant item?,\n Go to the forge and get a real one!',
          )
        } else {
          this.itemName = this.item.name.toUpperCase()
          this.isInitialized = true
        }
      })
    },
    enchant() {},
    equip() {},
    updateItem() {},
    logItem() {
      this.itemID = this.$route.params.id
      this.isNew = this.$route.params.itemNew
      //console.log(this.itemID)
      //console.log(this.isNew)
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
  margin: 100px auto;
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
.title {
  font-size: 50px;
  color: white;
  padding: 20px 0;
}
</style>
