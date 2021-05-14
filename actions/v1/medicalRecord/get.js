module.exports = {
    // routerPath: '/api/v1/medicalRecord/get',
    type: 'get',
    async handler(ctx, next) {
        let params = ctx.query
        let id = params.patientID
        // console.log(ctx.body)
        // todo: interact with fabric gateway (chaincode function:GetMedicalRecord(pid))
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
                "type": "Type3",
                "time": "2021-5-10 11:45:14",
                "content": {},
                "signed_by": {"person": {"id": "doct1", "name": "Apple", "age": 24}, "department": "Dep1"}
            }]
        }
    }
}