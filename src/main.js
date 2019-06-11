import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import {routes_master, routes_user} from './routes'
import router from './routes'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI);
Vue.use(Vuex);

var addRouFlag = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

