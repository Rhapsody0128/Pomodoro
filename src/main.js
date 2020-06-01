import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheck, faPen, faTimes, faUndo, faSave, faPlay, faPause, faStepForward } from '@fortawesome/free-solid-svg-icons'

import draggable from 'vuedraggable'

import 'fontsource-noto-sans-tc/chinese-traditional.css'
import './style/style.styl'

library.add(faCheck, faPen, faTimes, faUndo, faSave, faPlay, faPause, faStepForward)

// 註冊元件
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('draggable', draggable)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')