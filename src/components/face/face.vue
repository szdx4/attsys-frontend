<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.id" placeholder="用户id"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getfaceuser">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="facelist" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="id" label="序号" min-width="100">
            </el-table-column>
            <el-table-column prop="user.name" label="姓名" min-width="150" align="center" sortable>
            </el-table-column>
            <el-table-column prop="user.id" label="工号" min-width="100">
            </el-table-column>
            <el-table-column prop="status" label="状态" min-width="150" align="center" sortable :formatter="formatStatus">
            </el-table-column>
            <el-table-column prop="status" label="人脸信息" min-width="200" align="center" sortable>
                <template scope="scope">
                    <el-button size="small" min-width="180" align="center" sortable @click="showPicture(scope.row)">
                        查看图片
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="250" align="center">
                <template scope="scope">
                    <el-button size="small" @click="handleApproval(scope.row)">审核</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <el-dialog title="人脸" v-model="pictureFormVisible" :close-on-click-modal="false">
            <el-form :model="pictureForm" ref="pictureForm">
                <img :src="pictureForm.info" alt="" id="imginit" align="center">
            </el-form>
        </el-dialog>
    </section>
</template>

<script>
    import {getFaceUser, editFaceUser, faceApproval, getFaceList} from "../../api/api";

    let Base64 = require('js-base64').Base64;

    export default {
        data() {
            return {
                filters: {
                    id: '',
                },

                facelist: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列
                pictureFormVisible: false,
                editFormVisible: false,//编辑界面是否显示
                editLoading: false,

                pictureForm: {
                    info: '',
                },

                //编辑界面数据

                approvalFormVisible: false,//审核界面是否显示
                addLoading: false,
                approvalFormRules: {
                    status: [
                        {required: true, message: '请选择状态', trigger: 'blur'}
                    ]
                },
                //审核界面数据
                approvalForm: {
                    status: '',
                    face_id: '',
                    user: {
                        id: 0,
                        name: '',
                    },
                }

            }
        },
        methods: {

            handleCurrentChange(val) {
                this.page = val;
                this.getList();
            },

            getfaceuser() {
                let para = {};
                let id = this.filters.id;

                getFaceUser(id, para).then((res) => {
                    //向后端发送 获得指定用户人脸信息
                    this.facelist = res.data.data;

                })
            },

            getList() { //向后端请求排班列表
                let para = {};
                //this.listLoading = true;
                getFaceList(para).then((res) => {
                    this.facelist = res.data.data;

                });
            },
            //显示审核页面
            handleApproval: function (row) {
                this.approvalForm = Object.assign({}, row);
                console.log("hahahha");
                this.approvalSubmit();
            },
            //显示编辑更新界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },


            showPicture(row) {
                this.pictureFormVisible = true;
                this.pictureForm = Object.assign({}, row);
            },

            imgUrl() {
                return this.pictureForm.info;
            },
            approvalSubmit: function () {
                //向后端发送审核信息
                let id = this.approvalForm.id;
                let para = {};

                faceApproval(id, para).then((res) => {
                    //向后端发送审核信息
                    this.$message({
                        message: '提交成功',
                        type: 'success'
                    });
                    this.$refs['approvalForm'].resetFields();
                    this.getList();
                })
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
