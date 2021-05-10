module.exports = {
    routerPath: '/api/v1/logout',
    type:'post',
    async handler(ctx, next) {

        ctx.body = {
            success: true,
        }
    }
}