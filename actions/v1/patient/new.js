module.exports = {
    type:'post',
    //todo: interact with newPatient
    async handler(ctx,next){
        let newPatient = ctx.request.body
        ctx.body = {
            success:true,
            id:""
        }
    }
}