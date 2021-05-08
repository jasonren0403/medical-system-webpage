/**
 * @file store 主入口
 */

import Vue from 'vue'
import Vuex from 'vuex'

import example from './modules/example'
import loginState from "@/store/modules/loginState";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    example,
    loginState
  },
  strict: process.env.NODE_ENV !== 'production'
})
