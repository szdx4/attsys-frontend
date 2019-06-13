<template>
  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
    <el-form :inline="true">
      <el-form-item>
        <video id="video" width="300px" height="300px" autoplay="autoplay" />
        <canvas id="canvas" width="300px" height="300px" />
        <el-button type="primary" @click="openCam">打开摄像头</el-button>
        <el-button type="primary" @click="takePhoto">使用照片</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>

<script>
import { editFaceUser } from '../../api/api'

export default {
  data() {
    return {
      name: 'user_update_face',
      imageData: ''
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
    openCam() {
      const constraints = {
        video: { width: 300, height: 300 },
        audio: false
      }
      const video = document.getElementById('video')
      const promise = navigator.mediaDevices.getUserMedia(constraints)
      promise.then(function(MediaStream) {
        video.srcObject = MediaStream
        video.play()
      })
    },
    takePhoto() {
      const video = document.getElementById('video')
      // video.pause();
      const canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0, 300, 300)
      this.imageData = canvas.toDataURL()
      const para = {
        info: this.imageData
      }
      const id = localStorage.getItem('id')
      editFaceUser(id, para).then(res => {
        // this.$router.push({path: '/face'});
        this.$router.go(0)
        this.$message({
          message: '更新成功！',
          type: 'success'
        })
      }).catch(err => {
        const status = err.response.status
        const msg = err.response.data.message
        this.$message({
          message: '编辑失败，错误信息：' + msg,
          type: 'error'
        })
      })
    }

  }

}

</script>

<style scoped>

</style>
