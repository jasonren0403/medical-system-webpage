/**
 * @file store 主入口
 */

import Vue from 'vue'
import Vuex from 'vuex'

import loginState from "@/store/modules/loginState";
import credential from "@/store/modules/credential";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        loginState,
        credential
    },
    strict: process.env.NODE_ENV !== 'production'
})
