// import FBGateway from "../../../fabric_network";
module.exports = {
    routerPath: '/api/v1/doctor/getDoctorByID',
    type: 'get',
    async handler(ctx, next) {
        let params = ctx.query
        let dID = params.doctorID
        // let fab = FBGateway.getInstance()
        // let result = await fab.evaluateTransaction('QueryDoctorByID',dID)
        /*
        let req = {
            success: result.status ===200
        }
        if(result.status===200){
            result.payload = atob(result.payload)
            req["content"] = JSON.parse(result.payload)
        }else{
            req["message"] = result.message || "Unknown error"
        }
        ctx.body = req
         */
        ctx.body = {
            success: true,
            content: {
                "person": {"id": "d1", "name": "Apple", "age": 24},
                "department": "Dep1"
            }
        }
    }
}