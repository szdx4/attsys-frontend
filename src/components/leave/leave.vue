<template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="申请人">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="开始时间">
			<el-col :span="11">
				<el-date-picker type="date"  placeholder="选择日期" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" v-model="form.start_at" style="width: 100%;" @change_start="change_start"></el-date-picker>
			</el-col>
		</el-form-item>
		<el-form-item label="结束时间">
			<el-col :span="11">

				<el-date-picker type="date"  placeholder="选择日期" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" v-model="form.end_at" style="width: 100%;" @change_end="change_end"></el-date-picker>
			</el-col>
		</el-form-item>

		<el-form-item label="请假原因">
			<el-input type="textarea" v-model="form.remark"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="leaverequest">立即创建</el-button>
			<el-button @click.native.prevent>取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	import { LeaveRequest } from '../../api/api'
	export default {
		data() {
			return {
				form: {
					name: '',
					region: '',
					start_at: '',
					end_at: '',
					resource: '',
					desc: '',
					remark:'',
					status:'Wait'
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			change_start(val){
				this.form.start_at = val;
			},
			change_end(val){
				this.form.end_at = val;
			},

			leaverequest(){
				let user_id = 1
				var leave_info = {

				};
				LeaveRequest(para).then((res) => {   //向后端发送请求
				});
			}
		}
	}

</script>
