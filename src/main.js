// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import store from './store'
// import axios from 'axios'

import 'common/less/reset.less'

fastclick.attach(document.body)

Vue.config.productionTip = false

// 发送前进行axios拦截
// axios.interceptors.request.use((config) => {
//   config.headers = { }
//   return config
// }, (err) => {
//   return Promise.reject(err)
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
