import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://attsys.koder.me/',
    timeout: 5000,
    headers: {
        // 'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
        'Content-Type': 'application/json'
    }
});

const getHeaders = () => {
    let token = localStorage.getItem('jwtToken');
    if (token !== '') {
        return {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    } else {
        return {
            'Content-Type': 'application/json'
        }
    }
};

// **************************************************用户管理**************************************************

// 登录
// export const requestLogin = params => {
//     return instance.post('/user/auth', params)
// };

//登录
export const requestLogin = params => {
    return axios.post(`/login`, params).then(res => res.data);
};

// 获取用户列表
// page: 分页
export const getUserList = params => {
    return instance.get(`/user`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
            'Content-Type': 'application/json'
        },
        params: params
    });
};

// 添加用户
// name: 姓名
// password: 密码
// department: 部门
export const addUser = params => {
    return instance.post(`/user`, params).then(res => res.user_id); // return id
};

// 编辑用户
// name: 姓名
// department: 部门
// role: 身份
// hours: 工时
export const editUser = (id, params) => {
    return instance.put(`/user/${id}`, params);
};

// 获取指定用户
export const getUser = (id, params) => {
    return instance.get(`/user/${id}`, {params: params});
    //  instance.get("test", {params: params})
    //  instance.post("fsdsf", params)
    //  instance.put("fdsfs", params)
    //  instance.delete("/user/${id}")
};

// 移除特定用户
export const removeUser = (id, params) => {
    return instance.post(`/user/${id}`, {params: params});
};

//修改密码
export const editPasswd = (id, params) => {
    return instance.post(`/user/${id}`, {params: params});
};


// **************************************************请假管理**************************************************

// 获取请假信息列表,分页
export const getLeaveListPage = params => {
    return instance.get(`/leave`, {params: params});
};

// 获取指定用户请假信息
export const getLeaveUser = (id, params) => {
    return instance.get(`/leave/user/${id}`, {params: params})
};

// 申请请假
export const LeaveRequest = (id, params) => {
    return instance.post(`/leave/user/${id}`, {params: params});
};

// 审核请假申请
export const LeaveRequestApproval = (id, params) => {
    return instance.put(`/leave/user/${id}`, {params: params});
};


// **************************************************加班管理**************************************************

// 获取加班列表
export const getOvertimeList = params => {
    return instance.get(`/overtime`, {params: params});
};

// 获取指定用户加班申请
export const getOvertimeUser = (id, params) => {
    return instance.get(`/overtime/user/${id}`, {params: params});
};

// 申请加班
export const OvertimeRequest = (id, params) => {
    return instance.post(`/overtime/user/${id}`, {params: params});
};

// 审核加班申请
export const OvertimeApproval = (id, params) => {
    return instance.put(`/overtime/user/${id}`, {params: params});
};


// **************************************************工时列表**************************************************

// 获取工时记录
export const getHours = params => {
    return instance.get(`/hours`, {params: params});
};


// **************************************************部门管理**************************************************

// 获取部门列表
export const getDepartmentList = params => {
    return instance.get(`/department`, {params: params});
};

// 添加部门
export const addDepartment = params => {
    return instance.post(`/department`, {params: params});
};

// 编辑部门
export const editDepartment = (id, params) => {
    return instance.put(`/department/${id}`, {params: params});
};

// 获取指定部门信息
export const getDepartment = (id, params) => {
    return instance.get(`/department/${id}`, {params: params});
};

// 删除部门
export const deletDepartment = (id, params) => {
    return instance.delete(`/department/${id}`, {params: params})
};


// **************************************************人脸信息**************************************************

// 获取指定用户可用的人脸信息
export const getFaceUser = (id, params) => {
    return instance.get(`/face/user/${id}`, {params: params});
};

// 更新指定用户人脸信息
export const editFaceUser = (id, params) => {
    return instance.post(`/face/user/${id}`, {params: params});
};

// 审核人脸信息
export const faceApproval = (id, params) => {
    return instance.put(`/face/user/${id}`, {params: params});
};

export const getFaceList = (id, params) => {
    return instance.get(`/face`, {params: params});
}


// **************************************************排班管理**************************************************

// 获取排班列表
export const getShiftList = params => {
    return instance.get(`/shift`, {params: params});
};

// 添加排班
export const addShift = (id, params) => {
    return instance.post(`/shift/user/${id}`, {params: params});
};

// 添加部门排班
export const addDepartmentShift = params => {
    return instance.get(`/shift/department`, {params: params});
};

// 删除排班
export const deletShift = params => {
    return instance.post(`/shift/${id}`, {params: params});
};


// **************************************************签到管理**************************************************

// 获取当前用户签到状态
export const getSignStatus = (id, params) => {
    return instance.get(`/sign/user/${id}`, {params: params});
};

// 获取二维码
export const getSignQrcode = params => {
    return instance.get(`/sign/qrcode`, {params: params});
};

// 二维码签到
export const signQrcode = (id, params) => {
    return instance.post(`/sign/qrcode/user/${id}`, {params: params});
};

// 人脸签到
export const signFace = (id, params) => {
    return instance.post(`/sign/face/user/${id}`, {params: params});
};

