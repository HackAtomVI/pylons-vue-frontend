<template>
  <div class="background">
    <div v-if="isLoggedIn()" class="container">
      <div class="container--top">
        <div class="title" style="text-align: right">Arena</div>
        <div class="description">Enter into battle with your NFT Hero!</div>
      </div>
      <div class="container--bot">
        <div class="nft-name" id="nftName">
          <span>Fighter {{ fighterName }}</span>
        </div>
        <div class="hero_wrapper" style="height: 250px">
          <div class="nft-img_wrapper">
            <div class="stickfigure-background" style="height: 250px">
              <img src="../assets/img/stick_items/sboi.png" class="stickfigure shifted-down" />
              <StickyLeft
                v-if="exists(this.$store.getters['getFighterEquipment'].lefthand.name)"
                :name="this.$store.getters['getFighterEquipment'].lefthand.name"
                class="equipped-item shifted-down"
                style="z-index: 100"
              />
              <StickyRight
                v-if="exists(this.$store.getters['getFighterEquipment'].righthand.name)"
                :name="this.$store.getters['getFighterEquipment'].righthand.name"
                class="equipped-item shifted-down"
                style="z-index: 100"
              />
              <StickyArmor
                v-if="exists(this.$store.getters['getFighterEquipment'].armor.name)"
                :name="this.$store.getters['getFighterEquipment'].armor.name"
                class="equipped-item shifted-down"
                style="z-index: 10"
              />
              <img :src="nftImg" class="nft-image shifted-down" style="z-index: 9999" />
            </div>
          </div>
          <div class="stats_wrapper">
            <div class="stats-column">
              <div class="stat-text"><span style="font-weight: bold">WINS:</span> {{ this.getWins() }}</div>
              <div class="stat-text"><span style="font-weight: bold">LOSSES:</span> {{ this.getLosses() }}</div>
              <div class="stat-text">
                <span style="font-weight: bold">W/L ratio:</span>
                {{ Number.parseFloat(this.getWinLossRatio()).toFixed(2) }}
              </div>
            </div>
          </div>
          <div @click="enlistForArena()" class="fight-button">
            <img src="../assets/img/sword.png" class="sword-img" />
            <span class="fight-text">FIGHT!</span>
          </div>
        </div>
      </div>
      <div class="footer-container">
        <!-- <div class="title" style="margin-top: 60px;text-align:left; display:inline;">Queued Battle</div> -->
        <div
          class="awesome-button smaller-button"
          v-if="!this.fightFinished && this.fightQueued"
          @click="checkFightResult(this.fighterID)"
          style="
            cursor: pointer;
            background-color: rgba(255, 255, 255, 0.8);
            height: 40px;
            margin: 15px auto;
            padding: 10px;
            width: 400px;
          "
        >
          <span class="awesome-button-text" style="color: black">CLICK TO CHECK BATTLE RESULT!</span>
        </div>
        <div class="queue-container">
          <div v-if="this.fightQueued || this.keepLog" class="fight-box">
            <div v-if="this.fightFinished" class="hero_wrapper" style="widht: auto; height: 100%; margin: 10px">
              <div class="nft-img_wrapper" style="height: 100% !important">
                <div class="stickfigure-background" style="width: 126px; height: 126px">
                  <img
                    src="../assets/img/stick_items/sboi.png"
                    class="stickfigure shifted-down"
                    style="width: 126px; height: 126px"
                  />
                  <StickyLeft
                    v-if="exists(this.opponentEquipment.lefthand.name)"
                    :name="this.opponentEquipment.lefthand.name"
                    class="equipped-item shifted-down"
                    style="z-index: 100"
                  />
                  <StickyRight
                    v-if="exists(this.opponentEquipment.righthand.name)"
                    :name="this.opponentEquipment.righthand.name"
                    class="equipped-item shifted-down"
                    style="z-index: 100"
                  />
                  <StickyArmor
                    v-if="exists(this.opponentEquipment.armor.name)"
                    :name="this.opponentEquipment.armor.name"
                    class="equipped-item shifted-down"
                    style="z-index: 10"
                  />
                  <img
                    v-if="exists(this.opponentEquipment.nft.image)"
                    :src="this.opponentEquipment.nft.image"
                    class="nft-image shifted-down"
                    style="z-index: 9999"
                  />
                </div>
              </div>
              <div class="stats_wrapper__small">
                <div class="stats-column" style="padding-top: 5px !important">
                  <div class="stat-text__small">
                    <span v-if="this.isWinner" style="font-weight: bold; color: green"
                      >{{ fighterName }} beat this fighter!</span
                    >
                    <span v-else style="font-weight: bold; color: red">{{ fighterName }} lost to this fighter!</span>
                  </div>
                  <div class="stat-text__small">
                    <span style="font-weight: bold">NAME:</span> {{ this.opponentEquipment.nft.name }}
                  </div>
                </div>
              </div>
              <div class="stats-column" style="padding-top: 5px !important; width: 100%">
                <div class="stat-text__small">
                  <span style="font-weight: bold">WINS:</span>
                  {{ Number.parseFloat(this.opponentEquipment.nft.wins).toFixed(0) }}
                </div>
                <div class="stat-text__small">
                  <span style="font-weight: bold">LOSSES:</span>
                  {{ Number.parseFloat(this.opponentEquipment.nft.losses).toFixed(0) }}
                </div>
              </div>
            </div>
          </div>
          <div v-if="this.fightFinished" class="battle-log">
            <div class="battle-log-text">
              <div v-for="(line, index) in this.getBattleLog()" :key="'log' + index">
                {{ line }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PleaseLogIn v-else />
  </div>
</template>

<script>
import * as R from 'ramda'
import { getItemsFromFight } from '../utils/pylonsInteraction.js'
import StickyLeft from '@/components/StickyLeft.vue'
import StickyRight from '@/components/StickyRight.vue'
import StickyArmor from '@/components/StickyArmor.vue'
import PleaseLogIn from '../components/PleaseLogIn.vue'

export default {
  name: 'Arena',
  components: {
    PleaseLogIn,
    StickyLeft,
    StickyRight,
    StickyArmor,
  },
  data() {
    return {
      battleLog: '',
      keepLog: false,
      fighterEquipment: {},
      isWinner: false,
      fightQueued: false,
      fightFinished: false,
      opponentEquipment: {
        nft: {},
        lefthand: {},
        righthand: {},
        armor: {},
        helmet: {},
      },
      fighterName: 'undefined',
      fighterID: 'undefined',
      canFight: false,
      ownedItems: [],
      nftImg: 'undefined',
    }
  },
  mounted() {
    //console.log('query fight 0:', getFight(0))
    //console.log('the whole store:', this.$store)
    //console.log("IMAGE: ", this.$store.getters['getFighterEquipment'].nft.image)
    if (this.isLoggedIn()) {
      this.nftImg = this.$store.getters['getFighterEquipment'].nft.image
      this.queryMyNFT().then((nft) => {
        //console.log('NFT:', nft)
        if (R.isEmpty(nft.name)) {
          this.fighterName = 'please give your NFT a proper name'
        } else {
          this.fighterName = nft.name
        }
        if (R.isEmpty(nft.image)) {
          this.nftImg = ''
        } else {
          this.nftImg = nft.image
        }
        this.fighterEquipment.nft = nft
      })

      this.queryMyItems().then((items) => {
        this.ownedItems = items
        //console.log('store fighter equipment', this.$store.getters['getFighterEquipment'])
        this.fighterEquipment = this.$store.getters['getFighterEquipment']

        this.canFight = true
        if (R.isEmpty(this.fighterEquipment.nft)) {
          this.canFight = false
          this.notifyFail('No NFT', "Boi, you haven't even uploaded an NFT... \nDo it in the UPLAOD page!.")
        }
        if (R.isEmpty(this.fighterEquipment.armor)) {
          let armor = this.ownedItems.find((item) => item.ItemType === 'armor')
          if (typeof armor === 'undefined') {
            this.canFight = false
            this.notifyFail(
              'No Armor worn',
              "Boi, you don't even wear an armor... \nI will look up if you own on and equip it.",
            )
          } else {
            this.fighterEquipment.armor = armor
            console.log('Auto-Equip: Armor')
          }
        }
        if (R.isEmpty(this.fighterEquipment.lefthand) && R.isEmpty(this.fighterEquipment.righthand)) {
          let weapon = this.ownedItems.find((item) => item.ItemType === 'weapon')
          if (typeof weapon !== 'undefined') {
            this.fighterEquipment.righthand = weapon

            if (weapon.oneHanded === 'true') {
              let secondary = this.ownedItems.find(
                (item) =>
                  (item.ItemType === 'weapon' && item.oneHanded === 'true' && item.ID !== weapon.ID) ||
                  item.ItemType === 'shield',
              )
              if (typeof secondary !== 'undefined') {
                this.fighterEquipment.lefthand = secondary
              }
            }
            console.log('Auto-Equip: Weapon')
          }
        }
        if (
          (R.isEmpty(this.fighterEquipment.lefthand) || this.fighterEquipment.lefthand.ItemType === 'shield') &&
          R.isEmpty(this.fighterEquipment.righthand || this.fighterEquipment.righthand.ItemType === 'shield')
        ) {
          this.canFight = false
          this.notifyFail(
            'No Weapon in Hand',
            "Boi, you don't even have an item in your hand.\nLet's see if you have any weapons, lol.",
          )
        }
      })
    } else this.notifyFail('Epic fail', 'You must be logged in to fight in the arena...')
  },
  methods: {
    enlistForArena() {
      if (this.fightQueued) {
        this.notifyInfo('Nice Try', 'You are already enlisted into the arena!')
        return
      }
      this.notifyInfo('Enlisting', 'You are being enlisted into the arena, please wait')
      this.fightQueued = true
      this.isWinner = false
      this.fightFinished = false
      this.battleLog = ''
      if (this.canFight) {
        let leftID = this.fighterEquipment.lefthand.ID
        let rightID = this.fighterEquipment.righthand.ID
        if (this.fighterEquipment.lefthand.oneHanded === 'false') {
          rightID = this.fighterEquipment.lefthand.ID
        }
        if (this.fighterEquipment.righthand.oneHanded === 'false') {
          leftID = this.fighterEquipment.righthand.ID
        }
        this.$store
          .dispatch('Pylonstech.pylons.pylons/sendMsgEnlistForArena', {
            value: {
              '@type': '/Pylonstech.pylons.pylons.MsgEnlistForArena',
              creator: this.$store.getters['common/wallet/address'],
              nft: this.fighterEquipment.nft.ID,
              cookbookID: 'nftarena',
              lHitem: leftID,
              rHitem: rightID,
              armoritem: this.fighterEquipment.armor.ID,
            },
          })
          .then((res) => {
            console.log('Enlisted Successfully: ', res)
            console.log('TEST: ', JSON.parse(res.rawLog))
            this.fighterID = JSON.parse(res.rawLog)[0].events[0].attributes[1].value

            if (this.fighterID.includes('pylo')) {
              //We got a wallet address lmao, try the other one
              this.fighterID = JSON.parse(res.rawLog)[0].events[0].attributes[0].value
            }

            this.fighterID = this.fighterID.replace(/[^a-zA-Z0-9]/g, '')
            //this.queuedFights.push(fighterID)
            this.fightQueued = true
          })
      } else {
        this.fightQueued = false
        this.notifyFail(
          'Not ready for Fight!',
          "You don't meet the requirements for the Arena. \nNot listening to the error messages here, eh?",
        )
      }
    },
    postFightConfig(local, opponent) {
      // console.log('Local fighter: ', local)
      // console.log('Opponent fighter: ', opponent)
    },
    checkFightResult(id) {
      this.getFightDone(id)
    },
    getFightDone(id) {
      this.notifyInfo('Checking', 'Checking Battle status, please wait')
      this.$axios
        .get('http://v2202008103543124756.megasrv.de:1318/Pylons-tech/pylons/pylons/fight?ID=' + id, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
        .then((res) => {
          console.log('response arrived')
          if (res.data.Fighter.Status === 'waiting') {
            this.notifyInfo('Pending', 'Your hero is still waiting for an opponent')
            console.log('waiting: ', res.data.Fighter)
          } else {
            this.notifyInfo('Fight completed!', 'Your hero has fought in a battle!\nUpdating Fight log!')
            console.log('fight successful: ', res.data.Fighter)
            //this.queuedFights.pop()
            console.log('Status: ', res.data.Fighter.Status)

            this.isWinner = res.data.Fighter.Status === 'win' ? true : false
            console.log('Is winner', this.isWinner)
            console.log('looking up opponent fighter with id', res.data.Fighter.opponentFighter)
            this.fightFinished = true
            this.battleLog = res.data.Fighter.Log
            this.$axios
              .get(
                'http://v2202008103543124756.megasrv.de:1318/Pylons-tech/pylons/pylons/fight?ID=' +
                  res.data.Fighter.opponentFighter,
                {
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                },
              )
              .then((res) => {
                console.log('looked up opponent fighter data:', res)
                getItemsFromFight
                  .bind(this)(res.data.Fighter)
                  .then((res) => {
                    this.opponentEquipment = res
                    console.log('opponent Equipment:', this.opponentEquipment)
                    this.notifySuccess('Very Nice!', 'Fight log updated!')
                    this.keepLog = true
                    this.fightQueued = false
                  })
              })
          }
        })
    },
    getBattleLog() {
      let logarray = this.battleLog.split(/\r?\n/)
      console.log('battlelog yes:', logarray)
      return logarray
    },
    getWinLossRatio() {
      if (typeof this.fighterEquipment.nft !== 'undefined')
        return this.fighterEquipment.nft.wins / this.fighterEquipment.nft.losses
    },
    getWins() {
      if (typeof this.fighterEquipment.nft !== 'undefined')
        return Number.parseFloat(this.fighterEquipment.nft.wins).toFixed(0)
    },
    getLosses() {
      if (typeof this.fighterEquipment.nft !== 'undefined')
        return Number.parseFloat(this.fighterEquipment.nft.losses).toFixed(0)
    },
    isLoggedIn() {
      return this.$store.getters['common/wallet/loggedIn']
    },
    exists(item) {
      if (typeof item === 'undefined') return false
      else if (item === '') return false
      else return true
    },
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
.fight-text {
  text-decoration: none;
  color: black;
}
.fight-button {
  margin: auto 3%;
  cursor: pointer;
  width: 180px;
  height: 180px;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  font-size: 18px;
  padding: 20px;
  background-color: #29eddb;
  // background-color: #d61224;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 0px 6px 6px rgba(255, 255, 255, 0.5);
  filter: invert(1);
  -webkit-filter: invert(1);
}
.fight-button:hover {
  box-shadow: 0px 10px 10px rgba(255, 255, 255, 0.5);
}
.fight-button:active {
  box-shadow: none;
}
.stats_wrapper {
  width: 65%;
  padding: 20px;
}
.stats_wrapper__small {
  padding: 5px;
  width: 150%;
}
.stat-text {
  font-size: 20px;
  margin: 5px;
  color: black;
}
.stat-text__small {
  font-size: 15px;
  margin: 3px;
  color: black;
}
.nft-img_wrapper {
  width: 250px;
  background-color: white;
  // height: 20%;
}
.stickfigure-background {
  background-image: url('../assets/img/stick_items/sboiBG.png');
  background-size: 100%;
  //background-image: url('../assets/img/stick_items/sboiBG.png');
  display: grid;
  z-index: -3;
}
.stickfigure {
  width: 250px;
  height: 250px;
  grid-column: 1;
  grid-row: 1;
  z-index: 0;
  //background-image: url("../assets/img/stick_items/sboi.png");
}
.equipped-item {
  grid-column: 1;
  grid-row: 1;
  width: 100%;
  height: 100%;
}
.nft-image {
  grid-column: 1;
  grid-row: 1;
  width: 30%;
  height: 30%;
  margin: 0px auto;
  z-index: 1;
}
.hero_wrapper {
  display: flex;
  flex-direction: row;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.5);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.sword-img {
  //vertical-align: middle;
  width: 100px;
  height: 100px;
  margin-left: 20px;
  margin-bottom: 20px;
  display: block;
}
.queue-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  column-gap: 5px;
  row-gap: 5px;
  float: left;
  //width: 100%;
  padding: 10px;
  height: 100%;
  width: 100%;
  margin: 0 auto;
}
.container {
  width: 100%;
  padding: 0;
  height: 100%;
  max-width: unset;
  margin: 0;
}
.container--top {
  text-align: right;
  padding: 5% 10%;
  width: 100%;
  background-color: rgba(85.0000025331974, 5.000000176951289, 66.00000366568565, 1);
}
.container--bot {
  height: 38%;
  width: 100%;
  padding: 1% 10%;
  background-color: rgba(255, 198.00000339746475, 98.00000175833702, 1);
}
.title {
  //margin-right: 5%;
  text-align: center;
  color: white;
  font-size: 40px;
  font-family: $font-family;
  padding-top: 10px;
  font-weight: bold;
}
.description {
  margin-top: 30px;
  font-size: 25px;
  color: white;
}
.shifted-down {
  margin-top: 5%;
  border-width: 0px;
}
.fight-box {
  display: flex;
  flex-direction: row;
  height: 126px;
  margin: 0 0 50px 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.battle-log-text {
  font-size: 20px;
  color: white;
}
.battle-log {
  padding: 10px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.5);
}
.background {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  background: $background-gradient;
}
.footer-container {
  padding: 50px 10%;
  height: auto;
  min-height: 40%;
  overflow-y: auto;
  width: 100%;
  background: $background-gradient;
}
</style>
