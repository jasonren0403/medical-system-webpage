// this route tests post method
module.exports = {
    type: 'post',
    async handler(ctx, next) {
        ctx.body = {
            "hello": "this is /api/v1/routeTest/post",
            "postBody":ctx.request.body
        }
    }
}