// import FBGateway from "../../../fabric_network";
module.exports = {
    type:'post',
    async handler(ctx, next) {
        let newPatient = ctx.request.body
        // let fab = FBGateway.getInstance()
        // let result = await fab.submitTransaction('NewPatient',newPatient)
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
            id: ""
        }
    }
}