// import FBGateway from "../../fabric_network";
module.exports = {
    routerPath: '/api/v1/login',
    type: 'post',
    async handler(ctx, next) {
        //let fab = FBGateway.getInstance()
        //let result = await fab.evaluateTransaction('QueryDoctorByID',ctx.body.doctorID)
        //{
        //  "status": 200,
        //  "payload": "eyJwZXJzb24iOnsiaWQiOiJkb2N0MSIsIm5hbWUiOiJBcHBsZSIsImFnZSI6MjR9LCJkZXBhcnRtZW50IjoiRGVwMSJ9"
        // } or
        // {
        //  "status": 500,
        //  "message": "Current doctor dID=notexist does not exist"
        // }
        /*
        let req = {
            success: result.status ===500
        }
        if(result.status===200){
            result.payload = atob(result.payload)
            req["content"] = {
                loginID: ctx.request.body.doctorID,
                other_infos:JSON.parse(result.payload)
            }
        }else{
            req["message"] = result.message || "Unknown error"
        }
        ctx.body = req
         */
        ctx.body = {
            // success: result.status===500,
            success: true,  //for test
            content: {
                loginID: ctx.request.body.doctorID
            }
        }
    }
}