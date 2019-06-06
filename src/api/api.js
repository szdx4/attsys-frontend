import axios from 'axios';

let base = '';

//url都要改!!!!!!我随便写的
//有些还需要改成axios.post

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };//登陆

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };//获取用户列表

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

export const getLeaveListPage = params => {return axios.get( `${base}/leave`, { params: params });}//获取请假信息列表,分页

export const getLeaveUser = params => {return axios.get(`${base}/leave/user`,{params:params})}//获取指定用户请假信息

export const LeaveRequest = params =>{ return axios.get( `${base}/leave/user`, { params: params });}//申请请假

export const LeaveRequestApproval = params => { return axios.get(`${base}/leave/user`, { params: params }); }//审核请假申请

export const  getOvertimeList = params => {return axios.get('/overtime',{params: params});}//获取加班列表

export const OvertimeApproval = params => { return axios.get('/overtime', {params: params});}//审核加班申请

export const getOvertimeUser = params => { return axios.get('/overtime',{params:params});}//获取指定用户加班申请

export const OvertimeRequest = params => {return axios.get('/overtime/user',{params:params});}//申请加班

export const getHours = params => { return axios.get('/hours', { params:params });}//获取工时记录

export const getDepartmentList = params => {return axios.get('/department',{params:params});}//获取部门列表

export const addDepartment = params => { return axios.get('/department',{ params:params });}//添加部门

export const editDepartment = params => { return axios.get('/department',{ params:params});}//编辑部门

export const getDepartment = params => { return axios.get('/department',{params: params });}//获取指定部门信息

export const deletDepartmeny = params => { return axios.get('/department',{ params:params })}//删除部门

export const getShiftList = params => {return axios.get('/shift',{ params:params });}//获取排班记录

export const addShift = params => { return axios.get('/shift/user',{ params:params});}//添加排班

export const getDepartmentShift = params => { return axios.get('/shift/department',{ params: params});}//获取部门排班

export const getFaceUser = params => { return axios.get('/face/user',{ params: params});}//获取指定用户可用的人脸信息

export const editFaceUser = params => { return axios.get('/face/user',{ params: params});}//更新指定用户人脸信息

export const faceApproval = params => { return axios.get('face', { params: params });}//审核人脸信息

export const getSignStatus = params => { return axios.get('/sign/user',{ params: params });}//获取当前用户签到状态

export const getSignQrcode = params => { return axios.get('/sign/qrcode',{params: params});}//获取二维码

export const signQrcode = params => { return axios.get('/sign/qrcode/user',{ params: params});}//二维码签到

export const signFace = params =>{ return axios.get('/sign/face/user',{params: params});}//人脸签到

