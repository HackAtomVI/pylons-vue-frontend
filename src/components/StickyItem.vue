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
  name: 'StickyItem',
  props: {
    name: String,
  },
  data() {
    return {
      itemName: this.name,
      imgs: {
        //Weapons
        axe: axe,
        sword: sword,
        greatSword: greatsword,
        //Armor
        chainmail: chainmail,
        gambeson: gambeson,
        brigandine: brigandine,
        plateArmor: platearmor,
        paddedVest: paddedvest,
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
      console.log('name: ' + this.itemName + ' || img: ' + this.imgs[this.itemName])
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

.item-image {
  width: 100%;
  height: 100%;
}
</style>
