<template>
  <div class="background">
    <div class="container">
      <form @submit.prevent="upload">
        <input v-model="nftname" class="e60_170" type="text" name="nftname" placeholder="NFT Name" required />

        <input class="e60_156" type="file" id="nftimg" name="image" accept="image/png, image/jpeg" />

        <button class="e60_150" type="submit">UPLOAD</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Upload',
  components: {},
  data() {
    return {
      nftname: '',
    }
  },
  methods: {
    upload() {
      this.$store.commit('setNftName', this.nftname)
      console.log(this.$store.getters.getNftName)

      this.$store
        .dispatch('Pylonstech.pylons.pylons/sendMsgExecuteRecipe', {
          value: {
            '@type': '/Pylonstech.pylons.pylons.MsgExecuteRecipe',
            creator: this.$store.getters['common/wallet/address'],
            cookbookID: 'nftarena',
            recipeID: 'importnft',
            coinInputsIndex: '0',
            itemIDs: [],
            paymentInfos: [],
          },
        })
        .then((res) => {
          console.log('execute recipe res: ' + res)
          this.$store.dispatch('Pylonstech.pylons.pylons/MsgSetItemString', {
            value: {
              '@type': '/Pylonstech.pylons.pylons.MsgSetItemString',
              creator: this.$store.getters['common/wallet/address'],
              cookbookID: 'nftarena',
              ID: res,
              field: 'name',
              value: this.nftname,
            },
          })
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
.container {
  text-align: center;
  align-content: center;
  height: 100%;
  width: 80%;
  padding: 5% 7%;
  background-color: rgba(255, 198.00000339746475, 98.00000175833702, 1);
}
.e60_150 {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 1);
  width: 250px;
  height: 50px;
  border-width: 0px;
  font-size: 25px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.e60_170 {
  background-color: rgba(255, 255, 255, 1);
  margin: 0 auto;
  opacity: 0.5;
  font-size: 35px;
  color: black;
  padding: 5px;
  width: 675px;
  height: 50px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: block;
}
.e60_156::after {
  display: none;
}
.e60_156 * {
  display: none;
}
.e60_156 {
  display: block;
  margin: 50px auto;
  background-image: url('../assets/img/cross.png');
  background-size: 200px, 200px;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(255, 255, 255, 0.5);
  width: 400px;
  height: 400px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.background {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $background-gradient;
}
</style>
