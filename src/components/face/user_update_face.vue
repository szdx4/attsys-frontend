<template>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
            <el-form-item>
                <video id="video" width="300px" height="300px" autoplay="autoplay"></video>
                <canvas id="canvas" width="300px" height="300px"></canvas>
                <el-button type="primary" v-on:click="openCam">打开摄像头</el-button>
                <el-button type="primary" v-on:click="takePhoto">使用照片</el-button>
            </el-form-item>
        </el-form>
    </el-col>
</template>

<script>
    import {editFaceUser} from "../../api/api"

    export default {
        data() {
            return {
                name: "user_update_face",
                imageData: '',
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
                    info: this.imageData
                };
                let id = localStorage.getItem('id');
                let status = false;
                editFaceUser(id, para).then(res => {
                    status = true;
                    this.$router.push({path: '/face'});
                    this.$router.go(0);
                });
                if (!status) {
                    this.$message({
                        message: '更新成功！',
                        type: 'success'
                    });
                } else {
                    this.$message({
                        message: '更新失败, 请重试！',
                        type: 'error'
                    });
                }


            },


        },
        mounted() {
            this.verify();
        }


    }

</script>

<style scoped>

</style>
