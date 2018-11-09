import axios from 'axios';
import env from '../config/env';

let util = {

};
util.title = function (title) {
    title = title ? title + '' : '';
    window.document.title = title;
};

const ajaxUrl = env === 'development' ?
    'http://127.0.0.1:5000' :
    //'http://192.168.1.177:5000' :
    env === 'production' ?
    '' :
    '';

// utils.ajax初始化
let ajax = axios.create({
    baseURL: ajaxUrl,
    paramsSerializer: function (params) {
        return JSON.parse(JSON.stringify(params))
    },

});

util.ajax = ajax
util.ajaxUrl = ajaxUrl

export default util;