<template>
  <section>

    <!--列表-->
    <template>
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="user_id" placeholder="用户id" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getUser">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-table v-loading="loading" :data="overtimeList" highlight-current-row style="width: 100%;">
        <el-table-column prop="id" align="center" min-width="100" label="序号" sortable />
        <el-table-column prop="user.name" align="center" label="姓名" min-width="150" sortable />
        <el-table-column prop="user.id" align="center" label="工号" min-width="150" sortable />
        <el-table-column
          prop="start_at"
          align="center"
          label="开始时间"
          min-width="180"
          sortable
          :formatter="formatStart_at"
        />
        <el-table-column
          prop="end_at"
          align="center"
          label="结束时间"
          min-width="180"
          sortable
          :formatter="formatEnd_at"
        />
        <el-table-column prop="remark" align="center" label="完成状态" min-width="120" sortable />
        <el-table-column
          prop="status"
          align="center"
          label="状态"
          :formatter="formatStatus"
          min-width="120"
          sortable
        />
        <el-table-column label="操作" min-width="120" sortable>
          <template scope="scope">
            <el-button size="small" @click="handleApproval(scope.row)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24" class="toolbar">
        <el-pagination
          layout="prev, pager, next"
          :page-size="20"
          :total="total"
          style="float:right;"
          @current-change="handleCurrentChange"
        />
      </el-col>

      <el-dialog v-model="editFormVisible" title="审核" :close-on-click-modal="false">
        <el-form ref="editForm" :model="editForm" label-width="80px" :rules="rules">
          <el-form-item label="审核" prop="status">
            <el-radio-group v-model="editForm.status">
              <el-radio class="radio" label="pass">通过</el-radio>
              <el-radio class="radio" label="reject">不通过</el-radio>
              <!--                            <el-radio class="radio" label="wait">暂不决定</el-radio>-->
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" :loading="editLoading" @click.native="editSubmit">提交</el-button>
        </div>
      </el-dialog>

    </template>

  </section>
</template>
<script>
import { getOvertimeUser, OvertimeApproval, getOvertimeList } from '../../api/api'
// import NProgress from 'nprogress'
export default {
  data() {
    return {
      filters: {
        name: ''
      },
      total: 0,
      page: 1,
      user_id: '', // 查询用
      listLoading: false,
      sels: [], // 列表选中列
      loading: false,
      overtimeList: [],
      editLoading: false,
      editFormVisible: false,
      editForm: {
        id: 0,
        status: ''
      },
      rules: {
        status: [
          { required: true, message: '请选择审核意见', trigger: 'blur' }
        ]
      }

    }
  },
  mounted() {
    this.verify()
    this.getList()
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

    getUser() {
      const id = this.user_id
      const para = {}
      getOvertimeUser(id, para).then((res) => {
        // 向后台发送请求，获取指定用户加班信息 this.user_id
        this.overtimeList = res.data.data
      })
    },
    handleApproval: function(row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
    },
    // 获取列表
    getList: function() {
      const para = {}
      this.loading = true

      getOvertimeList(para).then((res) => {
        // 向后端请求列表
        this.overtimeList = res.data.data
      })
      this.loading = false
    },
    handleCurrentChange(val) {
      this.page = val
      this.getList()
    },
    selsChange: function(sels) {
      this.sels = sels
    },

    formatStart_at(row) {
      var t = new Date(row.start_at)
      return t.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false })
    },
    formatEnd_at(row) {
      var t = new Date(row.end_at)
      return t.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false })
    },

    formatStatus(row) {
      if (row.status == 'wait') { return '等待审核' } else if (row.status == 'pass') { return '通过' } else if (row.status == 'reject') { return '拒绝' } else return '未知状态'
    },
    editSubmit: function() {
      // 向后台发送审核信息
      const id = this.editForm.id
      const para = {
        status: this.editForm.status
      }
      OvertimeApproval(id, para).then(res => {
        this.$message({
          message: '审批成功',
          type: 'success'
        })
        this.$refs['editForm'].resetFields()
        this.editFormVisible = false
        this.getList()
      }).catch(err => {
        msg = err.response.data.message
        this.$message({
          message: '审批失败，错误信息：' + msg,
          type: 'error'
        })
        this.$refs['editForm'].resetFields()
        this.editFormVisible = false
        this.getList()
      })
    }
  }
}

</script>

<style scoped>

</style>
