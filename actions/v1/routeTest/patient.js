// /api/v1/patient

module.exports = {
    async handler(ctx,next){
        ctx.body = {
            "hello":"this is /api/v1/routeTest/patient"
        }
    }
}