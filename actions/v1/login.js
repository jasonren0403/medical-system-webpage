module.exports = {
    routerPath: '/api/v1/login',
    type: 'post',
    async handler(ctx, next) {
        console.log(ctx.body)
        ctx.body = {
            success: true,
            // loginID:
        }
    }
}