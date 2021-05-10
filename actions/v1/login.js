module.exports = {
    routerPath: '/api/v1/login',
    type: 'post',
    async handler(ctx, next) {
        // todo: IsValidDoctor
        // console.log(ctx.body)
        ctx.body = {
            success: true,
            content:{
                loginID:ctx.request.body.doctorID
            }
        }
    }
}