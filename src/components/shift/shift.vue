<template>
    <section>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="部门名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getdepartment">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="shiftList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="100" sortable>
            </el-table-column>
            <el-table-column prop="start_at" label="开始时间" width="340"  align="center" sortable>
            </el-table-column>
            <el-table-column prop="end_at" label="结束时间" width="340" align="center" sortable>
            </el-table-column>
            <el-table-column prop="type" label="类型" width="150" sortable>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="150" sortable>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

    </section>
</template>
<script>
    import { getHours } from '../../api/api'
    import { getShiftList, addShift, getDepartmentShift} from '../../api/api'
    export default {
        data() {
            return {
                filters: {
                    name: ''
                },

                total: 0,
                addFormVisible: false,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列
                shiftList:[

                ],


            }
        },
        methods: {
            //获取排班列表
            getList: function () {
                let para = {
                };
                getShiftList(para).then((res) =>{   //向后端请求排班列表
                });
            },

            handleCurrentChange(val) {
                this.page = val;
                this.getList();
            },
            handleAdd: function () {
                this.addFormVisible = true;
                this.addForm = {
                    name: '',
                    manager: 1
                };
            },

        },
        mounted() {
            this.getList();
        }
    };
</script>

<style scoped>

</style>
