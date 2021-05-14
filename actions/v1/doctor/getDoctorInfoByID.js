module.exports = {
    routerPath: '/api/v1/doctor/getDoctorByID',
    type: 'get',
    async handler(ctx, next) {
        let params = ctx.query
        let dID = params.doctorID
        // todo: interact with fabric gateway to find the doctor(chaincode function:QueryDoctorByID)
        ctx.body = {
            success: true,
            content: {
                "person": {"id": "d1", "name": "Apple", "age": 24},
                "department": "Dep1"
            }
        }
    }
}