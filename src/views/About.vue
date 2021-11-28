<template>
  <div class="background">
    <div class="container">
      <div class="title">About Crowd Control</div>
      <div class="description">
        Crowd Control is a decentralized online trading card game made by players, built on Cosmos blockchain. The game
        is currently at pre-alpha stage.
        <br /><br />
        More info on <a href="https://crowdcontrol.network/#/" target="_blank" class="cc"> Crowd Control Website</a>.
        <br />
        Join our Discord server for updates.
      </div>

      <button class="e90_483">
        <picture style="color: black">
          <source type="image/webp" srcset="../assets/icon/discord.webp" />
          <source type="image/png" srcset="../assets/icon/discord.png" />
          <img
            src="../assets/icon/discord.png"
            style="display: inline; max-height: 40px; transform: translateY(4px); filter: invert(1)"
            alt="Image description"
          />
          JOIN US
        </picture>
      </button>
      <br /><br />
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  components: {},
  data() {
    return {}
  },
}
</script>

<style scoped lang="scss">
@import '../scss/variables';

.cc {
  font-size: 30px;
  color: rgb(160, 192, 240);
  margin-top: 20px;
}
.title {
  font-size: 50px;
  color: white;
  padding: 20px;
}
.description {
  font-size: 25px;
  color: white;
}
.background {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $background-gradient;
}
.container {
  padding: 20px 10%;
}
.e90_483 {
  cursor: pointer;
  margin-top: 20px;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.25);
  background-color: white;
  width: 300px;
  height: 85px;
  font-size: 40px;
  border-width: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
