<template>
  <div class="background">
    <div class="container">
      <div class="title">Forge</div>
      <div class="description">Chose the item category</div>
      <div class="category-container">
        <div class="armor-wrapper">
          <div @click="craftArmor()" class="blackbox">
            <img class="blackbox-img" src="../assets/img/market/armor.png" />
            <div class="blackbox-description">CRAFT ARMOR ITEM</div>
          </div>
          <div class="description" style="padding-top: 15px; text-align: center">
            Price: <br />
            25 token
          </div>
        </div>
        <div class="weapon-wrapper">
          <div @click="craftWeapon()" class="blackbox">
            <img class="blackbox-img" src="../assets/img/market/sword.png" />
            <div class="blackbox-description">CRAFT WEAPON ITEM</div>
          </div>
          <div class="description" style="padding-top: 15px; text-align: center">
            Price: <br />
            25 token
          </div>
        </div>
        <div class="surprise-wrapper">
          <div @click="craftShield()" class="blackbox">
            <img class="blackbox-img" src="../assets/img/market/surprise.svg" />
            <div class="blackbox-description">CRAFT RANDOM ITEM</div>
          </div>
          <div class="description" style="padding-top: 15px; text-align: center">
            Price: <br />
            20 token
          </div>
        </div>
      </div>
      <router-link to="/workshop" class="my-hero-router">GO TO MY HERO PAGE</router-link>
    </div>
  </div>
</template>

<script>
import { craftWeapon, craftArmor, craftShield, getItems } from '../utils/pylonsInteraction.js'

export default {
  name: 'Market',
  components: {},
  data() {
    return {}
  },
  methods: {
    craftWeapon() {
      this.notifyInfo('Weapon', 'Crafting it \nPlease wait')
      craftWeapon
        .bind(this)()
        .then((res) => {
          console.log('craft result', res)
          this.notifySuccess('Very Nice', 'Weapon crafting successful!')
          //this.enchant()
        })
        .catch((err) => {
          this.notifyFail('YOU FAIL', 'You are a fucking piece of shit' + err)
          console.error('YES SHIT, YOU DUN GOOFED:', err)
        })
    },
    craftArmor() {
      this.notifyInfo('Armor', 'Crafting it \nPlease wait')
      craftArmor
        .bind(this)()
        .then((res) => {
          console.log('craft result', res)
          this.notifySuccess('Very Nice', 'Armor crafting successful!')
          //this.enchant()
        })
        .catch((err) => {
          this.notifyFail('YOU FAIL', 'You are a fucking piece of shit' + err)
          console.error('YES SHIT, YOU DUN GOOFED:', err)
        })
    },
    craftShield() {
      this.notifyInfo('Shield', 'Crafting it \nPlease wait')
      console.log(
        'CRAFT RANDOM ITEM, ARE YOU RETARDED? WE HAVE NO RANDOM ITEM, I WILL CRAFT A SHIELD NOW YOU FUCKING IDIOT',
      )
      craftShield
        .bind(this)()
        .then((res) => {
          console.log('craft result', res)
          this.notifySuccess('Very Nice', 'Shield crafting successful!')
          //this.enchant()
        })
        .catch((err) => {
          this.notifyFail('YOU FAIL', 'You are a fucking piece of shit' + err)
          console.error('YES SHIT, YOU DUN GOOFED:', err)
        })
    },
    enchant() {
      let craftedItem
      getItems
        .bind(this)()
        .then((res) => {
          craftedItem = res[res.length - 1]
          //console.log(craftedItem)
          this.$router.push({
            name: 'Enchant',
            params: { itemNew: true, id: craftedItem.ID },
          })
        })
    },
  },
}
</script>

<style scoped lang="scss">
@import '../scss/variables';
.sp-fill {
  padding-top: 0;
}
.title {
  font-size: 50px;
  color: white;
  padding: 20px 0;
}
.description {
  font-size: 25px;
  color: white;
}
.background {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $background-gradient;
}
.container {
  padding: 5% 12%;
  margin: 0 auto;
}
.category-container {
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.blackbox {
  text-align: center;
  width: 150px;
  height: 150px;
  padding: 10px;
  background-color: black;
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}
.blackbox-img {
  padding-top: 10px;
  width: 80px;
  height: 80px;
}
.blackbox-description {
  color: white;
  font-size: 15px;
  font-family: $font-family;
  font-weight: bolder;
  padding-top: 20px;
}
.my-hero-router {
  display: block;
  text-decoration: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  text-align: center;
  cursor: pointer;
  margin: 80px auto;
  background-color: black;
  color: white;
  font-size: 16px;
  border-width: 0px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 5px 4px;
  width: 30%;
}
</style>
