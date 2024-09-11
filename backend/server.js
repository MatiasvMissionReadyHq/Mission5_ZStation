const express = require("express")
const cors = require("cors")
require("dotenv").config()


const app = express()
app.use(cors())
app.use(express.json())


const storeLocationRoute = require("./routes/storeLocationRoute")


app.use(storeLocationRoute)


app.get("/", (req, res) => {
    res.send("Server is connected!!")
})


app.listen(process.env.PORT || 4000, () =>{
    console.log(`Server is running on port http://localhost:${process.env.PORT || 4000}`)
})
