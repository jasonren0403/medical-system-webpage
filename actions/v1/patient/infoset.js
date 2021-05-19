// import FBGateway from "../../../fabric_network";
module.exports = {
    type: "post",
    async handler(ctx, next) {
        let changeItem = ctx.request.body
        // delete changeItem["id"]
        delete changeItem["name"]
        // let fab = FBGateway.getInstance()
        // let result = await fab.submitTransaction('SetPatientInfo',changeItem)
        /*
        let req = {
            success: result.status ===200
        }
        if(result.status===200){
            result.payload = atob(result.payload)
            req["content"] = JSON.parse(result.payload)
        }else{
            req["message"] = result.message || "Unknown error"
        }
        ctx.body = req
         */
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