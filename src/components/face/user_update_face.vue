<template>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" >
            <el-button type="primary" v-on:click="openCam">打开摄像头</el-button>
            <el-form-item>
                <video id="video" width="500px" height="500px" autoplay="autoplay"></video>
                <canvas id="canvas" width="500px" height="500px"></canvas>
                <!--                <el-button type="primary" v-on:click="getMedia">开启摄像头</el-button>-->
                <el-button type="primary" v-on:click="update">使用照片</el-button><!--上传--->
                <el-button type="primary" v-on:click="takePhoto">拍照</el-button>
            </el-form-item>
        </el-form>
    </el-col>
</template>

<script>
    export default {
        data() {
            return {
                name: "user_update_face",
                imageData:'',
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
                    video: {width: 500, height: 500},
                    audio: true
                };
                let video = document.getElementById("video");
                let promise = navigator.mediaDevices.getUserMedia(constraints);
                promise.then(function (MediaStream) {
                    video.srcObject = MediaStream;
                    video.play();
                });

            },
            update(){
                let video = document.getElementById("video");

            },

            takePhoto() {
                let video = document.getElementById("video");
                let canvas = document.getElementById("canvas");
                let ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, 500, 500);
                this.imageData = canvas.toDataURL();
            },


        },


    }

</script>

<style scoped>

</style>
