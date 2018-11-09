import axios from 'axios'

import api from '../../api/sysManage'


export default {
    namespaced: true,

    state: {
        sysMenuList: [],
        sysPrivList: []
    },

    mutations: {
        sysMenuList(state, data) {
            state.sysMenuList = data
        },

        sysPrivList(state, data) {
            state.sysPrivList = data
        }
    },

    actions: {
        getSysInitData(context) {
            let promise = new Promise((resolve, reject) => {
                axios.all([api.getSysMenuList(), api.getSysPrivList()]).then(axios.spread((rep1, rep2) => {
                    context.commit('sysMenuList', rep1.data)
                    context.commit('sysPrivList', rep2.data)
                    resolve()
                })).catch(error => {
                    reject(error)
                })
            })
            return promise
        }
    },

    getter: {
        
    }
}