<template>
  <div class="background">
    <div class="container">
      <div class="title">Marketplace</div>
      <div class="description">Chose the item category</div>
      <div class="category-container">
        <div class="armor-wrapper">
          <button @click="craftArmor()">
            <div class="blackbox">
              <img class="blackbox-img" src="../assets/img/market/armor.png" />
              <div class="blackbox-description">CRAFT ARMOR ITEM</div>
            </div>
          </button>
          <div class="description" style="padding-top: 15px; text-align: center">
            Price: <br />
            25 token
          </div>
        </div>
        <div class="weapon-wrapper">
          <button @click="craftWeapon()">
            <div class="blackbox">
              <img class="blackbox-img" src="../assets/img/market/sword.png" />
              <div class="blackbox-description">CRAFT WEAPON ITEM</div>
            </div>
          </button>
          <div class="description" style="padding-top: 15px; text-align: center">
            Price: <br />
            25 token
          </div>
        </div>
        <div class="surprise-wrapper">
          <button @click="craftShield()">
            <div class="blackbox">
              <img class="blackbox-img" src="../assets/img/market/surprise.svg" />
              <div class="blackbox-description">CRAFT RANDOM ITEM</div>
            </div>
          </button>
          <div class="description" style="padding-top: 15px; text-align: center">
            Price: <br />
            20 token
          </div>
        </div>
      </div>
      <button @click="wtfisthis()">ENCHANT</button>
    </div>
  </div>
</template>

<script>
import { craftWeapon, craftArmor, craftShield } from '../utils/pylonsInteraction.js'

export default {
  name: 'Market',
  components: {},
  data() {
    return {}
  },
  methods: {
    wtfisthis() {
      this.$router.push({
        name: 'Enchant',
        params: { itemNew: true, id: '3WX6D7HQ81m' },
      })
    },
    craftWeapon() {
      this.notifyInfo('Weapon', 'craft it')
      craftWeapon
        .bind(this)()
        .then((res) => {
          console.log('craft result', res)
          this.notifySuccess('Very Nice', 'Weapon crafting successful!')
        })
        .catch((err) => {
          this.notifyFail('YOU FAIL', 'You are a fucking piece of shit' + err)
          console.error('YES SHIT, YOU DUN GOOFED:', err)
        })
    },
    craftArmor() {
      this.notifyInfo('Armor', 'craft it')
      craftArmor
        .bind(this)()
        .then((res) => {
          console.log('craft result', res)
          this.notifySuccess('Very Nice', 'Armor crafting successful!')
        })
        .catch((err) => {
          this.notifyFail('YOU FAIL', 'You are a fucking piece of shit' + err)
          console.error('YES SHIT, YOU DUN GOOFED:', err)
        })
    },
    craftShield() {
      this.notifyInfo('Shield', 'craft it')
      console.log(
        'CRAFT RANDOM ITEM, ARE YOU RETARDED? WE HAVE NO RANDOM ITEM, I WILL CRAFT A SHIELD NOW YOU FUCKING IDIOT',
      )
      craftShield
        .bind(this)()
        .then((res) => {
          console.log('craft result', res)
          this.notifySuccess('Very Nice', 'Shield crafting successful!')
        })
        .catch((err) => {
          this.notifyFail('YOU FAIL', 'You are a fucking piece of shit' + err)
          console.error('YES SHIT, YOU DUN GOOFED:', err)
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
</style>
