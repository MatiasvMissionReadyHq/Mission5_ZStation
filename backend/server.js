const express = require("express")
const cors = require("cors")
require("dotenv").config()


const app = express()
app.use(cors)
app.use(express.json())


const routes = require("./routes/routes")


app.use(routes)


app.get("/", (req, res) => {
    res.send("Server is connected!!")
})


app.listen(process.env.PORT || 5000, () =>{
    console.log(`Server is running on port http://localhost:${process.env.PORT || 5000}`)
})
