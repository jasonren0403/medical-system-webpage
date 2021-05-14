module.exports = {
    type: "post",
    async handler(ctx, next) {
        //todo: RemoveCollaborator
        ctx.body = {
            success: true,
            content: {}
        }
    }
}