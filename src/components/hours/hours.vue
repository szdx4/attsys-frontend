<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-date-picker
            v-model="start_at"
            type="datetime"
            placeholder="开始时间"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="end_at"
            type="datetime"
            placeholder="结束时间"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUser">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      v-loading="listLoading"
      :data="hoursList"
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column prop="id" label="id" min-width="60" sortable />
      <el-table-column prop="user.name" label="姓名" align="center" min-width="150" sortable />
      <el-table-column prop="user.id" label="工号" align="center" min-width="150" sortable />
      <el-table-column prop="date" label="日期" align="center" min-width="200" :formatter="dateFormatter" sortable />
      <el-table-column prop="hours" label="工作时长" align="center" min-width="180" sortable />
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination
        layout="prev, pager, next"
        :page-size="20"
        :total="total"
        style="float:right;"
        @current-change="handleCurrentChange"
      />
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
      sels: [], // 列表选中列

      start_at: '',
      end_at: '',

      hoursList: []

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

    // ok
    getList() {
      // 向后台获取工时列表
      this.listLoading = true
      getHours().then((res) => {
        this.listLoading = false
        this.hoursList = res.data.data
      }).catch(err => {
        this.listLoading = false
        const status = err.response.status
        const msg = err.response.data.message
        this.$message({
          message: '获取列表失败，错误信息：' + msg,
          type: 'error'
        })
      })
    },
    dateFormatter(row) {
      const t = new Date(row.date)
      return t.toLocaleDateString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false })
    },
    getUser() {
      const start_at = this.start_at
      const end_at = this.end_at
      if ((start_at === '') && (end_at === '')) { this.getList() } else {
        const para = {
          start_at: start_at.toJSON(),
          end_at: end_at.toJSON()
        }
        getHours(para).then(res => {
          this.hoursList = res.data.data
        }).catch(err => {
          const status = err.response.status
          const msg = err.response.data.message
          this.$message({
            message: '获取信息失败，错误信息：' + msg,
            type: 'error'
          })
        })
      }
    },

    handleCurrentChange(val) {
      this.page = val
      this.getList()
    }

  }
}
</script>

<style scoped>

</style>
