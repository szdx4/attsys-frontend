<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-date-picker type="datetime" placeholder="开始时间" value-format="yyyy-MM-dd HH:mm"
                                    format="yyyy-MM-dd HH:mm" v-model="start_at" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-date-picker type="datetime" placeholder="结束时间" value-format="yyyy-MM-dd HH:mm"
                                    format="yyyy-MM-dd HH:mm" v-model="end_at" style="width: 100%;"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getUser">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="hoursList" highlight-current-row v-loading="listLoading"
                  style="width: 100%;">
            <el-table-column prop="id" label="id" min-width="60" sortable>
            </el-table-column>
            <el-table-column prop="user.name" label="姓名" align="center" min-width="150" sortable>
            </el-table-column>
            <el-table-column prop="user.id" label="工号" align="center" min-width="150" sortable>
            </el-table-column>
            <el-table-column prop="date" label="日期" align="center" min-width="200" :formatter="dateFormatter" sortable>
            </el-table-column>
            <el-table-column prop="hours" label="工作时长" align="center" min-width="180" sortable>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>

    </section>
</template>
<script>
    import {getHours} from '../../api/api'

    export default {
        data() {
            return {

                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列

                start_at: '',
                end_at: '',

                hoursList: [],


            }
        },
        methods: {
            // logout for other page
            logout: function () {
                sessionStorage.removeItem('user');
                localStorage.removeItem('token');
                localStorage.removeItem('id');
                localStorage.removeItem('role');
                localStorage.removeItem('expired_at');
                this.$router.push('/login');
            },

            verify() {
                let token = localStorage.getItem('token');
                if (!token) {
                    this.$router.push({path: '/login'});
                } else {
                    let expired_at = localStorage.getItem('expired_at');
                    let expired_date = new Date(expired_at);
                    let now_date = new Date();
                    if (now_date > expired_date) {
                        this.$router.push({path: '/login'});
                        this.logout();
                    }

                }

            },

            //ok
            getList() {
                //向后台获取工时列表
                this.loading = true;
                getHours().then((res) => {
                    this.hoursList = res.data.data;
                    this.loading = false;
                }).catch(err => {
                    let status = err.response.status;
                    let msg = err.response.data.message;
                    this.$message({
                        message: '获取列表失败，错误信息：' + msg,
                        type: 'error'
                    });

                });
            },
            dateFormatter(row) {
                let t = new Date(row.date);
                return t.toLocaleDateString('zh-CN', {timeZone: 'Asia/Shanghai', hour12: false})

            },
            getUser() {
                let start_at = this.start_at;
                let end_at = this.end_at;
                if ((start_at === '') && (end_at === ''))
                    this.getList();
                else {
                    let para = {
                        start_at: start_at.toJSON(),
                        end_at: end_at.toJSON()
                    };
                    getHours(para).then(res => {
                        this.hoursList = res.data.data;
                    }).catch(err => {
                        let status = err.response.status;
                        let msg = err.response.data.message;
                        this.$message({
                            message: '获取信息失败，错误信息：' + msg,
                            type: 'error'
                        });

                    });

                }
            },

            handleCurrentChange(val) {
                this.page = val;
                this.getList();
            },

        },
        mounted() {
            this.verify();
            this.getList();
        }
    };
</script>

<style scoped>

</style>
