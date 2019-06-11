<template>
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px"
             class="demo-ruleForm login-container">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="account">
            <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录
            </el-button>
            <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
    </el-form>
</template>

<script>
    import {requestLogin} from '../api/api';

    let Base64 = require('js-base64').Base64;

    export default {
        data() {
            return {
                logining: false,
                ruleForm2: {
                    account: '',
                    checkPass: ''
                },
                rules2: {
                    account: [
                        {required: true, message: '账号不能为空', trigger: 'blur'},
                        {min: 2, max: 10, message: '账号长度应大于2个字', trigger: 'blur'}
                    ],
                    checkPass: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                        {min: 4, max: 10, message: '密码长度应大于4位', trigger: 'blur'}

                    ]
                },
                checked: true,
            };
        },
        methods: {
            handleReset2() {
                this.$refs.ruleForm2.resetFields();
            },
            handleSubmit2(ev) {
                var _this = this;
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        //_this.$router.replace('/table');
                        this.logining = true;
                        requestLogin({
                            name: this.ruleForm2.account,
                            password: this.ruleForm2.checkPass
                        }).then(res => {
                            this.logining = false;
                            if (res.status !== 200) {
                                this.$message({
                                    message: '用户名或密码错误',
                                    type: 'error'
                                });
                            } else {
                                localStorage.setItem('token', res.data.token);
                                let middle_token = res.data.token.split('.')[1];
                                let pre_json = Base64.decode(middle_token);
                                let json = JSON.parse(pre_json);
                                localStorage.setItem('id', json.id);
                                localStorage.setItem('role',json.role);

                                this.$router.push({path: '/main'});
                                sessionStorage.setItem('user', this.ruleForm2.account)
                            }
                        }).catch(err => {
                            console.log(err);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }

</script>

<style lang="scss" scoped>
    .login-container {
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;

        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }

        .remember {
            margin: 0px 0px 35px 0px;
        }
    }
</style>
