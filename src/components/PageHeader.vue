<template>
  <header>
    <div class="header-content-container">
      <router-link to="/" class="nav__logo">
        <img class="logo" alt="Crowd Control" src="../assets/logo.svg" />
      </router-link>
      <!-- <div class="header-item">Wallet / Tokens</div>
      <div class="header-item">Visit CC website</div> -->
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
  color: $white;
  padding-left: 12%;
  font-size: 20px;
  display: inline;
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
