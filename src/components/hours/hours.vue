<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" >
                <el-form-item >
                    <el-date-picker type="datetime" placeholder="开始时间" value-format="yyyy-MM-dd HH:mm"
                                    format="yyyy-MM-dd HH:mm" v-model="start_at" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item >
                    <el-date-picker type="datetime" placeholder="结束时间" value-format="yyyy-MM-dd HH:mm"
                                    format="yyyy-MM-dd HH:mm" v-model="end_at" style="width: 100%;"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getUser">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="hoursList" highlight-current-row v-loading="listLoading"
                  style="width: 100%;">
            <el-table-column prop="id" label="id" min-width="60" sortable>
            </el-table-column>
            <el-table-column prop="user.name" label="姓名" align="center" min-width="150" sortable>
            </el-table-column>
            <el-table-column prop="user.id" label="工号" align="center" min-width="150" sortable>
            </el-table-column>
            <el-table-column prop="date" label="日期" align="center" min-width="200" :formatter="dateformatter" sortable>
            </el-table-column>
            <el-table-column prop="hours" label="工作时长" align="center" min-width="180" sortable>
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

                start_at:'',
                end_at:'',

                hoursList: [
                ],


            }
        },
        methods: {

            //ok
            getList() {//向后台获取工时列表
                this.loading = true;
                //ok
                getHours().then((res) => {
                    this.hoursList = res.data;
                    this.loading = false;
                });
            },
            dateformatter(row){
               var t = new Date(row.date);
               return t.toLocaleDateString('zh-CN', {timeZone: 'Asia/Shanghai', hour12: false})

            },
            getUser(){
                var start_at = this.start_at;
                var end_at = this.end_at;
                if ((start_at == '') && (end_at == ''))
                    return this.getList();
                else {

                    var len = this.hoursList.length;

                    var newHourList = new Array();
                    var j = 0;
                    for(var i = 0; i < len ; i++){
                       var date = new Date(Date.parse(this.hoursList[i].date.replace(/-/g,"/")))//字符串转日期格式
                        if((date>=start_at)&&(date<=end_at))
                            newHourList[j++] = this.hoursList[i];
                    }
                    return this.hoursList = newHourList;
                }
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
