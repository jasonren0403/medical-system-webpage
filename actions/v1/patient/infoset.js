module.exports = {
    //todo: interact with SetPatientInfo
    type: "post",
    async handler(ctx, next) {
        let changeItem = ctx.request.body
        delete changeItem["id"]
        delete changeItem["name"]
        ctx.body = {
            success: true,
            // sample return= infoget(updated)
            content: {
                "person": {"id": "p1", "name": "Jack", "age": 44},
                "country": "China",
                "region": "Beijing",
                "birthday": "1980-4-10",
                "isMarried": false,
                "career": "career1",
                "address": "addr1"
            }
        }
    }
}