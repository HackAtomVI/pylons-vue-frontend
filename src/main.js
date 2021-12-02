import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vueLib from '@starport/vue'
import axios from 'axios'

// createApp.prototype.$http = axios.create({
//     baseURL: 'http://v2202008103543124756.megasrv.de:4500',
// })
//saxios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

const app = createApp(App)
app.config.globalProperties.$axios = axios
app.config.globalProperties._depsLoaded = true
app.use(store).use(router).use(vueLib).mount('#app')
