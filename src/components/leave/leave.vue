<template>
  <el-form
    ref="form"
    :model="form"
    label-width="80px"
    style="margin:20px;width:60%;min-width:600px;"
    :rules="rules"
    @submit.prevent="onSubmit"
  >
    <el-form-item label="开始时间" prop="start_at">
      <el-col :span="11">
        <el-date-picker
          v-model="form.start_at"
          type="datetime"
          placeholder="选择日期"
          value-format="yyyy-MM-dd HH:mm"
          format="yyyy-MM-dd HH:mm"
          style="width: 100%;"
          @change_start="change_start"
        />
      </el-col>
    </el-form-item>
    <el-form-item label="结束时间" prop="end_at">
      <el-col :span="11">
        <el-date-picker
          v-model="form.end_at"
          type="datetime"
          placeholder="选择日期"
          value-format="yyyy-MM-dd HH:mm"
          format="yyyy-MM-dd HH:mm"
          style="width: 100%;"
          @change_end="change_end"
        />
      </el-col>
    </el-form-item>

    <el-form-item label="请假原因" prop="remark">
      <el-input v-model="form.remark" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="leaverequest">立即创建</el-button>
      <el-button @click.native.prevent>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { LeaveRequest } from '../../api/api'

export default {
  data() {
    return {
      form: {
        start_at: '',
        end_at: '',
        remark: ''
      },
      rules: {
        start_at: [
          { required: true, message: '请选择开始时间', trigger: 'blur' }
        ],
        end_at: [
          { required: true, message: '请选择结束时间', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请填写请假原因', trigger: 'blur' }
        ]

      }
    }
  },
  mounted() {
    this.verify()
  },
  methods: {
    // logout for other page
    logout: function() {
      sessionStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      localStorage.removeItem('role')
      localStorage.removeItem('expired_at')
      this.$router.push('/login')
    },

    verify() {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({ path: '/login' })
      } else {
        const expired_at = localStorage.getItem('expired_at')
        const expired_date = new Date(expired_at)
        const now_date = new Date()
        if (now_date > expired_date) {
          this.$router.push({ path: '/login' })
          this.logout()
        }
      }
    },
    onSubmit() {
      console.log('submit!')
    },
    change_start(val) {
      this.form.start_at = val
    },
    change_end(val) {
      this.form.end_at = val
    },

    leaverequest() {
      const user_id = localStorage.getItem('id')
      const leave_info = {
        start_at: this.form.start_at.toJSON(),
        end_at: this.form.end_at.toJSON(),
        remark: this.form.remark
      }
      console.log(leave_info)
      LeaveRequest(user_id, leave_info).then((res) => {
        this.$message({
          message: '您的请假id是' + res.data.leave_id,
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
        const status = err.response.status
        const msg = err.response.data.message
        this.$message({
          message: '请假失败，错误信息：' + msg,
          type: 'error'
        })
        this.$refs['form'].resetFields()
      }
      )
    }
  }
}

</script>
