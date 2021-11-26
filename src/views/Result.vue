<template>
  <div class="background">
    <div v-if="getIsClientWinner()" class="container">
      <div class="e90_141">
        <div class="result-text">MATCH RESULT</div>
      </div>
      <div class="e90_209">You WIN!</div>
      <div class="content-wrapper">
        <div class="nft-name nft-name__own" id="nftName">
          <span>PLACEHOLDER</span>
          <img src="../assets/img/winStar.png" class="star-img" />
        </div>
        <div class="nft-name nft-name__opponent" id="nftName">
          <img src="../assets/img/loseStar.png" class="star-img" />
          <span>PLACEHOLDER</span>
        </div>
        <br />
        <div class="player-container">
          <div class="hero-wrapper">
            <div class="stats_wrapper"></div>
            <div class="nft-img_wrapper" style="float: right"></div>
          </div>
          <div class="vs-text">VS</div>
          <div class="hero-wrapper">
            <div class="nft-img_wrapper" style="float: left"></div>
            <div class="stats_wrapper"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!getIsClientWinner()" class="container">
      <div class="e90_141">
        <div class="result-text">MATCH RESULT</div>
      </div>
      <div class="e90_209__red">YOU LOSE!</div>
      <div class="content-wrapper">
        <div class="nft-name nft-name__own" id="nftName">
          <span>PLACEHOLDER</span>
          <img src="../assets/img/loseStar.png" class="star-img" />
        </div>
        <div class="nft-name nft-name__opponent" id="nftName">
          <img src="../assets/img/winStar.png" class="star-img" />
          <span>PLACEHOLDER</span>
        </div>
        <br />
        <div class="player-container">
          <div class="hero-wrapper">
            <div class="stats_wrapper"></div>
            <div class="nft-img_wrapper" style="float: right"></div>
          </div>
          <div class="vs-text">VS</div>
          <div class="hero-wrapper">
            <div class="nft-img_wrapper" style="float: left"></div>
            <div class="stats_wrapper"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Result',
  components: {},
  data() {
    return {
      isClientWinner: false,
    }
  },
  methods: {
    getIsClientWinner() {
      console.log(this.$store.getters.getIsWinner)
      return this.$store.getters.getIsWinner
    },
  },
  mounted() {},
}
</script>
<style scoped lang="scss">
@import '../scss/variables';
.sp-fill {
  padding: 0;
}
.container {
  padding: 0;
  max-width: unset;
  margin: 0;
}
.content-wrapper {
  padding: 5% 7%;
}
.player-container {
  //margin:150px 0;
  padding-top: 150px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  //align-content: center;
}
.nft-img_wrapper {
  width: 250px;
  height: 250px;
  background-color: white;
  // height: 20%;
}
.hero-wrapper {
  display: flex;
  flex-direction: row;
  //background-color: rgba(255, 255, 255, 0.5);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.vs-text {
  font-size: 45px;
  color: black;
  margin: 90px auto;
  padding: 0 30px;
}
.nft-name__own {
  float: left;
}
.nft-name__opponent {
  float: right;
}
.nft-name {
  color: white;
  font-size: 25px;
  margin-bottom: 20px;
  font-weight: bolder;
}
.star-img {
  width: 50px;
  // height:70px;
}
.result-text {
  color: rgba(255, 255, 255, 1);
  font-family: Roboto;
  text-align: center;
  font-size: 45px;
  letter-spacing: 0;
  line-height: 100px;
}
.e90_209 {
  //YOU WIN
  padding-top: 20px;
  color: rgba(18.000000827014446, 209.00000274181366, 209.00000274181366, 1);
  font-family: Roboto;
  text-align: center;
  font-weight: bold;
  font-size: 75px;
  letter-spacing: 0;
}
.e90_209__red {
  // YOU LOSE
  padding-top: 20px;
  color: red;
  font-family: Roboto;
  text-align: center;
  font-weight: bold;
  font-size: 75px;
  letter-spacing: 0;
}
.e90_141 {
  //Local Header
  text-align: center;
  background-color: rgb(37, 37, 37);
  width: 100%;
  height: 100px;
}
.background {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  background-image: url('../assets/img/Background_Result.png');
}
</style>
