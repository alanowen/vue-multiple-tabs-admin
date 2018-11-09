import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import sysManage from './modules/sysManage'
import common from './modules/common'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        common,
        auth,
        sysManage,
    },

    getters: {

    }
})