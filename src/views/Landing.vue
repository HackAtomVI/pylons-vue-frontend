<template>
  <div class="background">
    <div class="container">
      <img class="logo" alt="Crowd Control" src="../assets/logo.svg" />
      <div class="title">The NFT Arena game</div>
      <button v-on:click="isStartClicked = !isStartClicked" type="button" class="get-started">GET STARTED NOW</button>
      <div v-if="isStartClicked" style="text-align: center">
        <SpWallet class="wallet" ref="wallet" v-on:dropdown-opened="$refs.menu.closeDropdown()" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      isStartClicked: true,
    }
  },
}
</script>

<style scoped lang="scss">
@import '../scss/variables';
.sp-fill {
  padding-top: 0;
}
.wallet {
  position: relative;
  text-align: center;
}
.sp-wallet-create {
  width: 100%;
}
.title {
  font-size: 50px;
  font-family: $font-family;
  padding-top: 35px;
  font-weight: bold;
}
.container {
  padding: 20px 10%;
  text-align: center;
}
.get-started {
  font-size: 30px;
  padding: 5px 15px;
  margin-top: 35px;
  border-radius: 4%;
  border-width: 0;
  box-shadow: 10px 10px 8px #242424;
  height: 10%;
}

.background {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $background-gradient;
}
</style>
