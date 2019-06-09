<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input v-model="msg.id" placeholder="消息id"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getMsg">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="leaveList" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="id" label="序号" align="center" min-width="60">
            </el-table-column>
            <el-table-column prop="user.name" label="发送用户" align="center" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="user.id" label="工号" align="center" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="start_at" label="开始时间" align="center" min-width="180" :formatter="formatStart_at" sortable>
            </el-table-column>
            <el-table-column prop="end_at" label="结束时间" align="center" min-width="180" :formatter="formatEnd_at" sortable>
            </el-table-column>
            <el-table-column prop="status" label="状态" align="center" :formatter="statusFormatter" min-width="100"
                             sortable>
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="100">
                <template scope="scope">
                    <el-button size="small" @click="statusEdit(scope.$index, scope.row)">审核</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <el-dialog title="审核" v-model="statusFormVisible" :close-on-click-modal="false">
            <el-form :model="statusForm" label-width="80px" :rules="statusFormRules" ref="statusForm">
                <el-form-item label="工号" prop="id" align="left">
                    <el-form-item :label="statusForm.user.id.toString()" auto-complete="off"></el-form-item>
                </el-form-item>
                <el-form-item label="姓名" prop="name" align="left">
                    <el-form-item :label="statusForm.user.name" auto-complete="off"></el-form-item>
                </el-form-item>
                <el-form-item label="请假原因" prop="remark">
                    <el-form-item :label="statusForm.remark" auto-complete="off"></el-form-item>
                </el-form-item>
                <el-form-item label="审核" prop="status">
                    <el-radio-group v-model="statusForm.status" >
                        <el-radio class="radio" label="pass">通过</el-radio>
                        <el-radio class="radio" label="reject">不通过</el-radio>
                        <el-radio class="radio" label="wait">暂不决定</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click.native="statusFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script type="text/ecmascript-6">
    import {getMsg,getMsgList} from "../../api/api";

    export default {
        data() {
            return {
                msg:{
                    id:0,
                    from:{
                        id:1,//用户id
                        name:'',
                    },
                    to:{
                        id:666,//
                        name:'',
                    },
                    title:'',
                    status:'',//unread /read
                },//从后台获取的消息
                total:'',
                page:1,

            }
        },
        methods:{
          getMsg(){

          }  ,
        },
    }
</script>