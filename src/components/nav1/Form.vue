<template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="申请人">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="所属部门">
			<el-select v-model="form.region" placeholder="请选择所属部门">
				<el-option label="办公室" value="shanghai"></el-option>
				<el-option label="市场部" value="beijing"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="起始时间">
			<el-col :span="11">
				<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
			</el-col>
			<el-col class="line" :span="2">-</el-col>
			<el-col :span="11">
				<el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
			</el-col>
		</el-form-item>
		<el-form-item label="小于一天">
			<el-switch on-text="" off-text="" v-model="form.delivery"@change="change"></el-switch>
		</el-form-item>
		<el-form-item label="起始时间" v-show="form.delivery">
			<el-col :span="11">
				<el-time-picker type="date03" placeholder="选择时间" v-model="form.date1" style="width: 100%;"></el-time-picker>
			</el-col>
			<el-col class="line" :span="2">-</el-col>
			<el-col :span="11">
				<el-time-picker type="date04" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
			</el-col>
		</el-form-item>

		<el-form-item label="请假原因">
			<el-checkbox-group v-model="form.type">
				<el-checkbox label="病假" name="type"></el-checkbox>
				<el-checkbox label="事假" name="type"></el-checkbox>
				<el-checkbox label="其它" name="type"></el-checkbox>
			</el-checkbox-group>
		</el-form-item>
		<el-form-item label="具体说明">
			<el-input type="textarea" v-model="form.desc"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary">立即创建</el-button>
			<el-button @click.native.prevent>取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			change(){
				this.delivery = true;

			}
		}
	}

</script>