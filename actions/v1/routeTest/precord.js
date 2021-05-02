// /api/v1/precord

module.exports = {
    async handler(ctx,next){
        ctx.body = {
            "hello":"this is /api/v1/routeTest/precord"
        }
    }
}