import {get} from '@/utils/request'

export default {
    namespaced: true,
    state: {
        id: '',
        name: '',
        role: '' // enum(patient||doctor)
    },
    mutations: {
        setCredID(state, id) {
            state.id = id
        },
        setName(state, name) {
            state.name = name
        },
        setRole(state, role) {
            state.role = role
        }
    },
    actions: {
        async init({commit, state}, dID) {
            if (localStorage.getItem('loginID')!==undefined){
                dID = localStorage.getItem('loginID')
                console.log("Use localStorage loginID")
            }
            let res = await get('/api/v1/doctor/getDoctorByID', {
                params: {
                    doctorID: dID
                }
            })
            if (res.success) {
                commit("setCredID", dID)
                commit("setRole", "doctor")
                commit("setName", res.content.person.name)
            }
        }
    }
}