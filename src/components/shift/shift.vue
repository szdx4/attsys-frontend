<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="部门名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button   type="primary" v-on:click="getdepartment">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">添加排班信息</el-button>
                    <el-button type="primary" @click="handleAddDepartment">添加部门排班</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="shiftList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180" align="center" sortable>
            </el-table-column>
            <el-table-column prop="start_at" label="开始时间" width="200" align="center" sortable>
            </el-table-column>
            <el-table-column prop="end_at" label="结束时间" width="200" align="center" sortable>
            </el-table-column>
            <el-table-column prop="type" label="类型" width="180" align="center" sortable>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="180" align="center" sortable>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
        </el-col>


        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="开始时间">
                    <el-col :span="11">
                        <el-date-picker type="datetime"  placeholder="选择日期" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" v-model="addForm.start_at" style="width: 100%;" ></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-col :span="11">
                        <el-date-picker type="datetime"  placeholder="选择日期" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" v-model="addForm.end_at" style="width: 100%;" ></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="排班类型">
                    <el-radio-group v-model="addForm.type" >
                        <el-radio-button label="normal">正常</el-radio-button>
                        <el-radio-button label="allovertime">额外</el-radio-button>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增部门排班界面-->
        <el-dialog title="新增" v-model="addDepartmentFormVisible" :close-on-click-modal="false">
            <el-form :model="addDepartmentForm" label-width="80px" :rules="addDepartmentFormRules" ref="addForm">
                <el-form-item label="开始时间">
                    <el-col :span="11">
                        <el-date-picker type="datetime"  placeholder="选择日期" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" v-model="addDepartmentForm.start_at" style="width: 100%;" ></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-col :span="11">
                        <el-date-picker type="datetime"  placeholder="选择日期" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" v-model="addDepartmentForm.end_at" style="width: 100%;" ></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="排班类型">
                <el-radio-group v-model="addDepartmentForm.type" >
                    <el-radio-button label="normal">正常</el-radio-button>
                    <el-radio-button label="allovertime">额外</el-radio-button>
                </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addDepartmentFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addDepartmentSubmit" :loading="addDepartmentloading">提交</el-button>
            </div>
        </el-dialog>

    </section>
</template>

<script>
    import { getDepartmentList, addDepartment, deletDepartment, editDepartment, getDepartment} from '../../api/api'
    import { getShiftList, addShift, deletShift, addDepartmentShift} from "../../api/api";

    export default {
        data() {
            return {
                filters: {
                    name: ''
                },
                shiftList:[],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列

                //编辑界面数据
                editForm: {
                    id: 0,
                    name: '',
                    manager: 1
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                },
                //新增界面数据
                addForm: {
                    start_at:'',
                    end_at:'',
                    type:'',
                },

                addDepartmentFormVisible:false,
                addDepartmentloading: false,
                addDepartmentFormRules:{

                },
                addDepartmentForm:{
                    start_at:'',
                    end_at:'',
                    type:'',
                },

            }
        },
        methods: {

            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },

            getdepartment(){
                let para ={};
                getDepartment(para).then((res) =>{//向后端发送 获得指定部门排班的请求

                })
            },

            getList() { //向后端请求排班列表
                let para = {
                };
                getShiftList(para).then((res) => {

                });
            },
            //删除
            handleDel: function (index, row) {//向后端发送删除信息
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    let para = {

                    };
                    deletShift(para).then((res) => {
                        //这里需要加参数传递
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getList();
                    });
                }).catch(() => {

                });
            },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;

            },

            handleAddDepartment:function(){
                this.addDepartmentFormVisible = true;
            },

            //新增
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;

                            let para = Object.assign({}, this.addForm);
                            addShift(para).then((res) => { //向后端发送新增部门信息
                                this.addLoading = false;

                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.getList();
                            });
                        });
                    }
                });
            },
            addDepartmentSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addDepartmentloading = true;

                            let para = Object.assign({}, this.addDepartmentForm);
                            addDepartmentShift(para).then((res) => { //向后端发送新增部门信息
                                this.addLoading = false;

                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['addDepartmentForm'].resetFields();
                                this.addDepartmentFormVisible = false;
                                this.getList();
                            });
                        });
                    }
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
        },
        mounted() {
            this.getList();
        }
    }

</script>

<style scoped>

</style>