<template>
  <!--   v-class="{active: isClicked}" -->
  <div class="wrapper">
    <img :src="getSrc()" class="item-image" />
  </div>
</template>

<script>
export default {
  name: 'EquipmentItem',
  props: {
    name: String,
    img: String,
    ID: String,
  },
  data() {
    return {
      itemName: this.name,
      imgUrl: this.img,
      itemID: this.ID,
      isClicked: false,
    }
  },
  methods: {
    getSrc() {
      return require('@/assets/' + this.imgUrl).default
    },
  },
}
</script>

<style scoped lang="scss">
@import '../scss/variables';

.wrapper {
  width: 55px;
  height: 55px;
  padding: 2px;
  background-color: rgba(255, 255, 255, 0.5);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.item-image {
  width: 100%;
  height: 100%;
}
</style>
