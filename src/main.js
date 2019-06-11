import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import {routes_master,routes_user} from './routes'
import router from './routes'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI);
Vue.use(Vuex);

// var addRouFlag = false
//
// router.beforeEach((to, from, next) => {
//     // 取到用户的角色
//     let GetRole = localStorage.getItem("role")
//
//     // 如果登录了
//     if (GetRole&&GetRole !== 'unload') {
//         if (!addRouFlag) {
//             addRouFlag = true
//             if(GetRole=='master')  router.addRoutes(routes_master);
//             else router.addRoutes(routes_user);
//             // 5.push之后，会重新进入到beforeEach的钩子里,直接进入第一个if判断
//             router.push({ path: to.path })
//         }
//     } else {
//         // 用户没登录，跳转到登录页面
//         if (to.path === '/login') {
//             next()
//         } else {
//             next('/')
//         }
//     }
//
// })


// const router = new VueRouter({
//     routes
// });


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

