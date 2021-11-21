<template>
  <div>
    <div class="container">
      <a href="\workshop">HERE CLICK for workshop</a>
      <SpWelcome />
      <SpTokenSend :address="address" :refresh="true" />
      <SpTransferList :address="address" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  computed: {
    address() {
      return this.$store.getters['common/wallet/address']
    },
  },
}
</script>
