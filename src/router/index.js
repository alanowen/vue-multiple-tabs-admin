import Vue from 'vue'
import iView from 'iview'
import VueRouter from 'vue-router'

import routes from './routes'


Vue.use(iView)
Vue.use(VueRouter)


const router = new VueRouter({
    mode: 'history',
    routes: routes
})


// 全局路由拦截器
router.beforeEach((to, from, next) => {
    if (to.matched.length == 0) {
        // 路由没有匹配到是
        // 返回Index
        next({
            name: 'Index',
            replace: true
        })
    } else {
        if (to.name != 'Index') {
            // 路由不是Index显示顶部加载条
            iView.LoadingBar.start()
        }
        next()
    }
})

// 结束拦截
router.afterEach((to, from) => {
    if (to.name != 'Index') {
        // 隐藏顶部加载条
        iView.LoadingBar.finish()
    }
})

export default router