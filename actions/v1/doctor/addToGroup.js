module.exports = {
    type:"post",
    async handler(ctx,next){
        //todo: AddCollaborator
        ctx.body = {
            success:true,
            content:{}
        }
    }
}