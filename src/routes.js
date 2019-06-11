import Login from './components/Login.vue'
import NotFound from './components/404.vue'
import Home from './components/Home.vue'
import Main from './components/Main.vue'
import Table from './components/user/Table.vue'
import leave from './components/leave/leave.vue'
import approval_leave from './components/leave/approval_leave.vue'
import overtime_list from './components/overtime/approval_overtime'
import hours from './components/hours/hours'
import department from './components/department/department'
import face from './components/face/face'
import update from './components/face/user_update_face'
import shift from './components/shift/shift'
import sign from './components/sign/sign'
import msg from './components/message/message'
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export const routes_master = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },

    {
        path: '*',
        hidden: true,
        redirect: {path: '/404'}
    },
    {
        path: '/',
        component: Home,
        name: '用户管理',
        roles:['master'],
        iconCls: 'fa fa-user-circle',//图标样式class
        children: [
            {path: '/table', component: Table, name: '用户编辑'},//对一般职员隐藏
        ]
    },
    {
        path: '/sign',
        component: sign,
        hidden: true,
        name: '签到',
        roles:['user','master']
    },
    {
        path:'/m',
        component: Home,
        hidden: true,
        name:'',
        roles:['user','master'],
        children:[
            {path:'/msg',roles:['user','master'], component: msg, name:'消息列表'}
        ]
    },
    {
        path:'/',
        hidden:true,
        name:'',
        component:Home,
        children:[
            {path:'/main',component: Main ,name:'主页'}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '请假',
        roles:['master','user'],
        iconCls: 'fa fa-id-card-o',
        children: [
            {path: '/leave', component: leave, name: '请假申请' , roles:['user'],},
            {path: '/approval', component: approval_leave, name: '请假审批', roles:['master'],},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '加班',
        iconCls: 'fa fa-coffee',
        roles:['master','user'],
        children: [
            {path: '/overtime_list', component: overtime_list, roles:['master'],name: '加班申请列表' , },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '工时',
        roles:['master'],
        iconCls: 'fa fa-clock-o',
        children: [
            {path: '/hours', component: hours, roles:['master'],name: '工时记录',},
        ]
    },

    {
        path: '/',
        component: Home,
        name: '部门管理',
        roles:['master'],
        iconCls: 'fa fa-microchip',
        children: [
            {path: '/department', component: department,roles:['master'], name: '部门编辑',  },
        ]
    },

    {
        path: '/',
        component: Home,
        name: '人脸信息',
        roles:['master','user'],
        iconCls: 'fa fa-camera',
        children: [
            {path: '/face', component: face, name: '人脸信息管理',  roles:['master']},
            {path: '/face_update', component: update, name: '更新人脸信息',roles:['master','user']}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '排班信息',
        roles:['master'],
        iconCls: 'fa fa-pie-chart',
        children: [
            {path: '/shift', component: shift,roles:['master'], name: '排班信息列表'},
        ]
    },

];
export const routes_user = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },

    {
        path: '*',
        hidden: true,
        redirect: {path: '/404'}
    },
    {
        path: '/sign',
        component: sign,
        hidden: true,
        name: '签到',
        roles:['user','master']
    },
    {
        path:'/m',
        component: Home,
        hidden: true,
        name:'',
        roles:['user','master'],
        children:[
            {path:'msg',roles:['user','master'], component: msg, name:'消息列表'}
        ]
    },
    {
        path:'/',
        hidden:true,
        name:'',
        component:Home,
        children:[
            {path:'/main',component: Main ,name:'主页'}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '请假',
        roles:['master','user'],
        iconCls: 'fa fa-id-card-o',
        children: [
            {path: '/leave', component: leave, name: '请假申请' , roles:['user'],},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '工时',
        roles:['master'],
        iconCls: 'fa fa-clock-o',
        children: [
            {path: '/hours', component: hours, roles:['master'],name: '工时记录',},
        ]
    },


    {
        path: '/',
        component: Home,
        name: '人脸信息',
        roles:['master','user'],
        iconCls: 'fa fa-camera',
        children: [
            {path: '/face_update', component: update, name: '更新人脸信息',roles:['master','user']}
        ]
    },

]
//this.$router.options.routes = routes;
//this.$router.addRoutes(routes);
var role=localStorage.getItem("role")
console.log('role  '+role)
var routes = (role==='master')? routes_master : routes_user
export default new Router({
routes:routes
})
