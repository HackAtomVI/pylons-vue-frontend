<template>
  <!--   v-class="{active: isClicked}" -->
  <div>
    <img :src="getSrc()" class="item-image" />
  </div>
</template>

<script>
//Weapons
import axe from '@/assets/img/stick_items/axe.png'
import sword from '../assets/img/stick_items/sword.png'
import greatsword from '../assets/img/stick_items/greatsword.png'

import gambeson from '../assets/img/stick_items/gambeson.png'
import chainmail from '../assets/img/stick_items/chainmail.png'
import brigandine from '../assets/img/stick_items/brigandine.png'
import platearmor from '../assets/img/stick_items/platearmor.png'
import paddedvest from '../assets/img/stick_items/paddedvest.png'

import roundShield from '../assets/img/stick_items/roundShield.png'
import kiteShield from '../assets/img/stick_items/kiteShield.png'
import heaterShield from '../assets/img/stick_items/heaterShield.png'
import towerShield from '../assets/img/stick_items/towerShield.png'

export default {
  name: 'StickyItem',
  props: {
    name: String,
    id: Number,
    type: String,
  },
  data() {
    return {
      itemType: this.type,
      itemName: this.name,
      imgs: {
        //Weapons
        Axe: axe,
        Sword: sword,
        GreatSword: greatsword,
        //Armor
        Chainmail: chainmail,
        Gambeson: gambeson,
        Brigandine: brigandine,
        PlateArmor: platearmor,
        PaddedVest: paddedvest,
        //Shields
        RoundShield: roundShield,
        KiteShield: kiteShield,
        HeaterShield: heaterShield,
        TowerShield: towerShield,
      },
    }
  },
  methods: {
    isShield() {
      if (this.itemType === 'shield') return true
    },
    getSrc() {
      //console.log(require('@/assets/' + this.imgs[this.itemName]))
      //console.log('name: ' + this.itemName + ' || img: ' + this.imgs[this.itemName])
      return this.imgs[this.itemName]
      //return require('@/assets/' + this.imgs[this.itemName]).default
    },
  },
}
</script>

<style scoped lang="scss">
@import '../scss/variables';

.wrapper {
}
.zclass {
  z-index: 9999;
}
.item-image {
  width: 100%;
  height: 100%;
}
</style>
