import {get, post} from "@/utils/request";

export default {
    namespaced: true,
    state: {
        loggedIn: false,
        loginID: ''
    },
    mutations: {
        setLogin(state,isLogin) {
            this.state.loggedIn = isLogin
        },
        setID(state,id) {
            state.loginID = id
        }
    },
    actions: {
        initLoginData({commit}) {
            commit("setLogin", true)
            commit("setID", "")
        },
        async login({commit, state}, payload) {
            let apireq = await post('/api/v1/login', payload)
            if (apireq.success) {
                commit("setLogin", true)
                commit("setID")
            }
        },
        async logout({commit}) {
            let apireq = await post('/api/v1/logout', {})
            if (apireq.success) {
                commit("setLogin", false)
                commit("setID", "")
            }
        }
    }
}