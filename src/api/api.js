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
    let token = localStorage.getItem('token');
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
export const requestLogin = params => {
    return instance.post('/user/auth', params)
};


// 获取用户列表
// page: 分页
export const getUserList = params => {
    return instance.get(`/user`, {
        headers: getHeaders(),
        params: params
    });
};

// 添加用户
// name: 姓名
// password: 密码
// department: 部门
export const addUser = params => {
    return instance.post(`/user`, params, {headers: getHeaders()}); // return id
};

// 编辑用户
// name: 姓名
// department: 部门
// role: 身份
// hours: 工时
export const editUser = (id, params) => {
    return instance.put(`/user/${id}`, params, {headers: getHeaders()});
};

// 获取指定用户
export const getUser = (id, params) => {
    return instance.get(`/user/${id}`, {
        headers: getHeaders(),
        params: params
    });
};

// 移除特定用户
export const removeUser = (id, params) => {
    return instance.delete(`/user/${id}`, {
        headers: getHeaders(),
        params: params
    });
};

//修改密码
export const editPasswd = (id, params) => {
    return instance.put(`/user/${id}`, params, {headers: getHeaders()});
};


// **************************************************部门管理**************************************************

// 获取部门列表
// page: 分页
export const getDepartmentList = params => {
    return instance.get(`/department`, {
        headers: getHeaders(),
        params: params
    });
};

// 添加部门
// name: 部门名称
export const addDepartment = params => {
    return instance.post(`/department`, params, {headers: getHeaders()});
    //返回department_id
};

// 编辑部门
export const editDepartment = (id, params) => {
    return instance.put(`/department/${id}`, params, {headers: getHeaders()});
};

// 获取指定部门信息
export const getDepartment = (id, params) => {
    return instance.get(`/department/${id}`, {
        headers: getHeaders(),
        params: params
    });
};

// 删除部门
export const deletDepartment = (id, params) => {
    return instance.delete(`/department/${id}`, {
        headers: getHeaders(),
        params: params
    })
};


// **************************************************请假管理**************************************************

// 获取请假信息列表,分页
export const getLeaveListPage = params => {
    return instance.get(`/leave`, {
        headers: getHeaders(),
        params: params
    });
};

// 获取指定用户请假信息
// page: 分页
export const getLeaveUser = (id, params) => {
    return instance.get(`/leave/user/${id}`, {
        headers: getHeaders(),
        params: params
    })
};

// 申请请假
export const LeaveRequest = (id, params) => {
    return instance.post(`/leave/user/${id}`, params, {headers: getHeaders()});
    //返回请假id
};

// 审核请假申请
// status: 状态
export const LeaveRequestApproval = (id, params) => {
    return instance.put(`/leave/${id}`, params, {headers: getHeaders()});
};

// 销假
// status: 状态
export const DeleteLeave = (id, params) => {
    return instance.delete(`/leave/user/${id}`, {
        headers: getHeaders(),
        params: params
    });
};




// **************************************************加班管理**************************************************

// 获取加班列表
// page: 分页
export const getOvertimeList = params => {
    return instance.get(`/overtime`, {
        headers: getHeaders(),
        params: params
    });
};

// 获取指定用户加班申请
// page: 分页
export const getOvertimeUser = (id, params) => {
    return instance.get(`/overtime/user/${id}`, {
        headers: getHeaders(),
        params: params
    });
};

// 申请加班
// remark: 理由
export const OvertimeRequest = (id, params) => {
    return instance.post(`/overtime/user/${id}`, params, {headers: getHeaders()});
};

// 审核加班申请
// status: 状态
export const OvertimeApproval = (id, params) => {
    return instance.put(`/overtime/user/${id}`, params, {headers: getHeaders()});
};


// **************************************************工时列表**************************************************

// 获取工时记录
export const getHours = params => {
    return instance.get(`/hours`, {
        headers: getHeaders(),
        params: params
    });
};


// **************************************************人脸信息**************************************************

// 获取指定用户可用的人脸信息
export const getFaceUser = (id, params) => {
    return instance.get(`/face/user/${id}`, {
        headers: getHeaders(),
        params: params
    });
};

// 更新指定用户人脸信息
export const editFaceUser = (id, params) => {
    return instance.post(`/face/user/${id}`, {
        headers: getHeaders(),
        params: params
    });
};

// 审核人脸信息
export const faceApproval = (id, params) => {
    return instance.put(`/face/user/${id}`, {
        headers: getHeaders(),
        params: params
    });
};
// 获取人脸列表
export const getFaceList = (id, params) => {
    return instance.get(`/face`, {
        headers: getHeaders(),
        params: params
    });
};


// **************************************************排班管理**************************************************

// 获取排班列表
export const getShiftList = params => {
    return instance.get(`/shift`, {
        headers: getHeaders(),
        params: params
    });
};

// 添加排班
export const addShift = (id, params) => {
    return instance.post(`/shift/user/${id}`, {
        headers: getHeaders(),
        params: params
    });
};

// 添加部门排班
export const addDepartmentShift = params => {
    return instance.get(`/shift/department`, {
        headers: getHeaders(),
        params: params
    });
};

// 删除排班
export const deletShift = params => {
    return instance.post(`/shift/${id}`, {
        headers: getHeaders(),
        params: params
    });
};


// **************************************************签到管理**************************************************

// 获取当前用户签到状态
export const getSignStatus = (id, params) => {
    return instance.get(`/sign/user/${id}`, {
        headers: getHeaders(),
        params: params
    });
    //sign_id
};

// 获取二维码
export const getSignQrcode = params => {
    return instance.get(`/sign/qrcode`, {
        headers: getHeaders(),
        params: params
    });
};

// 二维码签到
// token
export const signQrcode = (id, params) => {
    return instance.post(`/sign/qrcode/user/${id}`, params, {headers: getHeaders()});
};

// 人脸签到
// face_img : base64
export const signFace = (id, params) => {
    return instance.post(`/sign/face/user/${id}`, params, {headers: getHeaders()});
};

