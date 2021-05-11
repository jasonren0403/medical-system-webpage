import {post} from "@/utils/request";

export default {
    namespaced: true,
    state: {
        loggedIn: false,
        loginID: ''
    },
    mutations: {
        setLogin(state, isLogin) {
            console.log(`setLogin=>${isLogin}`)
            state.loggedIn = isLogin
        },
        setID(state, id) {
            state.loginID = id
            localStorage.setItem("loginID", id)
        }
    },
    actions: {
        initLoginData({commit}) {
            console.log('init login data')
            let existing = localStorage.getItem('loginID')
            if (existing !== null && existing.length > 0) {
                commit("setLogin", true)
                commit("setID", existing)
            } else {
                commit("setLogin", false)
                commit("setID", "")
            }
        },
        async login({commit, state}, payload) {
            console.log("login")
            let apireq = await post('/api/v1/login', payload)
            if (apireq.success) {
                commit("setLogin", true)
                commit("setID", apireq.content.loginID)
            }
        },
        async logout({commit,state},payload) {
            console.log("logout")
            let apireq = await post('/api/v1/logout', {id: payload.id})
            if (apireq.success) {
                commit("setLogin", false)
                commit("setID", "")
                localStorage.removeItem("loginID")
            }
        }
    }
}