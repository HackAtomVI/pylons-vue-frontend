<template>
  <div v-if="initialized">
    <SpWallet ref="wallet" v-on:dropdown-opened="$refs.menu.closeDropdown()" />
    <SpLayout>
      <template v-slot:sidebar>
        <Sidebar />
      </template>
      <template v-slot:content>
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
import Sidebar from './components/Sidebar'

export default {
  components: {
    Sidebar,
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
      wsNode: 'ws://api.testnet.pylons.tech:26657/websocket',
      chainId: 'pylons',
      addrPrefix: 'pylo',
      sdkVersion: 'Stargate',
      getTXApi: 'http://localhost:26657/tx?hash=0x',
    }
    let pylonsserver = {
      apiNode: 'http://46.166.140.172:1317',
      rpcNode: 'http://46.166.140.172:26657',
      wsNode: 'ws://api.testnet.pylons.tech:26657/websocket',
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
    await this.$store.dispatch('common/env/init', shameserver)
    this.initialized = true
  },
  errorCaptured(err) {
    console.log(err)
    return false
  },
}
</script>
