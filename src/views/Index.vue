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

<style scoped lang="scss">
// body {
//   background: linear-gradient(90deg, rgba(85, 5, 66, 1) 0%, rgba(176, 109, 84, 1) 50%, rgba(85, 5, 66, 1) 100%);
// }
// .sp-fill {
//   padding-top: 0;
// }
</style>
