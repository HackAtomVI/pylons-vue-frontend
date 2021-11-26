<template>
  <div class="background">
    <div v-if="this.isUserLoggedIn()" class="container">
      <div class="panel--left">
        <div class="title text">
          Workshop
          <img src="../assets/img/settings.png" class="workshop-icon" />
        </div>
        <div class="text text--main">Customize your NFT hero!</div>
        <div class="text text--main" style="font-weight: bold" id="nftname">
          <span>PLACEHOLDER</span>
          <!--Show this if no nft name-->
          <img src="../assets/img/rename.png" class="edit-icon" />
        </div>

        <router-link to="/upload" class="nft-img-container">
          <div class=".centered-over-image">Upload</div>
        </router-link>

        <div class="button-wrapper">
          <div v-on:click="log()" class="save-hero btn-g">SAVE HERO</div>
          <router-link to="/arena" class="to-arena btn-g">
            <img src="../assets/img/sword.png" class="edit-icon" />
            TO ARENA
          </router-link>
        </div>
      </div>
      <div class="panel--right">
        <div class="stickfigure-background">
          <img src="../assets/img/stick.png" class="stickfigure" />
        </div>
      </div>
    </div>
    <div v-if="!this.isUserLoggedIn()">
      <PleaseLogIn />
    </div>
  </div>
</template>

<script>
import PleaseLogIn from '../components/PleaseLogIn.vue'

export default {
  name: 'Workshop',
  components: {
    PleaseLogIn,
  },
  data() {
    return {
      isLoggedIn: false,
      walletName: '',
    }
  },
  mounted() {
    this.setLoginStatus()
  },
  computed: {},
  methods: {
    isUserLoggedIn() {
      console.log(this.$store)
      return this.$store.getters['common/wallet/loggedIn']
    },
    log() {
      console.log(this.$store)
    },
    setLoginStatus() {
      this.walletName = this.$store.getters['common/wallet/walletName']
      console.log(this.walletName)
      if (this.walletName != null) {
        this.isLoggedIn = true
      } else {
        this.isLoggedIn = false
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import '../scss/variables';
.sp-fill {
  padding-top: 0;
}
.stickfigure {
  width: 500px;
  height: 500px;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.centered-over-image {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.button-wrapper {
  display: flex;
  flex-direction: row;
}
.nft-img-container {
  text-decoration: none;
  width: 400px;
  height: 400px;
  margin: 30px 0;
  background-color: rgba(255, 255, 255, 0.5);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.btn-g {
  display: inline-block;
  text-align: center;
  font-size: 18px;
  vertical-align: middle;
  line-height: 40px;
}
.to-arena {
  text-decoration: none;
  color: black;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 1);
  width: 230px;
  height: 46px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.save-hero {
  color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: rgba(0, 0, 0, 1);
  width: 190px;
  height: 46px;
  margin-right: 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.workshop-icon {
  display: inline;
  width: 40px;
  height: 40px;
  transform: translateY(7px);
  //background-image: url('../assets/img/settings.png');
}
.edit-icon {
  display: inline;
  width: 20px;
  height: 20px;
  transform: translateY(3px);
  margin-left: 5px;
}
.container {
  display: flex;
  flex-direction: row;
  width: 50%;
  height: 100%;
}
.continer > * {
  width: 50%;
}
.panel--left {
  display: flex;
  flex-direction: column;
}
.panel--right {
  padding-left: 20px;
}
.stickfigure-background {
  width: 500px;
  height: 100%;
  background-color: rgba(255, 198.00000339746475, 98.00000175833702, 1);
}
.stickfigure {
}
.title {
  color: white;
  font-size: 40px;
  font-family: $font-family;
  padding-top: 35px;
  font-weight: bold;
}
.text--main {
  margin-top: 10px;
  font-size: 20px;
}
.text {
  font-family: Roboto;
  color: white;
}
.background {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(85.0000025331974, 5.000000176951289, 66.00000366568565, 1);
}
</style>
