import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import { routes_master, routes_user } from './routes'
import router from './routes'
import 'font-awesome/css/font-awesome.min.css'
import VueIconFont from 'vue-icon-font'

Vue.use(VueIconFont)
import '@/assets/font/iconfont.css'
import '@/assets/font/iconfont.js'

Vue.use(ElementUI)
Vue.use(Vuex)

var addRouFlag = false

// export function verify() {
//     let token = localStorage.getItem('token');
//     if (token !== '') {
//
//     }
//     else{
//
//     }
//
// }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

