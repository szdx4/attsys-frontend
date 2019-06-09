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
                <el-table-column type="index" width="100" label="序号">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="150" sortable>
                </el-table-column>
                <el-table-column prop="start_at" label="开始时间" width="180"  sortable>
                </el-table-column>
                <el-table-column prop="end_at" label="结束时间" width="180"  sortable>
                </el-table-column>
                <el-table-column prop="remark" label="完成状态" width="180" sortable>
                </el-table-column>
                <el-table-column prop="status" label="状态" :formatter=formatStatus width="172"  sortable>
                </el-table-column>
                <el-table-column label="操作" width="180" sortable>
                    <template scope="scope">
                        <el-button size="small" @click="handleApproval(scope.$index, scope.row)">审核</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-col :span="24" class="toolbar">
                <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
                </el-pagination>
            </el-col>

            <el-dialog title="审核" v-model="editFormVisible" :close-on-click-modal="false">

                <div slot="footer" class="dialog-footer">
                    <el-button @click.native="editFormVisible = false">取消</el-button>
                    <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
                </div>
            </el-dialog>

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
                editFormVisible:false,
                editForm:{

                },

            }
        },
        methods: {
           //向后台发送请求，获取指定用户加班信息
            getUser(){
              let para ={

              }  ;
              getOvertimeUser(para).then((res)=>{

              });
            },
            handleApproval: function (index, row) {
                this.editFormVisible = true;
                this.editForm =  Object.assign({}, row);
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
            formatStatus(row){
                if (row.status=='wait')
                    return'等待审核';
                else if(row.status=='pass')
                    return'通过';
                else (row.status=='reject')
                    return '拒绝';
            },
            editSubmit: function () {//向后台发送审核信息

            }


        },
        mounted() {
            this.getList();
        }
    };

</script>

<style scoped>

</style>