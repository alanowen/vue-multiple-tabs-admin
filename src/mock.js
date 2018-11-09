import MockAdapter from 'axios-mock-adapter'

import util from './libs/util'


let mock = new MockAdapter(util.ajax);

mock.onPost('/auth/login').reply(200, {
    token: 'token1234',
    user: {
        userName: '系统管理员',
        userType: 1,
        userId: 1
    }
});

mock.onGet('/sys/menu/list').reply(200, [
        {
            'menuLabel': '系统管理',
            'menuIcon': '',
            'menuId': 1,
            'menuName': 'sysManage',
            'children': [
                {
                    'menuLabel': '菜单管理',
                    'menuIcon': '',
                    'menuId': 2,
                    'menuName': 'sysMenuManage',
                    'parentMenuId': 1
                },  {
                    'menuLabel': '权限管理',
                    'menuIcon': '',
                    'menuId': 3,
                    'menuName': 'sysPrivManage',
                    'parentMenuId': 1
                },  {
                    'menuLabel': '用户管理',
                    'menuIcon': '',
                    'menuId': 4,
                    'menuName': 'sysUserManage',
                    'parentMenuId': 1
                }
            ]
        }
    ]
)

mock.onGet('/sys/priv/list').reply(200, {
    data: []
})

mock.onGet('/sys/user').reply(200, {
    data: []
})

export default mock;