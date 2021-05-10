// todo: interact with GetPatientInfoByPID
module.exports = {
    type: "get",
    async handler(ctx, next) {
        let params = ctx.query
        let id = params.patientID
        if (id === undefined) { //getAll
            ctx.body = {
                success: true,
                contents: [{
                    "person": {"id": "p1", "name": "Jack", "age": 44},
                    "country": "China",
                    "region": "Beijing",
                    "birthday": "1980-4-10",
                    "isMarried": true,
                    "career": "career1",
                    "address": "addr1"
                }, {
                    "person": {"id": "p2", "name": "Rose", "age": 44},
                    "country": "China",
                    "region": "Beijing",
                    "birthday": "1980-4-10",
                    "isMarried": true,
                    "career": "career2",
                    "address": "addr2"
                }]
            }
        } else {
            ctx.body = {
                success: true,
                content: {
                    "person": {"id": "p1", "name": "Jack", "age": 44},
                    "country": "China",
                    "region": "Beijing",
                    "birthday": "1980-4-10",
                    "isMarried": true,
                    "career": "career1",
                    "address": "addr1"
                }
            }
        }
// sample return(single):
// {"person":{"id":"p1","name":"Jack","age":44},"country":"China","region":"Beijing","birthday":"1980-4-10","isMarried":true,"career":"career1","address":"addr1"}
        //sample return(getAll)
        // [{"person":{"id":"p1","name":"Jack","age":44},"country":"China","region":"Beijing","birthday":"1980-4-10","isMarried":true,"career":"career1","address":"addr1"},{"person":{"id":"p2","name":"Rose","age":44},"country":"China","region":"Beijing","birthday":"1980-4-10","isMarried":true,"career":"career2","address":"addr2"}]
    }
}