<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getUser">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="leaveList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120" sortable>
            </el-table-column>
            <el-table-column prop="start_at" label="开始时间" width="180" sortable>
            </el-table-column>
            <el-table-column prop="end_at" label="结束时间" width="180" sortable>
            </el-table-column>
            <el-table-column prop="status" label="状态" min-width="100" sortable>
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template scope="scope">
                    <el-button size="small" @click="statusEdit(scope.$index, scope.row)">审核</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <el-dialog title="审核" v-model="statusFormVisible" :close-on-click-modal="false">
            <el-form :model="statusForm" label-width="80px" :rules="statusFormRules" ref="editForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="statusForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="请假原因" prop="remark">
                    <el-input v-model="statusForm.remark"></el-input>
                </el-form-item>
                <el-form-item label="审核">
                    <el-radio-group v-model="statusForm.status">
                        <el-radio class="radio" :label="'Pass'">通过</el-radio>
                        <el-radio class="radio" :label="'Reject'"@change="change">不通过</el-radio>
                        <el-radio class="radio" :label="'Wait'" >暂不决定</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="审核意见" v-model="statusForm.delivery">
                    <el-input ></el-input>
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
    //import NProgress from 'nprogress'
    import { getLeaveUser, getLeaveListPage, LeaveRequestApproval } from '../../api/api';

    export default {
        data() {
            return {
                filters: {
                    name: ''
                },

                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列
                editLoading: false,
                leaveList: [
                    {
                        id: 6,
                        name: '王X',
                        start_at: '2019-6-01 13:00',
                        end_at: '2019-6-02 13:00',
                        status: 'wait',
                        remark: '身体原因'
                    }
                ],
                statusFormVisible: false,
                statusFormRules:{
                    name: [
                        { required: true, message: '请输入审核意见', trigger: 'blur' }
                    ]
                },
                statusForm: {
                    id: 0,
                    name: '',
                    start_at:'' ,
                    end_at:'',
                    remark:'Wait',
                    status: '',
                    delivery: false
                },
            }
        },
        methods: {
            //获取指定用户请假信息
            getUser(){
              let para ={
                  name:this.filters.name
              }
              getLeaveUser(para).then((res) =>{

              });
            },

            //获取请假列表
            getList: function () {
                let para = {
                    page: this.page,
                    name: this.filters.name
                };
                this.loading = true;
               // getLeaveListPage(para).then((res) => {
               //     this.total = res.data.total;
               //     this.leaveList = res.data.leaveList;
               //     this.listloading = false;
               // });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getList();
            },
            statusEdit(index, row){
                this.statusFormVisible=true;
                this.statusForm = Object.assign({}, row);
            },
            change(){
                this.statusForm.delivery = true
            },

            editSubmit: function () {
                this.$refs.statusForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            let para = Object.assign({}, this.statusForm);
                            LeaveRequestApproval(para).then((res) => {
                                this.editLoading = false;
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
