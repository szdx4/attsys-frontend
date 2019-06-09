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
            <el-table-column prop="start_at" label="开始时间" align="center" min-width="180" sortable>
            </el-table-column>
            <el-table-column prop="end_at" label="结束时间" align="center" min-width="180" sortable>
            </el-table-column>
            <el-table-column prop="status" label="状态" align="center" :formatter="statusFormatter" min-width="100"
                             sortable>
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="100">
                <template scope="scope">
                    <el-button size="small" @click="statusEdit(scope.$index, scope.row)">审核</el-button>
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
                    <el-radio-group v-model="statusForm.status" >
                        <el-radio class="radio" label="pass">通过</el-radio>
                        <el-radio class="radio" label="reject">不通过</el-radio>
                        <el-radio class="radio" label="wait">暂不决定</el-radio>
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
                user_id:'',//查询用的Orz

                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列
                editLoading: false,
                leaveList: [
                ],
                statusFormVisible: false,
                statusFormRules: {
                    status: [
                        { required: true, message: '请选择审核意见', trigger: 'blur'}
                    ]
                },
                statusForm: {
                    id: 0,
                    user:{
                        id: 123,
                        name:'王X'
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
            //获取指定用户请假信息
            getUser() {
                let para = {
                };
                let id = this.user_id;
                getLeaveUser(id, para).then((res) => {
                    this.leaveList = res.data.data;
                });
            },

            statusFormatter(row) {
                if (row.status == 'wait')
                    return '等待审核';
                else if (row.status == 'pass')
                    return '已通过';
                else if (row.status == 'reject')
                    return '不通过';
                else return '未知状态';
            },

            //向后台获取请假列表
            getList: function () {
                let para = {
                };
                // this.loading = true;
                getLeaveListPage(para).then((res) => {
                    // this.listloading = false;
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

            editSubmit: function () {
                this.$refs.statusForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            // this.editLoading = true;
                            let id = this.statusForm.id;
                            let para ={

                                status: this.statusForm.status

                            };
                            LeaveRequestApproval(id, para).then((res) => {
                                // this.editLoading = false;
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
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
            this.getList();
        }
    };
</script>

<style scoped>

</style>
