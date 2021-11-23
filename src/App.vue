<template>
  <div v-if="initialized">
    <SpLayout>
      <template v-slot:header />
      <template v-slot:content>
        <PageHeader />
        <PageMenu />
        <SpWallet ref="wallet" v-on:dropdown-opened="$refs.menu.closeDropdown()" />
        <router-view />
      </template>
    </SpLayout>
  </div>
</template>

<style>
body {
  margin: 0;
}
</style>

<script>
import './scss/app.scss'
import '@starport/vue/lib/starport-vue.css'
//import Sidebar from './components/Sidebar'
import PageMenu from './components/PageMenu'
import PageHeader from './components/PageHeader'

export default {
  components: {
    //Sidebar,
    PageMenu,
    PageHeader,
  },
  data() {
    return {
      initialized: false,
    }
  },
  computed: {
    hasWallet() {
      return this.$store.hasModule(['common', 'wallet'])
    },
  },
  async created() {
    let local = {
      apiNode: 'http://localhost:1317',
      rpcNode: 'http://localhost:26657',
      wsNode: 'ws://localhost:26657/websocket',
      chainId: 'pylons',
      addrPrefix: 'pylo',
      sdkVersion: 'Stargate',
      getTXApi: 'http://localhost:26657/tx?hash=0x',
    }
    let pylonsserver = {
      apiNode: 'http://api.testnet.pylons.tech:1317',
      rpcNode: 'http://api.testnet.pylons.tech:26657',
      wsNode: 'ws://api.testnet.pylons.tech:26657/websocket',
      chainId: 'pylons',
      addrPrefix: 'pylo',
      sdkVersion: 'Stargate',
      getTXApi: 'http://api.testnet.pylons.tech:26657/tx?hash=0x',
    }
    let pylonsserver2 = {
      apiNode: 'http://46.166.140.172:1317',
      rpcNode: 'http://46.166.140.172:26657',
      wsNode: 'http://46.166.140.172:26657/websocket',
      chainId: 'pylons',
      addrPrefix: 'pylo',
      sdkVersion: 'Stargate',
      getTXApi: 'http://localhost:26657/tx?hash=0x',
    }
    let shameserver = {
      apiNode: 'http://v2202008103543124756.megasrv.de:1318',
      rpcNode: 'http://v2202008103543124756.megasrv.de:26659',
      wsNode: 'ws://v2202008103543124756.megasrv.de:26659/websocket',
      chainId: 'pylons',
      addrPrefix: 'pylo',
      sdkVersion: 'Stargate',
      getTXApi: 'http://v2202008103543124756.megasrv.de:26659/tx?hash=0x',
    }
    //await this.$store.dispatch('common/env/init', shameserver) //FIXME: THIS CAN LITERALLY BURN A CPU
    this.initialized = true
  },
  errorCaptured(err) {
    console.log(err)
    return false
  },
}
</script>
<style scoped lang="scss">
// body {
//   background: linear-gradient(90deg, rgba(85, 5, 66, 1) 0%, rgba(176, 109, 84, 1) 50%, rgba(85, 5, 66, 1) 100%);
// }
// .sp-fill {
//   padding-top: 0;
// }
</style>
