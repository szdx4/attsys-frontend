<template>
  <section>

    <!--列表-->
    <el-table
      v-loading="listLoading"
      :data="departments"
      highlight-current-row
      style="width: 100%;"
      @selection-change="selsChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" min-width="60" label="id" align="center" sortable />
      <el-table-column prop="name" label="部门名称" min-width="250" align="center" sortable />
      <el-table-column prop="detail" label="详细信息" min-width="250" align="center" sortable>
        <template scope="scope">
          <el-button size="small" @click="handleDetail(scope.row)">点击查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center" sortable>
        <template scope="scope">
          <el-button size="small" @click="handleEdit( scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="primary" @click="handleAdd">新增部门</el-button>
      <el-pagination
        layout="prev, pager, next"
        :page-size="20"
        :total="total"
        style="float:right;"
        @current-change="handleCurrentChange"
      />
    </el-col>

    <!--编辑界面-->
    <el-dialog v-model="editFormVisible" title="编辑" :close-on-click-modal="false">
      <el-form ref="editForm" :model="editForm" label-width="80px" :rules="editFormRules">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="editForm.name" auto-complete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" :loading="editLoading" @click.native="editSubmit">提交</el-button>
      </div>
    </el-dialog>
    <!--详细信息界面-->
    <el-dialog v-model="detailFormVisible" title="编辑" :close-on-click-modal="false">
      <el-form ref="editForm" :model="detailForm" label-width="80px">
        <el-form-item label="部门id:" prop="name">
          <el-form-item :label="detailForm.id" />
        </el-form-item>
        <el-form-item label="部门名称: " prop="name">
          <el-form-item :label="detailForm.name" />
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--新增界面-->
    <el-dialog v-model="addFormVisible" title="新增" :close-on-click-modal="false">
      <el-form ref="addForm" :model="addForm" label-width="80px" :rules="addFormRules">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="addForm.name" auto-complete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" :loading="addLoading" @click.native="addSubmit">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { getDepartmentList, addDepartment, deletDepartment, editDepartment, getDepartment } from '../../api/api'

export default {
  data() {
    return {
      filters: {
        id: ''
      },
      departments: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], // 列表选中列

      editFormVisible: false, // 编辑界面是否显示
      editLoading: false,
      editFormRules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ]
      },
      // 具体信息界面数据
      editForm: {
        id: 0,
        name: ''
      },
      detailFormVisible: false,
      detailForm: {
        id: 0,
        name: ''
      },

      addFormVisible: false, // 新增界面是否显示
      addLoading: false,
      addFormRules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ]
      },
      // 新增界面数据
      addForm: {
        name: ''
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

    getdepartment() {
      const para = {}
      const id = this.filters.id
      this.listLoading = true
      getDepartment(id, para).then((res) => {
        this.listLoading = false
        this.departments = res.data.data
      }).catch(err => {
        this.listLoading = false
        const status = err.response.status
        const msg = err.response.data.message
        this.$message({
          message: '获取信息失败，错误信息：' + msg,
          type: 'error'
        })
      })
    },

    getList() {
      // 向后端请求部门列表
      const para = {}
      this.listLoading = true
      getDepartmentList(para).then((res) => {
        this.listLoading = false
        this.departments = res.data.data
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
    // 删除
    handleDel: function(row) { // 向后端发送删除信息 获取id的话直接row.id
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        const id = row.id
        const para = {}
        deletDepartment(id, para).then((res) => {
          this.listLoading = false
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getList()
        }).catch(err => {
          this.listLoading = false
          const status = err.response.status
          const msg = err.response.data.message
          this.$message({
            message: '删除失败，错误信息：' + msg,
            type: 'error'
          })
        })
      })
    },

    handleDetail: function(row) {
      this.detailFormVisible = true
      this.detailForm = Object.assign({}, row)
    },

    // 显示编辑界面
    handleEdit: function(row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
    },
    // 显示新增界面
    handleAdd: function() {
      this.addFormVisible = true
      this.addForm = {
        name: '',
        manager: 1
      }
    },
    // 编辑
    editSubmit: function() {
      const para = {
        name: this.editForm.name
      }
      const id = this.editForm.id
      this.editLoading = true
      editDepartment(id, para).then((res) => {
        this.editLoading = false
        this.$message({
          message: '提交成功',
          type: 'success'
        })
        this.$refs['editForm'].resetFields()
        this.editFormVisible = false
        this.getList()
      }).catch(err => {
        this.editLoading = false
        const status = err.response.status
        const msg = err.response.data.message
        this.$message({
          message: '提交失败，错误信息：' + msg,
          type: 'error'
        })
        this.$refs['editForm'].resetFields()
        this.editFormVisible = false
        this.getList()
      })
    },
    // 新增
    addSubmit: function() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true

            const para = {
              name: this.addForm.name
            }
            addDepartment(para).then((res) => { // 向后端发送新增部门信息
              this.addLoading = false
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$refs['addForm'].resetFields()
              this.addFormVisible = false
              this.getList()
            }).catch(err => {
              this.addLoading = false
              const status = err.response.status
              const msg = err.response.data.message
              this.$message({
                message: '提交失败，错误信息：' + msg,
                type: 'error'
              })
              this.$refs['addForm'].resetFields()
              this.addFormVisible = false
              this.getList()
            })
          })
        }
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
