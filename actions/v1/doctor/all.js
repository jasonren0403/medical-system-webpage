// import FBGateway from "../../../fabric_network";
module.exports = {
    async handler(ctx, next) {
        // let fab = FBGateway.getInstance()
        // let result = await fab.evaluateTransaction('GetAllDoctors')
        /*
        let req = {
            success: result.status ===200
        }
        if(result.status===200){
            result.payload = atob(result.payload)
            req["contents"] = JSON.parse(result.payload)
        }else{
            req["message"] = result.message || "Unknown error"
        }
        ctx.body = req
         */
        ctx.body = {
            success: true,
            contents: [{
                "person": {"id": "doct1", "name": "Apple", "age": 24},
                "department": "Dep1"
            }, {
                "person": {"id": "doct2", "name": "Banana", "age": 25},
                "department": "Dep1"
            }, {"person": {"id": "doct3", "name": "Catt", "age": 26}, "department": "Dep2"}]
        }
    }
}