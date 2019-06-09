<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="用户id"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button   type="primary" v-on:click="getfaceuser">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="facelist" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="id" label="序号" min-width="100">
            </el-table-column>
            <el-table-column prop="name" label="姓名" min-width="150" align="center" sortable>
            </el-table-column>
            <el-table-column prop="user_id" label="工号" min-width="100">
            </el-table-column>
            <el-table-column prop="status" label="状态" min-width="150" align="center" sortable  :formatter="formatStatus">
            </el-table-column>
            <el-table-column prop="status" label="人脸信息" min-width="200" align="center" sortable>
                <template scope="scope">
                <el-button size="small" min-width="180" align="center" sortable @click="showPicture(scope.row)">查看图片</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="250" align="center">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">更新</el-button>
                    <el-button size="small" @click="handleApproval(scope.$index, scope.row)">审核</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--更新界面-->
        <el-dialog title="更新" v-model="editFormVisible" :close-on-click-modal="false">
            <!--目前没弄明白更新人脸信息是干嘛-->
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--审核界面-->
        <el-dialog title="审核" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="状态选择" prop="name">
                    <el-radio-group v-model="addForm.status">
                        <el-radio label="discarded">丢弃</el-radio>
                        <el-radio label="wait">等待</el-radio>
                        <el-radio label="available">通过</el-radio>
                        <!--所以available翻译成啥合适呢（思考）-->
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="approvalSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>

        <el-dialog title="人脸" v-model="pictureFormVisible" :close-on-click-modal="false">
            <el-form :model="pictureForm" ref="pictureForm" >
                <img :src="pictureForm.info" alt="" id="imginit" align="center">
            </el-form>
        </el-dialog>
    </section>
</template>

<script>
    import {getFaceUser, editFaceUser, faceApproval, getFaceList } from  "../../api/api";

    export default {
        data() {
            return {
                filters: {
                    name: ''
                },

                facelist: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列
                pictureFormVisible:false,
                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ]
                },

                pictureForm:{
                    info:'',
                },

                //编辑界面数据
                editForm: {
                    status:'',
                    user_id:'',
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    status: [
                        { required: true, message: '请选择状态', trigger: 'blur' }
                    ]
                },
                //审核界面数据
                addForm: {
                    status: 'wait',
                    face_id:'',
                }

            }
        },
        methods: {

            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },

            getfaceuser(){
                let para ={};
                getFaceUser(para).then((res) =>{//向后端发送 获得指定用户人脸信息

                })
            },

            getList() { //向后端请求排班列表
                let para = {
                };
                //this.listLoading = true;
                //NProgress.start();
                getFaceList(para).then((res) => {

                });
            },
            //删除
            handleApproval: function (index, row) {
                this.addFormVisible = true;
                this.addForm =  Object.assign({}, row);
            },
            //显示编辑更新界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.addForm = Object.assign({},row);
            },

            showPicture(row){
                    this.pictureFormVisible = true;
                    this.pictureForm = Object.assign({}, row);
            },

            formatStatus(row){
                if (row.status=='wait')
                    return'等待审核';
                else if(row.status=='available')
                    return'通过';
                else if(row.status=='discarded')
                return '丢弃';
                else return '未知状态';
            },

            imgUrl(){
              return this.pictureForm.info;
            },

            //更新人脸信息
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.editForm);
                            editFaceUser(para).then((res) => {//向后端发送更新信息
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                                this.getList();
                            });
                        });
                    }
                });
            },
            approvalSubmit:function(){//向后端发送审核信息
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            let para = Object.assign({}, this.addForm);
                            faceApproval(para).then((res) => {//向后端发送更新信息
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