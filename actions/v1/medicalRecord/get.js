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
                "type": "Type1",
                "time": "2021-4-7 13:00:45",
                "content": {},
                "signed_by": {"person": {"id": "d1", "name": "Apple", "age": 24}, "department": "Dep1"}
            }, {
                "type": "test2",
                "time": "2021-4-14 9:45:11",
                "content": {"keybool": true, "keystr": "value1"},
                "signed_by": {"person": {"id": "d1", "name": "Apple", "age": 24}, "department": "Dep1"}
            }, {
                "type": "test3",
                "time": "2021-5-9 18:01:31",
                "content": {"keybool": false, "keynum": 67},
                "signed_by": {"person": {"id": "d1", "name": "Apple", "age": 24}, "department": "Dep1"}
            }]
        }
    }
}