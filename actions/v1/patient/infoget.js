
module.exports = {
    type: "get",
    async handler(ctx, next) {
        let params = ctx.query
        let id = params.patientID
        if (id === undefined) { //todo: getAllPatients
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
                    "birthday": "1990-4-10",
                    "isMarried": true,
                    "career": "career2",
                    "address": "addr2"
                }]
            }
        } else {
            let content = {}
            // todo: interact with GetPatientInfoByPID ,now is mocking!
            switch(id){
                case "p1":
                    content = {
                        "person": {"id": "p1", "name": "Jack", "age": 44},
                        "country": "China",
                        "region": "Beijing",
                        "birthday": "1980-4-10",
                        "isMarried": true,
                        "career": "career1",
                        "address": "addr1"
                    }
                    break
                case "p2":
                    content = {
                        "person": {
                            "id": "p2",
                            "name": "Rose",
                            "age": 44
                        },
                        "birthday": "1990-4-10",
                        "isMarried": true,
                        "career": "career2",
                        "address": "addr2",
                        "country": "China",
                        "region": "Beijing"
                    }
                    break;
                case "p3":
                    content = {
                        "person": {
                            "id": "p3",
                            "isMarried": false,
                            "name": "Guy"
                        },
                        "birthday": "1975-4-20",
                        "career": "career3",
                        "address": "addr3",
                        "country": "China",
                        "region": "Beijing"
                    }
                    break;
                default:
                    content = {

                    }
            }
            ctx.body = {
                success: true,
                content: content
            }
        }
// sample return(single):
// {"person":{"id":"p1","name":"Jack","age":44},"country":"China","region":"Beijing","birthday":"1980-4-10","isMarried":true,"career":"career1","address":"addr1"}
        //sample return(getAll)
        // [{"person":{"id":"p1","name":"Jack","age":44},"country":"China","region":"Beijing","birthday":"1980-4-10","isMarried":true,"career":"career1","address":"addr1"},{"person":{"id":"p2","name":"Rose","age":44},"country":"China","region":"Beijing","birthday":"1980-4-10","isMarried":true,"career":"career2","address":"addr2"}]
    }
}