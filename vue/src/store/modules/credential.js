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
            if (role !== "patient" || role !== "doctor") return
            state.role = role
        }
    },
    actions: {
        async init({commit, state}, dID) {
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