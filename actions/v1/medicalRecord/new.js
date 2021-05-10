module.exports = {
    routerPath: "/api/v1/medicalRecord/new",
    type:'post',
    async handler(ctx,next){
        // todo: interact with chaincode function InitNewRecord
        let newRecord = ctx.request.body
        console.log(newRecord)
        ctx.body = {
            success:true,
            content:{
                //==getMedicalRecord(updated)
            }
        }
    }
}