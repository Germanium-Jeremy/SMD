const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const authUser = require('./routes/UserRouter')
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/v1', authUser)


app.get("/", (req, res) => {
     console.log("Index Route")
     res.status(200).send("Index Route")
})

mongoose.connect(process.env.MONGOOSE_API_URL).then(() => {
     console.log("SMD Clustor Connected Successfully")
}).catch(error => {
     console.log("Error Connecting to SMD: ", error)
})

const PORT = 5000
app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${PORT}`))

module.exports = app