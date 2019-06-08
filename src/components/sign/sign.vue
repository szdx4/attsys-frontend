<template>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
            <el-form-item>
                <el-button type="primary" v-on:click="getUsers">人脸签到</el-button>
            </el-form-item>
        </el-form>
    </el-col>
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {

                signFormVisible: false,
            }
        }
    }
</script>