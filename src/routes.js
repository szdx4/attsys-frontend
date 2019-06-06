import Login from './components/Login.vue'
import NotFound from './components/404.vue'
import Home from './components/Home.vue'
import Main from './components/Main.vue'
import Table from './components/user/Table.vue'
import leave from './components/leave/leave.vue'
import user from './components/user/user.vue'
import approval_leave from './components/leave/approval_leave.vue'
import overtime_ist from './components/overtime/approval_overtime'
import overtime from './components/overtime/overtime'
import hours from './components/hours/hours'
import echarts from './components/charts/echarts.vue'

let routes = [
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
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '用户管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: '用户编辑' },//对一般职员隐藏
            { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '请假',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/leave', component: leave, name: '请假申请' },
            { path: '/approval',component: approval_leave, name:'请假审批' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '加班',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/overtime_list', component: overtime_ist, name: '加班申请列表' },
            { path:'/overtime', component: overtime, name:'申请加班'},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '工时',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/hours', component: hours, name: '工时记录' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;