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
    sex: Mock.Random.integer(0, 1)
  }));
}

export { LoginUsers, Users };
