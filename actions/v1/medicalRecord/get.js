// import FBGateway from "../../fabric_network";
module.exports = {
    // routerPath: '/api/v1/medicalRecord/get',
    type: 'get',
    async handler(ctx, next) {
        //let fab = FBGateway.getInstance()
        let params = ctx.query
        let id = params.patientID
        let record_id = params.record_id
        /*
        let result
         */
        if (record_id !== undefined) {
            //result = await fab.evaluateTransaction('GetMedicalRecord',id)
            ctx.body = {
                success: true,
                content: {}
            }
        } else {
            //result = await fab.evaluateTransaction('GetMedicalRecord')
            ctx.body = {
                success: true,
                contents: []
            }
        }
        /*
        * let req = {
            success: result.status ===200
        }
        if(result.status===200){
            result.payload = atob(result.payload)
            req["contents"] = JSON.parse(result.payload)
        }else{
            req["message"] = result.message || "Unknown error"
        }
        ctx.body = req
        * */
        ctx.body = {
            success: true,
            contents: [{
                "collaborators": [{
                    "doctor": {
                        "person": {"id": "doct1", "name": "Apple", "age": 24},
                        "department": "Dep1"
                    }, "role": "member"
                }, {
                    "doctor": {"person": {"id": "doct2", "name": "Banana", "age": 25}, "department": "Dep1"},
                    "role": "manager"
                }],
                "id": "p1",
                "record_id":"testtest1",
                "type": "Type1",
                "time": "2021-4-7 13:05:25",
                "content": {},
                "signed_by": {"person": {"id": "doct1", "name": "Apple", "age": 24}, "department": "Dep1"}
            }, {
                "collaborators": [{
                    "doctor": {
                        "person": {"id": "doct2", "name": "Banana", "age": 25},
                        "department": "Dep1"
                    }, "role": "manager"
                }],
                "id": "p1",
                "record_id":"testtest2",
                "type": "Type2",
                "time": "2021-4-8 11:45:14",
                "content": {"key1": true, "key2": "string"},
                "signed_by": {"person": {"id": "doct2", "name": "Banana", "age": 25}, "department": "Dep1"}
            }, {
                "collaborators": [{
                    "doctor": {
                        "person": {"id": "doct1", "name": "Apple", "age": 24},
                        "department": "Dep1"
                    }, "role": "manager"
                }],
                "id": "p1",
                "type": "Type3",
                "record_id":"testtest3",
                "time": "2021-5-10 11:45:14",
                "content": {},
                "signed_by": {"person": {"id": "doct1", "name": "Apple", "age": 24}, "department": "Dep1"}
            }, {
                "collaborators": [{
                    "doctor": {
                        "person": {"id": "doct2", "name": "Banana", "age": 25},
                        "department": "Dep1"
                    }, "role": "manager"
                }],
                "id": "p2",
                "record_id":"testtest4",
                "type": "Type2",
                "time": "2021-4-10 11:45:14",
                "content": {},
                "signed_by": {"person": {"id": "doct2", "name": "Banana", "age": 25}, "department": "Dep1"}
            }, {
                "collaborators": [{
                    "doctor": {
                        "person": {"id": "doct1", "name": "Apple", "age": 24},
                        "department": "Dep1"
                    }, "role": "manager"
                }],
                "id": "p2",
                "record_id":"testtest5",
                "type": "Type3",
                "time": "2021-5-10 11:45:14",
                "content": {},
                "signed_by": {"person": {"id": "doct1", "name": "Apple", "age": 24}, "department": "Dep1"}
            }]
        }
    }
}