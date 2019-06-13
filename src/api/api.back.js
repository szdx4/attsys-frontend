import axios from 'axios'

const base = ''

//* *************************************************用户管理**************************************************

// 登陆
export const requestLogin = params => {
  return axios.post(`${base}/login`, params).then(res => res.data)
}
// export const requestLogin = params => { return axios.post(`${base}/usr`, params); //for release

// 获取用户列表
export const getUserList = params => {
  return axios.get(`${base}/user/list`, { params: params })
} // for debug
// export const getUserList = params => { return axios.get(`${base}/user`, params); };  //for release

// 获取用户列表
export const getUserListPage = params => {
  return axios.get(`${base}/user`, params)
}
// export const getUserListPage = params => { return axios.get(`${base}/user`, params); };

// 添加用户
export const addUser = params => {
  return axios.post(`${base}/user`, params)
}

// 移除特定用户
export const removeUser = params => {
  const id = params.id
  return axios.delete(`${base}/user/${id}`, params)
}

// 批量移除用户
export const batchRemoveUser = params => {
  return axios.post(`${base}/user/batchremove`, params)
}

// 编辑用户
export const editUser = params => {
  return axios.post(`${base}/user/edit`, params)
}

//* *************************************************请假管理**************************************************

// 获取请假信息列表,分页
export const getLeaveListPage = params => {
  return axios.get(`${base}/leave`, params)
}

// 获取指定用户请假信息
export const getLeaveUser = params => {
  return axios.get(`${base}/leave/user`, { params: params })
}

// 申请请假
export const LeaveRequest = params => {
  return axios.post(`${base}/leave/user`, { params: params })
}

// 审核请假申请
export const LeaveRequestApproval = params => {
  return axios.post(`${base}/leave/user`, { params: params })
}

//* *************************************************加班管理**************************************************

// 获取加班列表
export const getOvertimeList = params => {
  return axios.get('/overtime', { params: params })
}

// 审核加班申请
export const OvertimeApproval = params => {
  return axios.post('/overtime', { params: params })
}

// 获取指定用户加班申请
export const getOvertimeUser = params => {
  return axios.get('/overtime', { params: params })
}

// 申请加班
export const OvertimeRequest = params => {
  return axios.post('/overtime/user', { params: params })
}

//* *************************************************工时列表**************************************************

// 获取工时记录
export const getHours = params => {
  return axios.get('/hours', { params: params })
}

//* *************************************************部门管理**************************************************

// 获取部门列表
export const getDepartmentList = params => {
  return axios.get('/department', { params: params })
}

// 添加部门
export const addDepartment = params => {
  return axios.post('/department', { params: params })
}

// 编辑部门
export const editDepartment = params => {
  return axios.post('/department', { params: params })
}

// 获取指定部门信息
export const getDepartment = params => {
  return axios.get('/department', { params: params })
}

// 删除部门
export const deletDepartment = params => {
  return axios.post('/department', { params: params })
}

//* *************************************************排版管理**************************************************

// 获取排班记录
export const getShiftList = params => {
  return axios.get('/shift', { params: params })
}

// 添加排班
export const addShift = params => {
  return axios.post('/shift/user', { params: params })
}

// 获取部门排班
export const getDepartmentShift = params => {
  return axios.get('/shift/department', { params: params })
}

//* *************************************************人脸信息**************************************************

// 获取指定用户可用的人脸信息
export const getFaceUser = params => {
  return axios.get('/face/user', { params: params })
}

// 更新指定用户人脸信息
export const editFaceUser = params => {
  return axios.post('/face/user', { params: params })
}

// 审核人脸信息
export const faceApproval = params => {
  return axios.post('face', { params: params })
}

//* *************************************************签到管理**************************************************

// 获取当前用户签到状态
export const getSignStatus = params => {
  return axios.get('/sign/user', { params: params })
}

// 获取二维码
export const getSignQrcode = params => {
  return axios.get('/sign/qrcode', { params: params })
}

// 二维码签到
export const signQrcode = params => {
  return axios.post('/sign/qrcode/user', { params: params })
}

// 人脸签到
export const signFace = params => {
  return axios.post('/sign/face/user', { params: params })
}

