<template>
  <header>
    <div class="header-content-container">
      <router-link to="/" class="nav__logo">
        <img class="logo" alt="Crowd Control" src="../assets/logo.svg" />
      </router-link>
      <!-- <div class="header-item">Wallet / Tokens</div>
      <div class="header-item">Visit CC website</div> -->
      <!-- <router-link v-if="$store.getters.loggedIn" class="account-box" to="/me">
        <button>My Account ({{ getUserCredits }} Credits)</button>
      </router-link> -->
      <router-link v-if="!isLoggedIn" to="/login" class="login"> Login </router-link>
      <router-link v-if="isLoggedIn" to="/login" class="login">
        {{ walletName }}
      </router-link>
      <!-- <button v-if="getLoggedIn" v-on:click="addCoins()" class="get-coins">Get Coins!</button> -->
    </div>
  </header>
</template>

<script>
export default {
  name: 'PageHeader',
  data() {
    return {
      isLoggedIn: false,
      walletName: '',
    }
  },
  watch: {
    "$store.getters['common/wallet/walletName']": function () {
      this.getLoginStatus()
    },
  },

  computed: {
    getUserCredits() {
      return this.$store.getters.getUserCredits
    },
    getLoggedIn() {
      return this.$store.getters['common/wallet/loggedIn']
    },
  },
  methods: {
    testAxios() {
      //Content-Type:application/x-www-form-urlencoded
      //this.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

      this.$axios.post(
        'http://v2202008103543124756.megasrv.de:4500',
        {
          address: 'pylo10swe9z6qvuvfs2f7adhm74ecqfcnu645eamshv',
          coins: ['5000upylon'],
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
    },
    addCoins() {
      //this.$axios.defaults.headers.common['allowAccess'] = "Access-Control-Allow-Origin", "*"
      //console.log('Axios: ' + this.$axios)
      //TODO:
      // this.$axios.post('http://v2202008103543124756.megasrv.de:4500', {
      //   address: this.$store.getters['common/wallet/address'],
      //   coins: ['5000upylon'],
      // },
      // {
      //   headers: {
      //     'Content-Type':'application/x-www-form-urlencoded'
      //   }
      // }).then((res) => {
      //   //console.log("Res: " + JSON.stringify(res));
      // })
      // this.$store.dispatch('Pylonstech.pylons.pylons/MsgCreateAccount', {
      //     value: {
      //       '@type': '/Pylonstech.pylons.pylons.MsgCreateAccount',
      //       creator: this.$store.getters['common/wallet/address'],
      //       username: this.$store.getters['common/wallet/walletName'],
      //     },
      //   })
      //   .then((res) => {
      //     //console.log('after create account, yes')
      //     this.$store.dispatch('Pylonstech.pylons.pylons/sendMsgExecuteRecipe', {
      //       value: {
      //         '@type': '/Pylonstech.pylons.pylons.MsgExecuteRecipe',
      //         creator: this.$store.getters['common/wallet/address'],
      //         cookbookID: 'nftarena',
      //         recipeID: 'getcoins',
      //         coinInputsIndex: '0',
      //         itemIDs: [],
      //         paymentInfos: [],
      //       },
      //     })
      //   })
      // console.log('Balance: ' + this.$store.getters['cosmos.bank.v1beta1/getBalance'], 'pylo10swe9z6qvuvfs2f7adhm74ecqfcnu645eamshv')
    },

    getLoginStatus() {
      this.walletName = this.$store.getters['common/wallet/walletName']
      this.isLoggedIn = this.$store.getters['common/wallet/walletName'] != null ? true : false
      console.log(this.$store.getters['common/wallet/walletName'] + ' : ' + this.isLoggedIn)
    },
  },
}
</script>

<style scoped lang="scss">
@import '../scss/variables';

header {
  background-color: $header-gray;
  padding: 1% 5%;
  //text-align: center;
  height: 10%;
  //border-bottom: $border-thickness-bold solid $white;
}
.get-coins {
  text-decoration: none;
  color: black;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 1);
  width: 230px;
  height: 46px;
  margin-left: 100px;
  font-size: 35px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.header-item {
  font-weight: bolder;
  color: $white;
  padding-left: 12%;
  font-size: 20px;
  display: inline;
}
.login {
  position: absolute;
  right: 10%;
  text-align: center;
  line-height: 40px;
  text-decoration: none;
  color: black;
  font-size: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 1);
  width: 230px;
  height: 46px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  z-index: 100;
}
.nav__logo {
  height: 100%;
  width: 100%;
  display: contents;
}
.header-content-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: middle;
}
.account-box {
  position: absolute;
  top: 0;
  right: 2rem;
}
</style>
