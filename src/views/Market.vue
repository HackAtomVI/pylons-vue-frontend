<template>
  <div class="background">
    <div class="container">
      <div class="title">Marketplace</div>
      <div class="description">Chose the item category</div>
      <div class="category-container">
        <div class="armor-wrapper">
          <div class="blackbox" @click="craftArmor()">
            <img class="blackbox-img" src="../assets/img/market/armor.png" />
            <div class="blackbox-description">CRAFT ARMOR ITEM</div>
          </div>
          <div class="description" style="padding-top: 15px; text-align: center">
            Price: <br />
            25 token
          </div>
        </div>
        <div class="weapon-wrapper">
          <div class="blackbox">
            <img class="blackbox-img" src="../assets/img/market/sword.png" />
            <div class="blackbox-description">CRAFT WEAPON ITEM</div>
          </div>
          <div class="description" style="padding-top: 15px; text-align: center">
            Price: <br />
            25 token
          </div>
        </div>
        <div class="surprise-wrapper">
          <div class="blackbox">
            <img class="blackbox-img" src="../assets/img/market/surprise.svg" />
            <div class="blackbox-description">CRAFT RANDOM ITEM</div>
          </div>
          <div class="description" style="padding-top: 15px; text-align: center">
            Price: <br />
            20 token
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Market',
  components: {},
  data() {
    return {}
  },
  methods: {
    craftArmor() {
      this.$router.push({
        name: 'Enchant',
        params: { itemNew: true, id: 123 },
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
