<template>
  <header>
    <div class="header-content-container">
      <router-link to="/" class="nav__logo">
        <img class="logo" alt="Crowd Control" src="../assets/logo.svg" />
      </router-link>

      <div class="header-text">
        <div class="header-item">Wallet / Tokens</div>
        <div class="header-item">Visit CC website</div>
        <SpWallet ref="wallet" v-on:dropdown-opened="$refs.menu.closeDropdown()" />
      </div>

      <router-link v-if="$store.getters.loggedIn" class="account-box" to="/me">
        <button>My Account ({{ getUserCredits }} Credits)</button>
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'PageHeader',
  computed: {
    getUserCredits() {
      return this.$store.getters.getUserCredits
    },
  },
  mounted() {
    //this.$cardChain.updateUserCredits()
  },
  methods: {},
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
.header-item {
  font-weight: bolder;
  padding-left: 12%;
  font-size: 20px;
  display: inline;
}
.logo {
  width: 12%;
}
.header-text {
  display: flex;
  flex-direction: row;
  float: right;
  padding-top: 2%;
  width: 60%;
}
.header-content-container {
  width: 100%;
  height: 15%;
  justify-content: middle;
}
.account-box {
  position: absolute;
  top: 0;
  right: 2rem;
}
</style>
