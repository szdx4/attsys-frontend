<template>
    <section>
        <el-row class="container">
            <el-col :span="24" class="header">
                <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
                    {{collapsed?'':sysName}}
                </el-col>
                <el-col :span="10">
                    <div class="tools" @click.prevent="collapse">
                        <i class="fa fa-align-justify"></i>
                    </div>
                </el-col>
                <el-col :span="4" class="userinfo">
                    <el-dropdown trigger="hover">
                    <span class="el-dropdown-link userinfo-inner"><img
                            :src=this.pic>
                        {{sysUserName}}</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="jumpMsg">我的消息</el-dropdown-item>
                            <el-dropdown-item @click.native="jumpSign">签到</el-dropdown-item>
                            <el-dropdown-item>设置</el-dropdown-item>
                            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                            <el-dropdown-item @click.native="handleEdit">修改密码</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-col>
            <el-col :span="24" class="main">
                <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
                    <!--导航菜单-->
                    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen"
                             @close="handleclose" @select="handleselect"
                             unique-opened router v-show="!collapsed">
                        <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                            <el-submenu :index="index+''" v-if="!item.leaf">
                                <template slot="title">
                                    <i :class="item.iconCls"></i>{{item.name}}
                                </template>
                                <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path"
                                              v-if="!child.hidden">{{child.name}}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i
                                    :class="item.iconCls"></i>{{item.children[0].name}}
                            </el-menu-item>
                        </template>
                    </el-menu>
                    <!--导航菜单-折叠后-->
                    <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
                        <li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
                            <template v-if="!item.leaf">
                                <div class="el-submenu__title" style="padding-left: 20px;"
                                     @mouseover="showMenu(index,true)"
                                     @mouseout="showMenu(index,false)">
                                    <i :class="item.iconCls"></i>
                                </div>
                                <ul class="el-menu submenu" :class="'submenu-hook-'+index"
                                    @mouseover="showMenu(index,true)"
                                    @mouseout="showMenu(index,false)">
                                    <li v-for="child in item.children" v-if="!child.hidden" :key="child.path"
                                        class="el-menu-item" style="padding-left: 40px;"
                                        :class="$route.path===child.path?'is-active':''"
                                        @click="$router.push(child.path)">
                                        {{child.name}}
                                    </li>
                                </ul>
                            </template>
                            <template v-else>
                                <ul>
                                    <li class="el-submenu">
                                        <div class="el-submenu__title el-menu-item"
                                             style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;"
                                             :class="$route.path===item.children[0].path?'is-active':''"
                                             @click="$router.push(item.children[0].path)">
                                            <i :class="item.iconCls">
                                            </i>
                                        </div>
                                    </li>
                                </ul>
                            </template>
                        </li>
                    </ul>
                </aside>
                <section class="content-container">
                    <div class="grid-content bg-purple-light">
                        <el-col :span="24" class="breadcrumb-container">
                            <strong class="title">{{$route.name}}</strong>
                            <el-breadcrumb separator="/" class="breadcrumb-inner">
                                <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                                    {{ item.name }}
                                </el-breadcrumb-item>
                            </el-breadcrumb>
                        </el-col>
                        <el-col :span="24" class="content-wrapper">
                            <transition name="fade" mode="out-in">
                                <router-view></router-view>
                            </transition>
                        </el-col>
                    </div>
                </section>
            </el-col>
        </el-row>
        <el-dialog title="修改密码" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" ref="editForm">
                <el-form-item label="旧密码" prop="old_password">
                    <el-input auto-complete="off" v-model="editForm.old_password"></el-input>
                </el-form-item>
                <el-form-item label="新密码" porp="new_password">
                    <el-input v-model="editForm.new_password" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit">提交</el-button>
            </div>
        </el-dialog>

    </section>


</template>

<script>
    import {editPasswd, getSignStatus, getSignQrcode, signQrcode, signFace} from '../api/api';
    import {pic} from './user/picture'


    export default {
        data() {
            return {
                sysName: '签到系统',
                collapsed: false,
                sysUserName: '',
                sysUserAvatar: '',
                editFormVisible: false,
                signFormVisible: false,
                qrcode: '',

                sign_id: '',
                pic: pic,
                editForm: {
                    old_password: "",
                    new_password: ""
                },
                editForm2: {
                    old_password: [
                        { required: true, message: "密码不能为空", trigger: "blur" },
                        { min: 4, max: 10, message: "密码长度应大于4位", trigger: "blur" }
                    ],
                    new_password: [
                        { required: true, message: "密码不能为空", trigger: "blur" },
                        { min: 4, max: 10, message: "密码长度应大于4位", trigger: "blur" }
                    ],
                },

                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        methods: {
            onSubmit() {
                // console.log('submit!');
            },
            jumpSign: function () {
                //加一个函数获取sign_id
                let signStatus;
                signStatus = this.sign_id === '';
                if (!signStatus) {
                    this.$message({
                        message: '您已签到',
                    });
                } else {
                    this.$router.push({
                        name: '签到', params: {
                            qrcode: this.qrcode,
                        }
                    });
                }
            },

            jumpMsg() {
                this.$router.push('/msg')
            },

            getSign_id() {//向后台请求sign_id getSignStatus

            },
            handleEdit() {
                this.editFormVisible = true;
            },


            handleopen() {
                //console.log('handleopen');
            },
            handleclose() {
                //console.log('handleclose');
            },
            handleselect: function (a, b) {
            },

            signSubmit: function () {
                //先向后台请求签到状态

            },
            editSubmit: function() {
                //向后端发送修改密码请求
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        // 提交确认
                        this.$confirm('确认提交吗？', '提交', {}).then(() => {
                            let para = {
                                old_password: this.editForm.old_password,
                                new_password: this.editForm.new_password
                            };
                            let id = localStorage.getItem('id');
                            editPasswd(id, para).then((res) => {
                                // 响应成功
                                this.$message({
                                    message: '修改密码成功',
                                    type: 'success'
                                });
                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                            }).catch(err => {
                                // 响应错误
                                let status = err.response.status;
                                let msg = err.response.data.message;
                                this.$message({
                                    message: '修改密码失败，错误信息：' + msg,
                                    type: 'error'
                                });
                                this.$refs['editForm'].resetFields();
                                // this.editFormVisible = false;
                            });
                        });
                    }
                });
            },

            openCam() {//获取摄像头
                let constraints = {
                    video: {width: 500, height: 500},
                    audio: true
                };
                let video = document.getElementById("video");
                let promise = navigator.mediaDevices.getUserMedia(constraints);
                promise.then(function (MediaStream) {
                    video.srcObject = MediaStream;
                    video.play();
                });
            },

            takePhoto() {//拍照
                let video = document.getElementById("video");
                let canvas = document.getElementById("canvas");
                let ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, 500, 500);
            },

            sign: function () {
                this.signFormVisible = true;
                this.signForm = {
                    qrcode: '',
                    face: '',
                    sign_id: '',
                }
            },
            getSignqrcode() {
                let para = {};
                getSignQrcode(para).then((res) => {//向后端请求二维码，每1min重新获取一次

                }).catch((err) => {
                    let status = err.response.status;
                    let msg = err.response.data.message;
                    this.$message({
                        message: '二维码请求失败，错误信息：' + msg,
                        type: 'error'
                    });
                });

            },


            //退出登录
            logout: function () {
                let _this = this;
                this.$confirm('确认退出吗?', '提示', {
                    //type: 'warning'
                }).then(() => {
                    sessionStorage.removeItem('user');
                    localStorage.removeItem('token');
                    localStorage.removeItem('id');
                    localStorage.removeItem('role');
                    localStorage.removeItem('expired_at');
                    _this.$router.push('/login');
                }).catch(() => {

                });


            },

            //折叠导航栏
            collapse: function () {
                this.collapsed = !this.collapsed;
            },
            showMenu(i, status) {
                this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
            }
        },
        mounted() {
            this.verify();
            var user = sessionStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                this.sysUserName = user.name || '';
                this.sysUserAvatar = user.avatar || '';
            }

        }
    }

</script>

<style scoped lang="scss">
    //@import '~vars.scss';
    .customWidth {
        width: 80%;
    }

    .container {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;

        .header {
            height: 60px;
            line-height: 60px;
            background: #20a0ff;
            color: #fff;

            .userinfo {
                text-align: right;
                padding-right: 35px;
                float: right;

                .userinfo-inner {
                    cursor: pointer;
                    color: #fff;

                    img {
                        width: 40px;
                        height: 40px;
                        border-radius: 20px;
                        margin: 10px 0px 10px 10px;
                        float: right;
                    }
                }
            }

            .logo {
                //width:230px;
                height: 60px;
                font-size: 22px;
                padding-left: 20px;
                padding-right: 20px;
                border-color: rgba(238, 241, 146, 0.3);
                border-right-width: 1px;
                border-right-style: solid;

                img {
                    width: 40px;
                    float: left;
                    margin: 10px 10px 10px 18px;
                }

                .txt {
                    color: #fff;
                }
            }

            .logo-width {
                width: 230px;
            }

            .logo-collapse-width {
                width: 60px
            }

            .tools {
                padding: 0px 23px;
                width: 14px;
                height: 60px;
                line-height: 60px;
                cursor: pointer;
            }
        }

        .main {
            display: flex;
            // background: #324057;
            position: absolute;
            top: 60px;
            bottom: 0px;
            overflow: hidden;

            aside {
                flex: 0 0 230px;
                width: 230px;
                // position: absolute;
                // top: 0px;
                // bottom: 0px;
                .el-menu {
                    height: 100%;
                }

                .collapsed {
                    width: 60px;

                    .item {
                        position: relative;
                    }

                    .submenu {
                        position: absolute;
                        top: 0px;
                        left: 60px;
                        z-index: 99999;
                        height: auto;
                        display: none;
                    }

                }
            }

            .menu-collapsed {
                flex: 0 0 60px;
                width: 60px;
            }

            .menu-expanded {
                flex: 0 0 230px;
                width: 230px;
            }

            .content-container {
                // background: #f1f2f7;
                flex: 1;
                // position: absolute;
                // right: 0px;
                // top: 0px;
                // bottom: 0px;
                // left: 230px;
                overflow-y: scroll;
                padding: 20px;

                .breadcrumb-container {
                    //margin-bottom: 15px;
                    .title {
                        width: 200px;
                        float: left;
                        color: #475669;
                    }

                    .breadcrumb-inner {
                        float: right;
                    }
                }

                .content-wrapper {
                    background-color: #fff;
                    box-sizing: border-box;
                }
            }
        }
    }
</style>
