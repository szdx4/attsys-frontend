<template>
    <el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit"
             style="margin:20px;width:60%;min-width:600px;" :rules="rules">
        <el-form-item label="开始时间" prop="start_at">
            <el-col :span="11">
                <el-date-picker type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm"
                                format="yyyy-MM-dd HH:mm" v-model="form.start_at" style="width: 100%;"
                                @change_start="change_start"></el-date-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="结束时间" prop="end_at">
            <el-col :span="11">
                <el-date-picker type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm"
                                format="yyyy-MM-dd HH:mm" v-model="form.end_at" style="width: 100%;"
                                @change_end="change_end"></el-date-picker>
            </el-col>
        </el-form-item>

        <el-form-item label="请假原因" prop="remark">
            <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="leaverequest">立即创建</el-button>
            <el-button @click.native.prevent>取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {LeaveRequest} from '../../api/api'

    export default {
        data() {
            return {
                form: {
                    start_at: '',
                    end_at: '',
                    remark: '',
                },
                rules:{
                    start_at:[
                        { required: true, message: '请选择开始时间', trigger: 'blur'}
                    ],
                    end_at:[
                        { required: true, message: '请选择结束时间', trigger: 'blur'}
                    ],
                    remark:[
                        { required: true, message: '请填写请假原因', trigger: 'blur'}
                    ]

                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            change_start(val) {
                this.form.start_at = val;
            },
            change_end(val) {
                this.form.end_at = val;
            },

            leaverequest() {
                let user_id = 1;
                let leave_info = {
                    start_at: this.form.start_at.toJSON(),
                    end_at: this.form.end_at.toJSON(),
                    remark: this.form.remark
                };
                console.log(leave_info);
                LeaveRequest(user_id, leave_info).then((res) => {
                    if (res.status !== 201) {
                        this.$message({
                            message: '错误！',
                            type: 'error'
                        });
                    }
                    else{
                        this.message({
                            message: '您的请假id是' + res.data.leave_id
                        })
                    }
                });
            }
        }
    }

</script>
