<template>
    <div class="container clearfix">
        <div class="img-lists1" slot="placeholder">
            <video id="video" width="256px" height="256px" autoplay="autoplay"></video>
            <canvas id="canvas" width="256px" height="256px"></canvas>
        </div>
            <el-button type="primary" v-on:click="openCam">打开摄像头</el-button>
            <el-button type="primary" v-on:click="takePhoto">使用照片</el-button><!--上传-->
        <div class="img-qr" slot="placeholder">
            <img :src=this.$route.params.qrcode>
        </div>
    </div>
</template>

<script>
    import {signFace} from '../../api/api'

    export default {
        data() {
            return {
                name: "user_update_face",
                imageData: '', //base64格式的图片,
                mediaStreamTrack: {},
            };
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
                    this.$router.push({path: '/login'});
                } else {
                    let expired_at = localStorage.getItem('expired_at');
                    let expired_date = new Date(expired_at);
                    let now_date = new Date();
                    if (now_date > expired_date) {
                        this.$router.push({path: '/login'});
                        this.logout();
                    }
                }
            },
            openCam() {
                let constraints = {
                    video: {width: 300, height: 300},
                    audio: false
                };
                let video = document.getElementById("video");
                let promise = navigator.mediaDevices.getUserMedia(constraints);
                promise.then(function (MediaStream) {
                    video.srcObject = MediaStream;
                    video.play();
                    // console.log(video);
                });


            },

            takePhoto() {
                let video = document.getElementById("video");
                // video.pause();
                let canvas = document.getElementById("canvas");
                let ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, 300, 300);
                this.imageData = canvas.toDataURL();

                let para = {
                    face: this.imageData
                };
                signFace(para).then(res => {
                    this.$message({
                        message: '签到成功',
                        type: 'success'
                    });
                    this.$router.push({path: '/main'});
                    this.$router.go(0);
                }).catch(err => {
                    let status = err.response.status;
                    let msg = err.response.data.message;
                    this.$message({
                        message: '签到失败，错误信息：' + msg,
                        type: 'error'
                    });
                    this.$router.push({path: '/main'});
                    this.$router.go(0);
                });
            },
        },
        mounted() {
            this.verify();
        }
    }

</script>

<style type="text/css">
    .container {
        width: 100%;
    }

    .img-lists1 {
        float: left;
        width: 256px;
        height: 256px;
    }

    .img-lists2 {
        float: right;
        width: 256px;
        height: 256px;
    }

    .img-qr {
        float: right;
        width: 256px;
        height: 256px;

    }

    .img-lists img {
        width: 100%;
        height: 100%;
        display: block;
    }

    .clearfix:after {
        content: '';
        display: block;
        clear: both;
        height: 0;
        visibility: hidden;
    }
</style>
