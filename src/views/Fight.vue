<template>
  <div class="background">
    <div class="container">
      <div class="title">
        <img src="../assets/img/sword.png" class="sword-img" />
        FIGHT
      </div>
      <div class="container--top">
        <div class="nft-name" id="nftName">
          <span>PLACEHOLDER</span>
        </div>
        <div class="hero_wrapper">
          <div class="stats_wrapper"></div>
          <div class="nft-img_wrapper" style="float: right"></div>
        </div>
      </div>
      <div class="container--mid">
        <img src="../assets/img/vsStar.png" class="star-img" />
      </div>
      <div class="container--bot">
        <div class="nft-name" id="nftName">
          <span>PLACEHOLDER</span>
        </div>
        <div class="hero_wrapper">
          <div class="nft-img_wrapper" style="float: left"></div>
          <div class="stats_wrapper"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Fight',
  components: {},
  data() {
    return {}
  },
}
</script>

<style scoped lang="scss">
@import '../scss/variables';
.sp-fill {
  padding-top: 0;
}
.text {
  font-family: Roboto;
  color: white;
}
.nft-name {
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: bolder;
}
.stats_wrapper {
  width: 65%;
}
.nft-img_wrapper {
  width: 250px;
  height: 250px;
  background-color: white;
  // height: 20%;
}
.hero_wrapper {
  background-color: rgba(255, 255, 255, 0.5);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.star-img {
  width: 50px;
  height: 50px;
  display: inline;
}
.vs-text {
  display: inline;
}
.sword-img {
  //vertical-align: middle;
  width: 40px;
  height: 40px;
  //margin-left: 20px;
  //margin-bottom: 20px;
  display: inline;
}
.container {
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  height: 100%;
  max-width: unset;
  margin: 0;
}
.container--top {
  padding-left: 10%;
  //text-align: right;
  //padding: 5% 10%;
  height: 40%;
  width: 70%;
  float: left;
  display: block;
  //background-color: rgba(85.0000025331974, 5.000000176951289, 66.00000366568565, 1);
}
.container--mid {
  height: 10%;
  text-align: center;
  font-size: 30px;
  width: 10%;
  align-self: center;
  display: inline;
}
.container--bot {
  align-self: end;
  height: 40%;
  width: 70%;
  float: right;
  padding-right: 10%;
  //padding: 5% 10%;
  //background-color: rgba(255, 198.00000339746475, 98.00000175833702, 1);
}
.title {
  //margin-right: 5%;
  color: white;
  font-size: 40px;
  height: 10%;
  font-family: $font-family;
  padding-top: 35px;
  font-weight: bold;
}
.background {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  background: $background-gradient;
}
</style>
