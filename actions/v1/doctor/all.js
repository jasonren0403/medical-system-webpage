module.exports = {
    async handler(ctx, next) {
        // todo: interact with getAllDoctors
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