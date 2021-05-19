// import FBGateway from "../../../fabric_network";
module.exports = {
    routerPath: "/api/v1/medicalRecord/new",
    type:'post',
    async handler(ctx, next) {
        let newRecord = ctx.request.body
        // let fab = FBGateway.getInstance()
        // let result = await fab.submitTransaction('InitNewRecord',newRecord.patientID,
        // newRecord.type,newRecord.time,newRecord.content,newRecord.signature)
        /*
        let req = {
            success: result.status ===200
        }
        if(result.status===200){
            result.payload = atob(result.payload)
            req["contents"] = JSON.parse(result.payload)
        }else{
            req["message"] = result.message || "Unknown error"
        }
        ctx.body = req
         */
        ctx.body = {
            success: true,
            content: {
                //==getMedicalRecord(updated)
            }
        }
    }
}