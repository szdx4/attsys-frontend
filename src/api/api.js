import axios from 'axios';

let base = '';

//**************************************************用户管理**************************************************

//登陆
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

//获取用户列表
export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

//获取用户列表
export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

//移除特定用户
export const removeUser = params => { return axios.post(`${base}/user/remove`, { params: params }); };

//批量移除用户
export const batchRemoveUser = params => { return axios.post(`${base}/user/batchremove`, { params: params }); };

//编辑用户
export const editUser = params => { return axios.post(`${base}/user/edit`, { params: params }); };

//添加用户
export const addUser = params => { return axios.post(`${base}/user/add`, { params: params }); };


//**************************************************请假管理**************************************************

//获取请假信息列表,分页
export const getLeaveListPage = params => {return axios.get( `${base}/leave`, { params: params });};

//获取指定用户请假信息
export const getLeaveUser = (id, params) => {return axios.get(`${base}/leave/user/${id}`,{params:params})};

//申请请假
export const LeaveRequest = (id, params) =>{ return axios.post( `${base}/leave/user/${id}`, { params: params });};

//审核请假申请
export const LeaveRequestApproval = (id, params) => { return axios.put(`${base}/leave/user/${id}`, { params: params }); };


//**************************************************加班管理**************************************************

//获取加班列表
export const getOvertimeList = params => {return axios.get(`${base}/overtime`,{params: params});};

//获取指定用户加班申请
export const getOvertimeUser = (id, params)  => { return axios.get(`${base}/overtime/user/${id}`,{params:params});};

//申请加班
export const OvertimeRequest = (id, params)  => { return axios.post(`${base}/overtime/user/${id}`,{params:params});};

//审核加班申请
export const OvertimeApproval = (id, params) => { return axios.put(`${base}/overtime/user/${id}`, {params: params});};


//**************************************************工时列表**************************************************

//获取工时记录
export const getHours = params => { return axios.get(`${base}/hours`, { params:params });};


//**************************************************部门管理**************************************************

//获取部门列表
export const getDepartmentList = params => {return axios.get(`${base}/department`,{params:params});};

//添加部门
export const addDepartment = params => { return axios.post(`${base}/department`,{ params:params });};

//编辑部门
export const editDepartment = (id, params) => { return axios.put(`${base}/department/${id}`,{ params:params});};

//获取指定部门信息
export const getDepartment = (id, params) => { return axios.get(`${base}/department/${id}`,{params: params });};

//删除部门
export const deletDepartment = (id, params) => { return axios.delete(`${base}/department/${id}`,{ params:params })};


//**************************************************排班管理**************************************************

//获取排班列表
export const getShiftList = params => {return axios.get(`${base}/shift`,{ params:params });};

//添加排班
export const addShift = (id, params) => { return axios.post(`${base}/shift/user/${id}`,{ params:params});};

//获取部门排班
export const getDepartmentShift = params => { return axios.get(`${base}/shift/department`,{ params: params});};


//**************************************************人脸信息**************************************************

//获取指定用户可用的人脸信息
export const getFaceUser = (id, params) => { return axios.get(`${base}/face/user/${id}`,{ params: params});};

//更新指定用户人脸信息
export const editFaceUser = (id, params) => { return axios.post(`${base}/face/user/${id}`,{ params: params});};

//审核人脸信息
export const faceApproval = (id, params) => { return axios.put(`${base}/face/user/${id}`, { params: params });};

export const getFaceList =  (id,params) => { return axios.get(`${base}/face`, { params: params });}


//**************************************************签到管理**************************************************

//获取当前用户签到状态
export const getSignStatus = (id, params) => { return axios.get(`${base}/sign/user/${id}`,{ params: params });};

//获取二维码
export const getSignQrcode = params => { return axios.get(`${base}/sign/qrcode`,{params: params});};

//二维码签到
export const signQrcode = (id, params) => { return axios.post(`${base}/sign/qrcode/user/${id}`,{ params: params});};

//人脸签到
export const signFace = (id, params) =>{ return axios.post(`${base}/sign/face/user/${id}`,{params: params});};

