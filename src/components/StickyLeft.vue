<template>
  <!--   v-class="{active: isClicked}" -->
  <div>
    <img :src="getSrc()" class="item-image" :class="{ flip: this.flipImg() }" />
  </div>
</template>

<script>
//Weapons
import axe from '@/assets/img/stick_items/axe.png'
import sword from '../assets/img/stick_items/sword.png'
import greatsword from '../assets/img/stick_items/greatsword.png'
import dagger from '../assets/img/stick_items/dagger.png'
import flail from '../assets/img/stick_items/flail.png'
import maul from '../assets/img/stick_items/maul.png'
import mace from '../assets/img/stick_items/mace.png'
import poleaxe from '../assets/img/stick_items/poleaxe.png'
import spear from '../assets/img/stick_items/spear.png'

import bow from '../assets/img/stick_items/bow.png'
import crossbow from '../assets/img/stick_items/crossbow.png'
import javelin from '../assets/img/stick_items/javelin.png'

import roundShield from '../assets/img/stick_items/roundShield.png'
import kiteShield from '../assets/img/stick_items/kiteShield.png'
import heaterShield from '../assets/img/stick_items/heaterShield.png'
import towerShield from '../assets/img/stick_items/towerShield.png'

export default {
  name: 'StickyLeft',
  props: {
    name: String,
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
        Dagger: dagger,
        Flail: flail,
        Maul: maul,
        Mace: mace,
        PoleAxe: poleaxe,
        Spear: spear,

        Bow: bow,
        Crossbow: crossbow,
        Javelin: javelin,
        //Shields
        RoundShield: roundShield,
        KiteShield: kiteShield,
        HeaterShield: heaterShield,
        TowerShield: towerShield,
      },
    }
  },
  watch: {
    '$store.state.fighterEquipment.lefthand': function () {
      console.log('lefthand has changed:', this.$store.state.fighterEquipment.lefthand.name)
      this.itemName = this.$store.state.fighterEquipment.lefthand.name
    },
  },
  methods: {
    flipImg() {
      switch (this.itemName) {
        case 'Axe':
        case 'Sword':
        case 'Dagger':
        case 'Flail':
        case 'Mace':
        case 'Javelin':
          return true
      }
      return false
    },
    getSrc() {
      //console.log('name: ' + this.itemName + ' || img: ' + this.imgs[this.itemName])
      return this.imgs[this.itemName]
      //return require('@/assets/' + this.imgs[this.itemName]).default
    },
  },
}
</script>

<style scoped lang="scss">
@import '../scss/variables';

.zclass {
  z-index: 9999;
}
.flip {
  transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
}
.item-image {
  width: 100%;
  height: 100%;
}
</style>
