<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input v-model="user_id" placeholder="用户id"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getUser">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="leaveList" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="id" label="序号" align="center" min-width="60">
            </el-table-column>
            <el-table-column prop="user.name" label="姓名" align="center" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="user.id" label="工号" align="center" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="start_at" label="开始时间" align="center" min-width="180" :formatter="formatStart_at"
                             sortable>
            </el-table-column>
            <el-table-column prop="end_at" label="结束时间" align="center" min-width="180" :formatter="formatEnd_at"
                             sortable>
            </el-table-column>
            <el-table-column prop="status" label="状态" align="center" :formatter="statusFormatter" min-width="100"
                             sortable>
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="180">
                <template scope="scope">
                    <el-button size="small" @click="statusEdit(scope.$index, scope.row)">审核</el-button>
                    <el-button size="small" type="danger" @click="handleDelet( scope.row)">销假</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <el-dialog title="审核" v-model="statusFormVisible" :close-on-click-modal="false">
            <el-form :model="statusForm" label-width="80px" :rules="statusFormRules" ref="statusForm">
                <el-form-item label="工号" prop="id" align="left">
                    <el-form-item :label="statusForm.user.id.toString()" auto-complete="off"></el-form-item>
                </el-form-item>
                <el-form-item label="姓名" prop="name" align="left">
                    <el-form-item :label="statusForm.user.name" auto-complete="off"></el-form-item>
                </el-form-item>
                <el-form-item label="请假原因" prop="remark">
                    <el-form-item :label="statusForm.remark" auto-complete="off"></el-form-item>
                </el-form-item>
                <el-form-item label="审核" prop="status">
                    <el-radio-group v-model="statusForm.status">
                        <el-radio class="radio" label="pass">通过</el-radio>
                        <el-radio class="radio" label="reject">不通过</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click.native="statusFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
    import util from '../../common/js/util'
    import {getLeaveUser, getLeaveListPage, LeaveRequestApproval} from '../../api/api';

    export default {
        data() {
            return {
                filters: {
                    id: ''
                },
                user_id: '',//查询用的Orz

                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列
                editLoading: false,
                leaveList: [],
                statusFormVisible: false,
                statusFormRules: {
                    status: [
                        {required: true, message: '请选择审核意见', trigger: 'blur'}
                    ]
                },
                statusForm: {
                    id: 0,
                    user: {
                        id: 123,
                        name: '王X'
                    },
                    start_at: '',
                    end_at: '',
                    remark: 'Wait',
                    status: '',
                    delivery: false
                },
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
            //获取指定用户请假信息
            getUser() {
                let para = {};
                let id = this.user_id;
                getLeaveUser(id, para).then((res) => {
                    this.leaveList = res.data.data;
                });
            },
            formatStart_at(row) {
                var t = new Date(row.start_at);
                return t.toLocaleString('zh-CN', {timeZone: 'Asia/Shanghai', hour12: false})
            },
            formatEnd_at(row) {
                var t = new Date(row.end_at);
                return t.toLocaleString('zh-CN', {timeZone: 'Asia/Shanghai', hour12: false})
            },

            statusFormatter(row) {
                if (row.status === 'wait')
                    return '等待审核';
                else if (row.status === 'pass')
                    return '已通过';
                else if (row.status === 'reject')
                    return '不通过';
                else return '未知状态';
            },

            //向后台获取请假列表
            getList: function () {
                let para = {};
                this.loading = true;

                getLeaveListPage(para).then((res) => {
                    this.loading = false;

                    this.total = res.data.total;
                    this.leaveList = res.data.data;
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getList();
            },
            statusEdit(index, row) {
                this.statusFormVisible = true;
                this.statusForm = Object.assign({}, row);
            },
            handleDelet(row) {//像后端发送销假请求

            },

            editSubmit: function () {
                this.$refs.statusForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            // 确认提交，开始 loading
                            this.editLoading = true;

                            let id = this.statusForm.id;
                            let para = {

                                status: this.statusForm.status

                            };
                            LeaveRequestApproval(id, para).then((res) => {
                                // 接收到响应，结束loading
                                this.editLoading = false;

                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['statusForm'].resetFields();
                                this.statusFormVisible = false;
                                this.getList();
                            }).catch(err => {
                                // 接收到响应，结束loading
                                this.editLoading = false;

                                console.log(err);
                                let status = err.response.status;
                                let msg = err.response.data.message;
                                this.$message({
                                    message: '请假失败，错误信息：' + msg,
                                    type: 'error'
                                });
                                this.$refs['statusForm'].resetFields();
                                this.statusFormVisible = false;
                                this.getList();
                            });
                        });
                    }
                });
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
