<template>
  <section>
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
      :data="shiftList"
      highlight-current-row
      style="width: 100%;"
      @selection-change="selsChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="序号" align="center" min-width="60" />
      <el-table-column
        prop="user.name"
        label="姓名"
        min-width="100"
        align="center"
        sortable
      />
      <el-table-column
        prop="start_at"
        label="开始时间"
        min-width="200"
        align="center"
        :formatter="formatStart_at"
        sortable
      />
      <el-table-column
        prop="end_at"
        label="结束时间"
        min-width="200"
        align="center"
        :formatter="formatEnd_at"
        sortable
      />
      <el-table-column
        prop="type"
        label="类型"
        min-width="100"
        align="center"
        sortable
      />
      <el-table-column
        prop="status"
        label="状态"
        min-width="180"
        align="center"
        sortable
      />
      <el-table-column label="操作" align="center" width="180">
        <template scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="handleEdit(scope.row)"
          >修改</el-button>
          <el-button
            type="danger"
            size="small"
            @click="handleDel(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="primary" @click="handleAdd">添加指定员工排班</el-button>
      <el-button
        type="primary"
        @click="handleAddDepartment"
      >添加部门排班</el-button>
      <el-button
        type="primary"
        :hidden="allshiftVisible"
        @click="handleAddall"
      >添加全单位排班</el-button>
      <el-pagination
        layout="prev, pager, next"
        :page-size="20"
        :total="total"
        style="float:right;"
        @current-change="handleCurrentChange"
      />
    </el-col>

    <!--新增界面-->
    <el-dialog
      v-model="addFormVisible"
      title="新增"
      :close-on-click-modal="false"
    >
      <el-form
        ref="addForm"
        :model="addForm"
        label-width="80px"
        :rules="addFormRules"
      >
        <el-form-item label="员工id" prop="user.id">
          <el-input v-model="addForm.user.id" />
        </el-form-item>
        <el-form-item label="开始时间" prop="start_at">
          <el-col :span="11">
            <el-date-picker
              v-model="addForm.start_at"
              type="datetime"
              placeholder="选择日期"
              value-format="yyyy-MM-dd HH:mm"
              format="yyyy-MM-dd HH:mm"
              style="width: 100%;"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="结束时间" prop="end_at">
          <el-col :span="11">
            <el-date-picker
              v-model="addForm.end_at"
              type="datetime"
              placeholder="选择日期"
              value-format="yyyy-MM-dd HH:mm"
              format="yyyy-MM-dd HH:mm"
              style="width: 100%;"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="排班类型" prop="type">
          <el-radio-group v-model="addForm.type">
            <el-radio-button label="normal">正常</el-radio-button>
            <el-radio-button label="allovertime">额外</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          :loading="addLoading"
          @click.native="addSubmit"
        >提交</el-button>
      </div>
    </el-dialog>

    <!--新增部门排班界面-->
    <el-dialog
      v-model="addDepartmentFormVisible"
      title="新增"
      :close-on-click-modal="false"
    >
      <el-form
        ref="addDepartmentForm"
        :model="addDepartmentForm"
        label-width="80px"
        :rules="addDepartmentFormRules"
      >
        <el-form-item label="部门id" prop="department_id">
          <el-input v-model="addDepartmentForm.department_id" />
        </el-form-item>
        <el-form-item label="开始时间" prop="start_at">
          <el-col :span="11">
            <el-date-picker
              v-model="addDepartmentForm.start_at"
              type="datetime"
              placeholder="选择日期"
              value-format="yyyy-MM-dd HH:mm"
              format="yyyy-MM-dd HH:mm"
              style="width: 100%;"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="结束时间" prop="end_at">
          <el-col :span="11">
            <el-date-picker
              v-model="addDepartmentForm.end_at"
              type="datetime"
              placeholder="选择日期"
              value-format="yyyy-MM-dd HH:mm"
              format="yyyy-MM-dd HH:mm"
              style="width: 100%;"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="排班类型" prop="type">
          <el-radio-group v-model="addDepartmentForm.type">
            <el-radio-button label="normal">正常</el-radio-button>
            <el-radio-button label="allovertime">额外</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click.native="addDepartmentFormVisible = false"
        >取消</el-button>
        <el-button
          type="primary"
          :loading="addDepartmentloading"
          @click.native="addDepartmentSubmit"
        >提交
        </el-button>
      </div>
    </el-dialog>

    <!--新增全单位排班界面-->
    <el-dialog
      v-model="allshiftFormVisible"
      title="新增"
      :close-on-click-modal="false"
    >
      <el-form
        ref="allshiftForm"
        :model="allshiftForm"
        label-width="80px"
        :rules="allshiftFormRules"
      >
        <el-form-item label="开始时间" prop="start_at">
          <el-col :span="11">
            <el-date-picker
              v-model="allshiftForm.start_at"
              type="datetime"
              placeholder="选择日期"
              value-format="yyyy-MM-dd HH:mm"
              format="yyyy-MM-dd HH:mm"
              style="width: 100%;"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="结束时间" prop="end_at">
          <el-col :span="11">
            <el-date-picker
              v-model="allshiftForm.end_at"
              type="datetime"
              placeholder="选择日期"
              value-format="yyyy-MM-dd HH:mm"
              format="yyyy-MM-dd HH:mm"
              style="width: 100%;"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="排班类型" prop="type">
          <el-radio-group v-model="allshiftForm.type">
            <el-radio-button label="normal">正常</el-radio-button>
            <el-radio-button label="allovertime">额外</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="allshiftFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click.native="addshiftSubmit"
        >提交
        </el-button>
      </div>
    </el-dialog>
    <!--编辑排班界面-->
    <el-dialog
      v-model="editFormVisible"
      title="修改"
      :close-on-click-modal="false"
    >
      <el-form
        ref="editForm"
        :model="editForm"
        label-width="80px"
        :rules="editFormRules"
      >
        <el-form-item label="开始时间" prop="start_at">
          <el-col :span="11">
            <el-date-picker
              v-model="editForm.start_at"
              type="datetime"
              placeholder="选择日期"
              value-format="yyyy-MM-dd HH:mm"
              format="yyyy-MM-dd HH:mm"
              style="width: 100%;"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="结束时间" prop="end_at">
          <el-col :span="11">
            <el-date-picker
              v-model="editForm.end_at"
              type="datetime"
              placeholder="选择日期"
              value-format="yyyy-MM-dd HH:mm"
              format="yyyy-MM-dd HH:mm"
              style="width: 100%;"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="修改类型" prop="effect">
          <el-radio-group v-model="editForm.effect">
            <el-radio-button label="temp">临时修改</el-radio-button>
            <el-radio-button label="all temp">永久修改</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit">提交 </el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { getDepartmentList, addDepartment, deletDepartment, editDepartment, getDepartment } from '../../api/api'
import { getShiftList, addShift, deletShift, editShift, addDepartmentShift, Allshift } from '../../api/api'

export default {
  data() {
    return {
      filters: {
        name: ''
      },
      shiftList: [],
      total: 0,
      start_at: '',
      end_at: '',
      allshiftVisible: localStorage.getItem('role') === 'master',
      allshiftFormVisible: false,
      editFormVisible: false,
      editForm: {
        id: '',
        start_at: '',
        end_at: '',
        effect: ''
      },
      editFormFormRules: {
        start_at: [
          { type: 'date', required: true, message: '请选择开始时间', trigger: 'change' }
        ],
        end_at: [{
          type: 'date', required: true, message: '请选择结束时间', trigger: 'blur'
        }],
        effect: [{
          required: true, message: '请选择修改类型', trigger: 'blur'
        }]
      },

      page: 1,
      listLoading: false,
      sels: [], // 列表选中列

      // 编辑界面数据

      addFormVisible: false, // 新增界面是否显示
      addLoading: false,
      addFormRules: {
        'user.id': [
          { required: true, message: '请填写用户id', trigger: 'blur' }
        ],
        start_at: [
          { type: 'date', required: true, message: '请选择开始时间', trigger: 'change' }
        ],
        end_at: [{
          type: 'date', required: true, message: '请选择结束时间', trigger: 'blur'
        }],
        type: [{
          required: true, message: '请选择排班类型', trigger: 'blur'
        }]
      },
      // 新增界面数据
      addForm: {
        start_at: '',
        end_at: '',
        type: '',
        user: {
          id: '',
          name: ''
        }
      },

      addDepartmentFormVisible: false,
      addDepartmentloading: false,
      addDepartmentFormRules: {
        department_id: [
          { required: true, message: '请填写部门id', trigger: 'blur' }
        ],
        start_at: [
          { type: 'date', required: true, message: '请选择开始时间', trigger: 'blur' }
        ],
        end_at: [
          {
            type: 'date', required: true, message: '请选择结束时间', trigger: 'blur'
          }],
        type: [{
          required: true, message: '请选择排班类型', trigger: 'blur'
        }]
      },
      addDepartmentForm: {
        start_at: '',
        end_at: '',
        type: '',
        department_id: ''
      },
      allshiftForm: {
        start_at: '',
        end_at: '',
        type: ''
      },
      allshiftFormRules: {
        start_at: [
          { type: 'date', required: true, message: '请选择开始时间', trigger: 'change' }
        ],
        end_at: [{
          type: 'date', required: true, message: '请选择结束时间', trigger: 'blur'
        }],
        type: [{
          required: true, message: '请选择排班类型', trigger: 'blur'
        }]
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
    typeformatter(row) {
      if (row.type == 'normal') { return '正常' } else if (row.type == 'allovertime') { return '额外' } else return '未知类型'
    },
    statusformatter() {

    },
    handleEdit(row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
    },

    handleCurrentChange(val) {
      this.page = val
      this.getUsers()
    },
    getdepartment() {
      const para = {}
      getDepartment(para).then((res) => { // 向后端发送 获得指定部门排班的请求

      })
    },
    formatStart_at(row) {
      var t = new Date(row.start_at)
      return t.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false })
    },
    formatEnd_at(row) {
      var t = new Date(row.end_at)
      return t.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false })
    },

    getList() { // 向后端请求排班列表
      this.loading = true

      const para = {}
      getShiftList(para).then((res) => {
        this.shiftList = res.data.data
      })
      this.loading = false
    },
    getUser() {
      var start_at = this.start_at
      var end_at = this.end_at
      if ((start_at == '') && (end_at == '')) { return this.getList() } else {
        var len = this.shiftList.length
        var newshiftList = new Array()
        var j = 0
        for (var i = 0; i < len; i++) {
          var date = new Date(Date.parse(this.shiftList[i].start_at))// 字符串转日期格式
          if ((date >= start_at) && (date <= end_at)) { newshiftList[j] = this.shiftList[i] }
          j++
        }
      }
      this.shiftList = newshiftList
      return this.shiftList
    },
    // 删除
    handleDel: function(row) { // 向后端发送删除信息 row.id
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        // loading 开始
        this.listLoading = true

        const id = row.id
        const para = {}
        deletShift(id, para).then((res) => {
          // loading 结束
          this.listLoading = false

          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getList()
        })
      }).catch(err => {
        // loading 结束
        this.listLoading = false

        const msg = err.response.data.message
        this.$message({
          message: '删除失败，错误信息：' + err.response.data.message,
          type: 'error'
        })
        this.getList()
      })
    },
    // 显示新增界面
    handleAdd: function() {
      this.addFormVisible = true
    },

    handleAddDepartment: function() {
      this.addDepartmentFormVisible = true
    },
    handleAddall: function() {
      this.allshiftFormVisible = true
    },

    // 新增
    addSubmit: function() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true
            const id = this.addForm.user.id
            const para = {
              start_at: this.addForm.start_at.toJSON(),
              end_at: this.addForm.end_at.toJSON(),
              type: this.addForm.type

            }
            addShift(id, para).then((res) => {
              // 向后端发送新增部门信息
              this.addLoading = false

              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$refs['addForm'].resetFields()
              this.addFormVisible = false
              this.getList()
            }).catch(err => {
              // 向后端发送新增部门信息
              this.addLoading = false

              const msg = err.response.data.message
              this.$message({
                message: '提交失败，错误信息：' + msg,
                type: 'error'
              })
              this.$refs['addForm'].resetFields()
              // this.addFormVisible = false;
              // this.getList();
            })
          })
        }
      })
    },

    editSubmit: function() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            const id = this.editForm.id
            const para = {
              start_at: this.editForm.start_at.toJSON(),
              end_at: this.editForm.end_at.toJSON(),
              effect: this.editForm.effect
            }
            editShift(id, para).then((res) => {
              // 向后端发送新增部门信息

              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$refs['editForm'].resetFields()
              this.editFormVisible = false
              this.getList()
            }).catch(err => {
              // 向后端发送新增部门信息

              const msg = err.response.data.message
              this.$message({
                message: '提交失败，错误信息：' + msg,
                type: 'error'
              })
              this.$refs['editForm'].resetFields()
              // this.addFormVisible = false;
              // this.getList();
            })
          })
        }
      })
    },
    addDepartmentSubmit: function() {
      this.$refs.addDepartmentForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            // loading 开始
            this.addDepartmentloading = true

            const id = this.addDepartmentForm.department_id

            const para = {
              start_at: this.addDepartmentForm.start_at.toJSON(),
              end_at: this.addDepartmentForm.end_at.toJSON(),
              type: this.addDepartmentForm.type
            }
            addDepartmentShift(id, para).then((res) => {
              // loading 结束
              this.addDepartmentloading = false

              // 向后端发送新增部门信息
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$refs['addDepartmentForm'].resetFields()
              this.addDepartmentFormVisible = false
              this.getList()
            }).catch(err => {
              // loading 结束
              this.addDepartmentloading = false

              // 向后端发送新增部门信息
              const msg = err.response.data.message
              this.$message({
                message: '提交失败，错误信息：' + msg,
                type: 'error'
              })
              this.addDepartmentFormVisible = false
              this.getList()
            })
          })
        }
      })
    },
    addshiftSubmit: function() {
      this.$refs.allshiftForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            // loading 开始
            const para = {
              start_at: this.allshiftForm.start_at.toJSON(),
              end_at: this.allshiftForm.end_at.toJSON(),
              type: this.allshiftForm.type

            }
            Allshift(para).then((res) => {
              // loading 结束

              // 向后端发送新增部门信息
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$refs['allshiftForm'].resetFields()
              this.allshiftFormVisible = false
              this.getList()
            }).catch(err => {
              // loading 结束

              // 向后端发送新增部门信息
              const msg = err.response.data.message
              this.$message({
                message: '提交失败，错误信息：' + msg,
                type: 'error'
              })
              this.allshiftFormVisible = false
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
