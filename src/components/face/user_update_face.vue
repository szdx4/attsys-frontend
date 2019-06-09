<template>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
            <el-form-item>
                <video id="video" width="500px" height="500px" autoplay="autoplay"></video>
                <canvas id="canvas" width="500px" height="500px"></canvas>
                <!--                <el-button type="primary" v-on:click="getMedia">开启摄像头</el-button>-->
                <el-button type="primary" v-on:click="takePhoto">拍照</el-button>
                <el-button type="primary" v-on:click="takePhoto">使用照片</el-button>
            </el-form-item>
        </el-form>
    </el-col>
</template>

<script>
    export default {
        data() {
            return {
                name: "user_update_face",
            };
        },
        methods: {
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
            closeCam() {

            },

            takePhoto() {
                let video = document.getElementById("video");
                let canvas = document.getElementById("canvas");
                let ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, 500, 500);
            },


        },

        mounted() {
            this.openCam();
        }

    }

</script>

<style scoped>

</style>
