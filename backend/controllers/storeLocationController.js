const { connectToDb, getDb } = require("../db/db")


module.exports.getStoreLocation = async(req, res) => {
           
    try{
        await connectToDb((error) => {
            if(error){
                return res.status(500).json({error: "Failed to connect to database"})
            }
        
        })
            
        let db = getDb()
        const data = await db.collection("Station").find().toArray()
        res.status(200).json(data)
    }
    catch(error){
        res.status(500).json({error: "Unable to fetch document"})
    }
}