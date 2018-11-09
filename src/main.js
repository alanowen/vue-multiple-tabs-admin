import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Vuex from 'vuex';

import util from './libs/util';
import App from './app.vue';
import store from './store';
import router from './router';

import './mock';


Vue.use(Vuex);
Vue.use(iView);


// // 页面刷新时，重新获取token
// if (window.localStorage.getItem('token')) {
//     store.commit(types.mutation.login, window.localStorage.getItem('token'))
// }


// 请求拦截器
util.ajax.interceptors.request.use(
    config => {
        if (store.state.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
            // http auth
            config.headers.AUTHORIZATION = `Bearer ${store.state.token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    });


// 响应拦截器
util.ajax.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response != undefined) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    //store.commit(types.mutation.logOut);
                    router.replace({
                        name: 'Login'
                    })
            }
        }
        return Promise.reject(error); // 返回接口返回的错误信息
    });


// 应用程序实例
new Vue({
    el: '#app',
    store: store,
    router: router,
    render: h => h(App)
})