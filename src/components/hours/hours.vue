<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>

                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getList">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="hoursList" highlight-current-row v-loading="listLoading" style="width: 100%;">
            <el-table-column prop="id" label="序号" align="center"  min-width="100" sortable>
            </el-table-column>
            <el-table-column prop="user.name"  align="center" label="姓名" min-width="180" sortable>
            </el-table-column>
            <el-table-column prop="user.id"  align="center" label="工号" min-width="180" sortable>
            </el-table-column>
            <el-table-column prop="date" align="center" label="日期" min-width="200" sortable>
            </el-table-column>
            <el-table-column prop="hours" align="center" label="工作时长" min-width="180" sortable>
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
    export default {
        data() {
            return {

                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列
                hoursList: [
                ],


            }
        },
        methods: {
            //向后端获取工时列表
            selsChange: function (sels) {
                this.sels = sels;
            },
            getList: function () {
                this.loading = true;
                //
                getHours().then((res) => {
                    this.hoursList = res.data;
                    this.loading = false;
                });
            },

            handleCurrentChange(val) {
                this.page = val;
                this.getList();
            },

        },

        mounted() {
            this.getList();
        }
    };
</script>

<style scoped>

</style>
