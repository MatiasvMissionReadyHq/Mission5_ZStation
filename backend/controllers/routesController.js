const { connectToDb, getDb } = requier("../db/db")


module.exports.controller = async(req, res) => {
    await connection((error) => {
        if(error){
            return res.status(500).json({error: "Failed to connect to database"})
        }
    })

    let db = getDb()
    
}