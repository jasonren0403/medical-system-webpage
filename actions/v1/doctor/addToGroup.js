// import FBGateway from "../../../fabric_network";
module.exports = {
    type: "post",
    async handler(ctx, next) {
        const req_body = ctx.request.body
        // let fab = FBGateway.getInstance()
        // let result = await fab.submitTransaction('AddCollaborator',req_body.doctor,req_body.pID,req_body.filter)
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
            content: {}
        }
    }
}