import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from 'router'
import store from 'store'
import axios from 'lib/axios'

import 'assets/plugins/element.js'
import 'assets/styles/index.scss'

Vue.config.productionTip = false

Vue.use(axios, { store, router })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
