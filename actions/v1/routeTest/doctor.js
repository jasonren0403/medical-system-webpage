// /api/v1/doctor

module.exports = {
    async handler(ctx,next){
        ctx.body = {
            "hello":"this is /api/v1/routeTest/doctor"
        }
    }
}