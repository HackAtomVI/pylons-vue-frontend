<template>
  <div v-if="isLoggedIn()" class="background">
    <div style="text-align: center" class="title" v-if="invalidItem">It seem's you haven't selected a valid item</div>
    <div v-else class="container">
      <div v-if="this.isNew" class="title">Congrats on your new item!</div>
      <div v-else class="title">Item overview</div>
      <div class="description">Enchant or equip your item!</div>
      <div class="item-container">
        <div class="item-container__left">
          <img class="item-img" :src="itemImg" />
        </div>
        <div class="item-container__right">
          <div>{{}}</div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="background">
    <PleaseLogIn />
  </div>
</template>

<script>
import PleaseLogIn from '../components/PleaseLogIn.vue'

export default {
  name: 'Enchant',
  props: {},
  components: {
    PleaseLogIn,
  },

  data() {
    return {
      itemID: -1,
      invalidItem: false,
      isNew: false,
      item: {},
    }
  },
  mounted() {
    this.logItem()
    if (this.itemID === 'undefined' || this.itemID === -1) {
      this.invalidItem = true
    }
  },
  methods: {
    isLoggedIn() {
      return this.$store.getters['common/wallet/loggedIn']
    },
    getItem() {},
    updateItem() {},
    logItem() {
      this.itemID = this.$route.params.id
      this.isNew = this.$route.params.itemNew
      console.log(this.itemID)
      console.log(this.isNew)
    },
  },
}
</script>

<style scoped lang="scss">
@import '../scss/variables';
.sp-fill {
  padding-top: 0;
}
.background {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $background-gradient;
}
.description {
  font-size: 25px;
  color: white;
}
.item-container__left {
  background-color: rgb(18, 209, 209);
}
.title {
  font-size: 50px;
  color: white;
  padding: 20px 0;
}
</style>
