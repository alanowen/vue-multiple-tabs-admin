import store from '../store'

import router from './'


// login
let routes = [{
    path: '/login',
    name: 'Login',
    component: resolve => require(['../views/login.vue'], resolve)
}];


// 首页
let index = {
    path: '/',
    name: 'Index',
    component: resolve => require(['../views/index.vue'], resolve),
    // 路由拦截
    beforeEnter: (to, from, next) => {

        if (store.state.auth.token == null) {
            // token 不存在时跳转到login
            next('/login');
        } else {
            // 显示进度条
            router.app.$Spin.show();

            store.dispatch('sysManage/getSysInitData').then(() => {
                router.app.$Spin.hide();
                next()
            })
        }
    },
    // 子路由
    children: [

    ],
};

// 系统管理
let sysManage = [
    {
        path: 'sysMenu',
        name: 'sysMenuManage',
        components: {
            sysMenuManage: resolve => require(['../views/sysManage/sysMenuManage/index.vue'], resolve) 

        }
    },
    {
        path: 'sysPriv',
        name: 'sysPrivManage',
        components: {
            sysPrivManage: resolve => require(['../views/sysManage/sysPrivManage/index.vue'], resolve) 

        }
    },
    {
        path: 'sysUser',
        name: 'sysUserManage',
        components: {
            sysUserManage: resolve => require(['../views/sysManage/sysUserManage/index.vue'], resolve) 
        }
    },
    {
        path: 'sysOrg',
        name: 'sysOrgManage',
        components: {
            sysOrgManage: resolve => require(['../views/sysManage/sysOrgManage/index.vue'], resolve) 
        }
    }
];

index.children.push(...sysManage)

routes.push(index)

export default routes