<template>
    <section>

        <!--列表-->
        <el-table :data="hoursList" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="user_name" label="姓名" width="360" sortable>
            </el-table-column>
            <el-table-column prop="date" label="日期" width="360" sortable>
            </el-table-column>
            <el-table-column prop="hours" label="工作时长" width="360" sortable>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>

    </section>
</template>
<script>
    import {getHours} from '../../api/api'

    export default {
        data() {
            return {

                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列
                hoursList: [],


            }
        },
        methods: {
            //获取工时列表
            getList() {
                this.listLoading = true;
                getHours().then((res) => {
                    this.hoursList = res.data;
                    this.listLoading = false;
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
