const { MongoClient } = require("mongodb")

let dbConnection

module.exports ={
    connectToDb: (cb) => {
        MongoClient.connect("mongodb://localhost:27018/ZStation")
        .then((client) => {
            dbConnection = client.db()
            return cb()
        })
        .catch(error => {
            console.log(error)
            return cb(error)
        })
    },
    getDb: () => dbConnection
}