/**
 * @file 路由主入口，定义路由规则
 */

import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/Index.vue'
import Detail from '@/pages/Detail.vue'

Vue.use(Router)

export default new Router({
    base: '/',
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/login',
            name: 'medical-system-login',
            component: () => import('../pages/login'),
            meta: {
                title: '智慧医疗系统 - 登录'
            }
        },
        {
            path: '/p/',
            name: 'patient_manage',
            component: () => import('../pages/PatientInfo'),
            children: [
                {
                    path: 'pnew',
                    name: 'new_patient',
                    component: () => import('../pages/PatientEnter')
                },
                {
                    path: ':pid',
                    name: 'single_info',
                    component: () => import('../pages/PatientInfo')
                }
            ]
        },
        {
            path: '/mr/',
            name: 'record_manage',
            component: ()=> import('../pages/MedicalRecordManage')
        },
        // {
        //     path: '/detail/:id',
        //     name: 'detail',
        //     component: Detail
        // },
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
