<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.id" placeholder="id"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getuser">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="users"
      highlight-current-row
      v-loading="listLoading"
      @selection-change="selsChange"
      style="width: 100%;"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        prop="id"
        label="id"
        min-width="150"
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        min-width="150"
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="role"
        label="职务"
        min-width="150"
        align="center"
        :formatter="formatPosition"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="department.id"
        label="部门"
        min-width="150"
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="hours"
        label="工时"
        min-width="150"
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="handleDel(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="20"
        :total="total"
        style="float:right;"
      >
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog
      title="编辑"
      v-model="editFormVisible"
      :close-on-click-modal="false"
    >
      <el-form
        :model="editForm"
        label-width="80px"
        :rules="editFormRules"
        ref="editForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="职务">
          <el-radio-group v-model="editForm.role">
            <el-radio label="master">经理</el-radio>
            <el-radio label="manager">主管</el-radio>
            <el-radio label="user">职员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="工时">
          <el-input v-model="editForm.hours" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click.native="editSubmit"
          :loading="editLoading"
          >提交</el-button
        >
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog
      title="新增"
      v-model="addFormVisible"
      :close-on-click-modal="false"
    >
      <el-form
        :model="addForm"
        label-width="80px"
        :rules="addFormRules"
        ref="addForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="addForm.department" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click.native="addSubmit"
          :loading="addLoading"
          >提交</el-button
        >
      </div>
    </el-dialog>
  </section>
</template>

<script>
import util from '../../common/js/util'
import { getUserList, getUser, removeUser, editUser, addUser } from '../../api/api';

export default {
  data() {
    return {
      filters: {
        id: ''
      },
      users: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [],//列表选中列

      editFormVisible: false,//编辑界面是否显示
      editLoading: false,
      editFormRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      //编辑界面数据
      editForm: {
        id: 0,
        name: '',
        role: '',
        department: 0,
        hours: 0
      },

      addFormVisible: false,//新增界面是否显示
      addLoading: false,
      addFormRules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '姓名长度应大于2个字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 4, max: 10, message: '密码长度应大于4位', trigger: 'blur' }
        ]
      },
      //新增界面数据
      addForm: {
        name: '',
        password: 0,
        department: '',
      },

      batchAddVisible: false,
      batchAddForm: {

      },

    }
  },
  methods: {
    // logout for other page
    logout: function () {
      sessionStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      localStorage.removeItem('role');
      localStorage.removeItem('expired_at');
      this.$router.push('/login');
    },

    verify() {
      let token = localStorage.getItem('token');
      if (!token) {
        this.$router.push({ path: '/login' });
      } else {
        let expired_at = localStorage.getItem('expired_at');
        let expired_date = new Date(expired_at);
        let now_date = new Date();
        if (now_date > expired_date) {
          this.$router.push({ path: '/login' });
          this.logout();
        }

      }

    },
    formatPosition: function (row, column) {
      if (row.role === 'manager')
        return '主管';
      else if (row.role === 'master')
        return '经理';
      else return '员工';
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    },
    getuser() {
      if (this.filters.id === '')
        this.getUsers();
      else {
        let para = {};
        let user_id = parseInt(this.filters.id);
        this.listLoading = true;
        getUser(user_id, para).then((res) => {
          this.listLoading = false;
          let data = [0,];
          data[0] = res.data.data;
          this.users = data
        }).catch((err) => {
          this.listLoading = false;
          let status = err.response.status;
          let msg = err.response.data.message;
          this.$message({
            message: '获取用户信息，错误信息：' + msg,
            type: 'error'
          });
        });
      }

    },
    //获取用户列表
    getUsers() {
      this.listLoading = true;
      getUserList().then((res) => {
        this.users = res.data.data;
        this.listLoading = false;

      }).catch((err) => {
        this.listLoading = false;
        let status = err.response.status;
        let msg = err.response.data.message;
        this.$message({
          message: '获取用户列表失败，错误信息：' + msg,
          type: 'error'
        });
      });
    },
    //删除
    handleDel: function (row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
        let id = row.id;
        let para = {};
        removeUser(id, para).then((res) => {
          this.listLoading = false;
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getUsers();
        }).catch((err) => {
          this.listLoading = false;
          let status = err.response.status;
          let msg = err.response.data.message;
          this.$message({
              message: '删除失败，错误信息：' + msg,
              type: 'error'
          });
        });
      });
    },
    //显示编辑界面
    handleEdit: function (row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    //显示新增界面
    handleAdd: function () {
      this.addFormVisible = true;
      this.addForm = {
        name: '',
        sex: -1,
        age: 0,
        role: '',
        addr: ''
      };
    },
    //编辑
    editSubmit: function () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true;
            let para = {
              name: this.editForm.name,
              department: this.editForm.department.id,
              role: this.editForm.role,
              hours: parseInt(this.editForm.hours)
            };
            let id = this.editForm.id;
            // console.log(para);
            editUser(id, para).then((res) => {
              this.editLoading = false;
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$refs['editForm'].resetFields();
              this.editFormVisible = false;
              this.getUsers();
            }).catch((err) => {
              this.editLoading = false;
              let status = err.response.status;
              let msg = err.response.data.message;
              this.$message({
                  message: '提交失败，错误信息：' + msg,
                  type: 'error'
              });
              this.$refs['editForm'].resetFields();
              this.editFormVisible = false;
              this.getUsers();
            });
          });
        }
      });
    },
    //新增
    addSubmit: function () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true;
            let para = {
              name: this.addForm.name,
              password: this.addForm.password,
              department: parseInt(this.addForm.department)
            };
            addUser(para).then((res) => {
              this.addLoading = false;
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$refs['addForm'].resetFields();
              this.addFormVisible = false;
              this.getUsers();
            }).catch((err) => {
              this.addLoading = false;
              let status = err.response.status;
              let msg = err.response.data.message;
              this.$message({
                  message: '提交失败，错误信息：' + msg,
                  type: 'error'
              });
              this.$refs['addForm'].resetFields();
              this.addFormVisible = false;
              this.getUsers();
            });
          });
        }
      });
    },
    //批量增加
    handleBatchAdd() {
      this.batchAddVisible = true;
    },
    batchAdd(_file) {
      var reader = new FileReader();
      var file = _file;
      console.log(file)
      console.log(reader.readAsText(file, 'utf-8'));
      var file_upload = Base64.encode(reader.readAsText(file, 'utf-8'));
      console.log(file_upload);

    },


    selsChange: function (sels) {
      this.sels = sels;
    },
  },
  mounted() {
    this.verify();
    this.getUsers();
  }
}

</script>

<style scoped>
</style>
