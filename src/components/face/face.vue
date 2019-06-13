<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.id" placeholder="用户id" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getfaceuser">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      v-loading="listLoading"
      :data="facelist"
      highlight-current-row
      style="width: 100%;"
      @selection-change="selsChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="序号" min-width="100" />
      <el-table-column
        prop="user.name"
        label="姓名"
        min-width="150"
        align="center"
        sortable
      />
      <el-table-column prop="user.id" label="工号" min-width="100" />
      <el-table-column
        prop="status"
        label="状态"
        min-width="150"
        align="center"
        sortable
        :formatter="formatStatus"
      />
      <el-table-column
        prop="status"
        label="人脸信息"
        min-width="200"
        align="center"
        sortable
      >
        <template scope="scope">
          <el-button
            size="small"
            min-width="180"
            align="center"
            sortable
            @click="showPicture(scope.row)"
          >
            查看图片
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="250" align="center">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleApproval(scope.row)"
          >审核</el-button>
        </template>
      </el-table-column>
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

    <el-dialog
      v-model="pictureFormVisible"
      title="人脸"
      :close-on-click-modal="false"
    >
      <el-form ref="pictureForm" :model="pictureForm">
        <img
          id="imginit"
          :src="pictureForm.info"
          alt=""
          align="center"
          width="500px"
          height="500px"
        >
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
import { getFaceUser, faceApproval, getFaceList } from '../../api/api'

const Base64 = require('js-base64').Base64

export default {
  data() {
    return {
      filters: {
        id: ''
      },

      facelist: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], // 列表选中列
      pictureFormVisible: false,
      pictureForm: {
        info: ''
      },

      // 编辑界面数据

      approvalFormVisible: false, // 审核界面是否显示
      approvalFormRules: {
        status: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ]
      },
      // 审核界面数据
      approvalForm: {
        status: '',
        face_id: '',
        user: {
          id: 0,
          name: ''
        }
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

    handleCurrentChange(val) {
      this.page = val
      this.getList()
    },

    getfaceuser() {
      if (this.filters.id === '') {
        this.getList()
      } else {
        const para = {}
        const id = this.filters.id
        this.listLoading = true
        getFaceUser(id, para).then((res) => {
          // 向后端发送 获得指定用户人脸信息
          this.listLoading = false
          const data = [0]
          data[0] = res.data.data
          this.facelist = data
        }).catch(err => {
          this.listLoading = false
          const status = err.response.status
          const msg = err.response.data.message
          this.$message({
            message: '获取信息失败，错误信息：' + msg,
            type: 'error'
          })
        })
      }
    },

    getList() { // 向后端请求排班列表
      const para = {}
      this.listLoading = true
      getFaceList(para).then((res) => {
        this.listLoading = false
        this.facelist = res.data.data
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
    // 显示审核页面
    handleApproval: function(row) {
      this.approvalForm = Object.assign({}, row)
      this.approvalSubmit()
    },

    showPicture(row) {
      this.pictureFormVisible = true
      this.pictureForm = Object.assign({}, row)
    },

    imgUrl() {
      return this.pictureForm.info
    },
    approvalSubmit: function() {
      // 向后端发送审核信息
      const id = this.approvalForm.id
      const para = {}

      faceApproval(id, para).then((res) => {
        // 向后端发送审核信息
        this.$message({
          message: '提交成功',
          type: 'success'
        })
        this.$refs['approvalForm'].resetFields()
        this.getList()
      }).catch(err => {
        const status = err.response.status
        const msg = err.response.data.message
        this.$message({
          message: '提交失败，错误信息：' + msg,
          type: 'error'
        })
        this.$refs['approvalForm'].resetFields()
        this.getList()
      })
    },

    selsChange: function(sels) {
      this.sels = sels
    }
  }
}

</script>

<style scoped>
</style>
