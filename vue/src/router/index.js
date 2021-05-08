/**
 * @file 路由主入口，定义路由规则
 */

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    base: '/',
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('@/pages/Index')
        },
        {
            path: '/login',
            name: 'medical-system-login',
            component: () => import('@/pages/login'),
            meta: {
                title: '智慧医疗系统 - 登录'
            }
        },
        {
            path: '/d',
            name: 'doctor-info',
            component: () => import('@/pages/DoctorInfo'),
            meta: {}
        },
        {
            path: '/p/:pid',
            name: 'single_info',
            component: () => import('../pages/PatientInfo')
        },
        {
            path: '/pnew',
            name: 'new_patient',
            component: () => import('../pages/PatientEnter')
        },
        {
            path: '/mr',
            name: 'record_manage',
            component: () => import('../pages/MedicalRecordManage')
        },
        {
            path: '*',
            name: 'fallback',
            component: () => import("../components/404"),
            meta: {
                title: '似乎是一个不存在的页面'
            }
        }
    ]
})
