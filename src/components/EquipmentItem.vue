<template>
  <!--   v-class="{active: isClicked}" -->
  <div class="wrapper">
    <img :src="getSrc()" class="item-image" />
  </div>
</template>

<script>
//Weapons
import axe from '@/assets/img/item_icons/axe.png'
import sword from '../assets/img/item_icons/sword.png'
import greatsword from '../assets/img/item_icons/greatsword.png'

import gambeson from '../assets/img/item_icons/gambeson.png'
import chainmail from '../assets/img/item_icons/chainmail.png'
import brigandine from '../assets/img/item_icons/brigandine.png'
import platearmor from '../assets/img/item_icons/platearmor.png'
import paddedvest from '../assets/img/item_icons/paddedvest.png'

import roundShield from '../assets/img/item_icons/roundShield.png'
import kiteShield from '../assets/img/item_icons/kiteShield.png'
import heaterShield from '../assets/img/item_icons/heaterShield.png'
import towerShield from '../assets/img/item_icons/towerShield.png'

export default {
  name: 'EquipmentItem',
  props: {
    name: String,
    ID: String,
    type: String,
  },
  data() {
    return {
      itemName: this.name,
      itemID: this.ID,
      imgs: {
        //Weapons
        axe: axe,
        sword: sword,
        greatsword: greatsword,
        //Armor
        chainmail: chainmail,
        gambeson: gambeson,
        brigandine: brigandine,
        platearmor: platearmor,
        paddedvest: paddedvest,
        //Shields
        roundShield: roundShield,
        kiteShield: kiteShield,
        heaterShield: heaterShield,
        towerShield: towerShield,
      },
    }
  },
  methods: {
    getSrc() {
      //console.log(require('@/assets/' + this.imgs[this.itemName]))
      return this.imgs[this.itemName]
      //return require('@/assets/' + this.imgs[this.itemName]).default
    },
  },
}
</script>

<style scoped lang="scss">
@import '../scss/variables';

.wrapper {
  width: 55px;
  height: 55px;
  padding: 2px;
  background-color: rgba(255, 255, 255, 0.5);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.item-image {
  width: 100%;
  height: 100%;
}
</style>
