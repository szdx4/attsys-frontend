<template>
    <div class="container clearfix">
            <div class="img-lists" slot="placeholder">
                <el-button type="primary" v-on:click="openCam">打开摄像头</el-button>
                <video id="video" width="500px" height="500px" autoplay="autoplay"></video>
            </div>
        <div class="img-lists">
            <el-button type="primary" v-on:click="takePhoto">拍照</el-button>
            <el-button type="primary" v-on:click="">使用照片</el-button><!--上传--->
            <canvas id="canvas" width="500px" height="500px"></canvas>
        </div>
            <div class="img-qr" slot="placeholder">
                <img :src=this.$route.params.qrcode>
            </div>
    </div>
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


    }

</script>

<style type="text/css">
    .container{
        width: 100%;
    }
    .img-lists{
        float: left;
        width: 500px;
        height: 500px;
    }
    .img-qr{
        float: right;
        width: 256px;
        height: 256px;

    }
    .img-lists img{
        width: 100%;
        height: 100%;
        display: block;
    }
    .clearfix:after{
        content:'';
        display: block;
        clear: both;
        height: 0;
        visibility: hidden;
    }
</style>
