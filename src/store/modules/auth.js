import api from '../../api/auth'


export default {
    namespaced: true,

    state: {
        token: null,
        currentUser: {
            userName: null,
            useType: null,
            userId: null
        },
    },

    mutations: {
        token(state, data) {
            state.token = data
        },

        currentUser(state, { userName, useType, userId }) {
            state.currentUser = { userName, useType, userId }
        }
    },

    actions: {
        login(context) {
            let promise = new Promise((resolve, reject) => {
                api.login().then(response => {
                    if (response.status == 200) {
                        let { token, user } = response.data
                        context.commit('token', token)
                        context.commit('currentUser', user)
                        resolve(response.data)
                    } else {
                        reject(new Error(response));
                    }

                }).catch(error => {
                    reject(error)
                })
            })
            return promise
        }
    },

    getter: {

    }
}