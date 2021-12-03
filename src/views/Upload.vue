<template>
  <div class="background">
    <div v-if="!initialized">LOADING....</div>
    <div v-if="initialized" class="container">
      <form @submit.prevent="upload">
        <input v-model="nftname" class="e60_170" type="text" name="nftname" :placeholder="nftname" required />

        <input
          @change="onFileChange"
          class="e60_156"
          type="file"
          id="nftimg"
          name="image"
          accept="image/png, image/jpeg"
        />
        <img :src="nftimg" />
        <button class="e60_150" type="submit" v-on:click="setNftData()">UPLOAD</button>
        <!-- <button v-on:click="createNft()">create nft lul</button> -->
        <button v-on:click="printAllItems()">print all items</button>
        <button v-on:click="loadNft()">Load NFT</button>
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
      nftimg: '',
      heroNft: {},
      heroName: '',
      heroImg: '',
      initialized: true,
    }
  },
  mounted() {
    this.loadNft()
  },
  methods: {
    loadNft() {
      this.getNft().then((res) => {
        console.log('First res is: ')
        console.log(res)
        if (res === false) {
          this.createNft().then(() => {
            console.log('Created NFT: ')
            this.getNft().then((res) => {
              this.getNftData()
              this.initialized = true
              console.log('Final Result: ')
              console.log(res)
              console.log('Hero: ')
              console.log(this.heroNft)
            })
          })
        } else {
          console.log('Hero: ')
          console.log(this.heroNft)
        }
      })
    },
    getNft() {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch('Pylonstech.pylons.pylons/QueryListItemByOwner', {
            params: {
              '@type': 'Pylonstech.pylons.pylons/QueryListItemByOwner',
              owner: this.$store.getters['common/wallet/address'],
            },
          })
          .then((res) => {
            var BreakException = {}
            try {
              res.Items.forEach((item) => {
                item.strings.forEach((str) => {
                  if (str.Key === 'ItemType' && str.Value === 'nft') {
                    this.heroNft = item
                    throw BreakException
                  }
                })
              })
              resolve(false)
            } catch (e) {
              if (e !== BreakException) throw e
              resolve(true)
            }
          })
      })
    },
    printAllItems() {
      this.$store
        .dispatch('Pylonstech.pylons.pylons/QueryListItemByOwner', {
          params: {
            '@type': 'Pylonstech.pylons.pylons/QueryListItemByOwner',
            owner: this.$store.getters['common/wallet/address'],
          },
        })
        .then((res) => {
          console.log('All items: ')
          console.log(res.Items)
        })
    },
    createNft() {
      return new Promise((resolve, reject) => {
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
            resolve(res)
          })
      })
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files[0])
    },
    createImage(file) {
      //var nftimg = new Image();
      var reader = new FileReader()
      var vm = this

      reader.onload = (e) => {
        vm.nftimg = e.target.result
        this.nftimg = e.target.result
      }
      reader.readAsDataURL(file)

      console.log(file)
      //console.log(vm.nftimg)
    },
    setNftData() {
      console.log(this.heroNft.ID)
      console.log(this.nftname)
      this.$store
        .dispatch('Pylonstech.pylons.pylons/sendMsgSetItemString', {
          value: {
            '@type': '/Pylonstech.pylons.pylons.MsgSetItemString',
            creator: this.$store.getters['common/wallet/address'],
            cookbookID: 'nftarena',
            ID: this.heroNft.ID,
            field: 'name',
            value: this.nftname,
          },
        })
        .then((res) => {
          console.log('name updated')
          console.log(res)
          this.$store
            .dispatch('Pylonstech.pylons.pylons/sendMsgSetItemString', {
              value: {
                '@type': '/Pylonstech.pylons.pylons.MsgSetItemString',
                creator: this.$store.getters['common/wallet/address'],
                cookbookID: 'nftarena',
                ID: this.heroNft.ID,
                field: 'image',
                value: this.nftimg,
              },
            })
            .then((res) => {
              console.log('Img updated')
              console.log(res)
            })
        })
    },
    getNftData() {
      this.heroNft.mutableStrings.forEach((str) => {
        if (str.Key === 'name') {
          this.nftname = str.Value
        }
        if (str.Key === 'image') {
          this.nftimg = str.Value
        }
      })
    },

    setUserNft() {
      this.$store
        .dispatch('Pylonstech.pylons.pylons/QueryListItemByOwner', {
          params: {
            '@type': 'Pylonstech.pylons.pylons/QueryListItemByOwner',
            owner: this.$store.getters['common/wallet/address'],
          },
        })
        .then((res) => {
          console.log('All items: ')
          console.log(res.Items)
          var BreakException = {}
          try {
            res.Items.forEach((item) => {
              item.strings.forEach((str) => {
                if (str.Key === 'ItemType' && str.Value === 'nft') {
                  this.heroNft = item
                  //console.log(this.heroNft)
                  throw BreakException
                }
              })
            })
          } catch (e) {
            if (e !== BreakException) throw e
          }
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
