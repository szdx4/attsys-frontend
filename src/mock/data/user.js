import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: '',
    name: '张某某'
  }
];

const Users = [];

for (let i = 0; i < 5; i++) {//随机生成用户
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    position: Mock.Random.integer(0, 1),
    sex: Mock.Random.integer(0, 1),
  }));
}

const LeaveUsers = [];

LeaveUsers.push(Mock.mock({
  id: 6,
  name: '王X',
  start_at: '2019-6-01 13:00',
  end_at: '2019-6-02 13:00',
  status: 'wait',
  remark: '身体原因'
}))

// for(let i = 0 ; i < 5 ; i++){
//   LeaveUsers.push(Mock.mock({
//     id: Mock.Random.guid(),
//     name: Mock.Random.cname(),
//     start_at: Mock.Random.datetime('yy-MM-dd a HH:mm:ss'),
//     end_at: Mock.Random.datetime('yy-MM-dd a HH:mm:ss'),
//     status:"wait",
//     remark:"身体原因"
//   }));
// }

export { LoginUsers, Users, LeaveUsers };
