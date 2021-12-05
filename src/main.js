import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vueLib from '@starport/vue'
import axios from 'axios'
import * as R from 'ramda'

import Notifications from '@kyvg/vue3-notification'

import { getNft, getItems } from './utils/pylonsInteraction.js'

// createApp.prototype.$http = axios.create({
//     baseURL: 'http://v2202008103543124756.megasrv.de:4500',
// })
//saxios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

const app = createApp(App)
app.config.globalProperties.$axios = axios
app.config.globalProperties._depsLoaded = true
app.config.globalProperties.R = R
app.use(store).use(router).use(vueLib).use(Notifications).mount('#app')

app.mixin({
  methods: {
    isMobileDevice: function () {
      let check = false
      ;(function (a) {
        if (
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
            a,
          ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
            a.substr(0, 4),
          )
        )
          check = true
      })(navigator.userAgent || navigator.vendor || window.opera)
      return check
    },
    queryMyNFT: function () {
      console.log('QUERY MY NFT')
      return getNft
        .bind(this)()
        .then((nft) => {
          if (nft === false) {
            //this.notifyFail('No NFT', 'You have not uploaded a NFT yet.\n Please go to Upload NFT and do so.')
            console.log('YOU DONT OWN NFT - GO TO "UPLOAD NFT" - DONT PASS GO - DONT COLLECT $400')
            return false
          } else {
            this.$store.commit('setFighterNft', nft)
            return nft
          }
        })
        .catch((err) => {
          this.notifyFail('LOGGED IN?', "'NOT LOGGED IN? IS IT POSSIBLE THAT YOU ARE NOT LOGGED IN YES?'")
          console.log()
          console.error(err)
        })
    },
    queryMyItems: function () {
      return getItems
        .bind(this)()
        .then((items) => {
          let ownedItems = R.reject((x) => x.ItemType === 'nft', items)
          if (ownedItems.length === 0) {
            this.notifyFail(
              'No Items owned',
              "You don't have any equipment,\n do you want to stay naked your whole life?\n Go to the Forge and craft some.",
            )
          }
          return ownedItems
        })
    },
    notifyFail: R.curry(function (title, text) {
      this.$notify({
        group: 'bottom-right-notification',
        title: title,
        text: text,
        type: 'notification--alert',
        duration: 5000,
      })
    }),
    notifySuccess: R.curry(function (title, text) {
      this.$notify({
        group: 'bottom-right-notification',
        title: title,
        text: text,
        type: 'notification--success',
        duration: 5000,
      })
    }),
    notifyInfo: R.curry(function (title, text) {
      this.$notify({
        group: 'bottom-right-notification',
        title: title,
        text: text,
        type: 'notification--info',
        duration: 5000,
      })
    }),
  },
})
