<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <icon name="team" class="card-panel-icon"></icon>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            用户数
          </div>
          <count-to
            :start-val="0"
            :end-val="usersCount"
            :duration="4000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <icon name="check-circle" class="card-panel-icon"></icon>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            已签到
          </div>
          <count-to
            :start-val="0"
            :end-val="signedCount"
            :duration="3000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <icon name="frown" class="card-panel-icon"></icon>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            迟到
          </div>
          <count-to
            :start-val="0"
            :end-val="latedCount"
            :duration="3200"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <icon name="info-circle" class="card-panel-icon"></icon>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            请假
          </div>
          <count-to
            :start-val="0"
            :end-val="leavedCount"
            :duration="3600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :span="24" class="toolbar">
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="userHoursForm.id" placeholder="用户 ID"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            type="datetime"
            placeholder="选择起始时间"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
            v-model="userHoursForm.start_at"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            type="datetime"
            placeholder="选择结束时间"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
            v-model="userHoursForm.end_at"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUserHours"
            >查询用户工时</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import countTo from 'vue-count-to'
import { requestStatusUser, requestStatusSign, requestStatusUserHours } from "@/api/api";
export default {
  components: { countTo },
  methods: {
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
        } else {
          this.$router.push({ path: '/main' });
        }
      }
    },
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    getData() {
      requestStatusUser().then(res => {
        this.usersCount = res.data.users
      })
      requestStatusSign().then(res => {
        this.signedCount = res.data.signed
        this.latedCount = res.data.lated
        this.leavedCount = res.data.leaved
      })
    },
    getUserHours() {
      let user_id = this.userHoursForm.id
      let start_at = this.userHoursForm.start_at.toJSON()
      let end_at = this.userHoursForm.end_at.toJSON()
      requestStatusUserHours(user_id, start_at, end_at).then(res => {
        this.$message({
          message: '工作时间：' + res.data.shift_hour + ' 小时，加班时间：' + res.data.overtime_hour + ' 小时',
          type: 'success'
        })
      }).catch(err => {
        this.$message({
          message: '查询失败，错误代码：' + err.response.status,
          type: 'error'
        })
      })
    }
  },
  mounted() {
    this.verify()
    this.getData()
  },
  data() {
    return {
      usersCount: 0,
      signedCount: 0,
      latedCount: 0,
      leavedCount: 0,
      userHoursForm: {
        id: '',
        start_at: '',
        end_at: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
        background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3;
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }
  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;
    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
