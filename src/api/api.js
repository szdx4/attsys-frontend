import axios from 'axios';

let base = '';

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

export const getShit = params => {return axios.get('/shift',{params:params});}
