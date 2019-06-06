<template>
    <section>

        <!--列表-->
        <template>
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
            <el-table :data="overtimeList" highlight-current-row v-loading="loading" style="width: 100%;">
                <el-table-column type="index" width="60">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="180" sortable>
                </el-table-column>
                <el-table-column prop="start_at" label="开始时间" width="180"  sortable>
                </el-table-column>
                <el-table-column prop="end_at" label="结束时间" width="180"  sortable>
                </el-table-column>
                <el-table-column prop="remark" label="完成状态" width="180" sortable>>
                </el-table-column>
                <el-table-column prop="status" label="状态" width="180"  sortable>
                </el-table-column>
                <el-table-column label="操作" width="180" sortable>
                    <template scope="scope">
                        <el-button size="small" @click="statusEdit_pass">通过</el-button>
                        <el-button size="small" @click="statusEdit_reject">不通过</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-col :span="24" class="toolbar">
                <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
                </el-pagination>
            </el-col>
        </template>

    </section>
</template>
<script>
    import { getOvertimeUser,OvertimeApproval ,getOvertimeList } from '../../api/api';
    //import NProgress from 'nprogress'
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
                loading: false,
                overtimeList: [
                ],
            }
        },
        methods: {
           //获取指定用户
            getUser(){
              let para ={

              }  ;
              getOvertimeUser(para).then((res)=>{

              });
            },
            //获取列表
            getList: function () {
                // let para = {
                //     name: this.filters.name
                // };
                // this.loading = true;
                // //NProgress.start();
                // getOvertimeList(para).then((res) => {   //向后端请求列表
                // });
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getList();
            },

            statusEdit_pass(){

            },
            statusEdit_reject(){

            },

        },
        mounted() {
            this.getList();
        }
    };

</script>

<style scoped>

</style>