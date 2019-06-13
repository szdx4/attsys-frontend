<template>
  <section>
    <!--列表-->
    <el-table
      v-loading="listLoading"
      :data="msgList"
      highlight-current-row
      style="width: 100%;"
      @selection-change="selsChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="序号" align="center" min-width="60" />
      <el-table-column
        prop="from.name"
        label="发送用户"
        align="center"
        min-width="120"
        sortable
      />
      <el-table-column
        prop="title"
        label="标题"
        align="center"
        min-width="180"
        sortable
      />
      <el-table-column
        prop="status"
        label="状态"
        align="center"
        :formatter="formatterStatus"
        min-width="180"
      />
      <el-table-column label="查看具体内容" align="center" min-width="150">
        <template scope="scope">
          <el-button
            size="small"
            @click="handle(scope.row)"
          >点击查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="primary" @click="unreadMsg">{{
        this.button_text
      }}</el-button>
      <el-pagination
        layout="prev, pager, next"
        :page-size="20"
        :total="total"
        style="float:right;"
        @current-change="handleCurrentChange"
      />
    </el-col>

    <el-dialog
      v-model="contentFormVisible"
      title="消息"
      :close-on-click-modal="false"
      @close="closeDialog"
    >
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 15px"> {{ contentForm.title }}</span>
        </div>
        <div>{{ contentForm.content }}</div>
      </el-card>
    </el-dialog>
  </section>
</template>
<script type="text/ecmascript-6">
import { getMsg, getMsgList } from '../../api/api'

export default {
  data() {
    return {
      button_text: '显示未读消息',
      button_status: false,
      contentFormVisible: false,
      contentForm: {
        id: 0,
        from: {
          id: 1, // 用户id
          name: ''
        },
        to: {
          id: 666, //
          name: ''
        },
        title: '',
        status: '', // unread /read
        content: ''
      },
      msg: {
        id: 0,
        from: {
          id: 1, // 用户id
          name: ''
        },
        to: {
          id: 666, //
          name: ''
        },
        title: '',
        status: ''// unread /read
      },

      msgList: [],

      total: 0,
      page: 1,
      listLoading: false

    }
  },
  mounted() {
    this.verify()
    this.getlist()
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
    handle(row) {
      this.contentFormVisible = true
      this.contentForm = Object.assign({}, row)
      const id = row.id
      const para = {}

      getMsg(id, para).then(
        res => {
          // this.contentFormVisible = false;
          this.getlist()
        }
      )// 向后台发送请求，获取指定消息赋值给contentForm
    },
    formatterStatus(row) {
      var St
      if (row.status === 'unread') { St = '未读' } else if (row.status === 'read') { St = '已读' } else St = '未知状态'
      return St
    },

    selsChange: function(sels) {
      this.sels = sels
    },
    closeDialog() {
      this.getlist()
    },

    getlist() {
      // 向后台请求消息列表 getMsgList
      this.listLoading = true

      const para = {}
      if (localStorage.getItem('role') != 'master') {
        para.to_user_id = localStorage.getItem('id')
      }
      getMsgList(para).then(res => {
        this.listLoading = false

        this.msgList = res.data.data
      })
    },
    unreadMsg() {
      if (this.button_status == false) {
        const len = this.msgList.length
        let j = 0
        const newMsgList = []
        for (let i = 0; i < len; i++) {
          if (this.msgList[i].status === 'unread') { newMsgList[j++] = this.msgList[i] }
        }
        this.msgList = newMsgList
        this.button_text = '显示所有消息'
      } else {
        this.getlist()
        this.button_text = '显示未读消息'
      }
      this.button_status = !this.button_status
    }

  }
}
</script>
