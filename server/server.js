const express = require('express')
const session = require('express-session')
const cors = require('cors')
const mongoose = require('mongoose')
const authUser = require('./routes/UserRouter')
const tweetsAuthRoutes = require('./routes/TweetsRouter')
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(session({
     secret: process.env.SESSION_SECRET || "A secret",
     resave: false,
     saveUninitialized: true,
     cookie: { secure: false }
}))
app.use('/api/v2', authUser)
app.use('/api/v2', tweetsAuthRoutes)

// https://x.com/i/oauth2/authorize?response_type=code&client_id=cWpueVlxRjN1M2VlUGZINGZHV1E6MTpjaQ&redirect_uri=https%3A%2F%2Fsmdb-five.vercel.app%2Fapi%2Fv1%2Fauth%2Ftwitter%2Fcallback&scope=tweet.read%20users.read&state=acb4a30a9410b25776453207be40d896&code_challenge=w_sdSOjhXJe5W60O0-IHQcesOhb_3ylr5X9QEP-Kx_k&code_challenge_method=S256
// https://x.com/i/oauth2/authorize?response_type=code&client_id=cWpueVlxRjN1M2VlUGZINGZHV1E6MTpjaQ&redirect_uri=http%3A%2F%2F127.0.0.1%3A5000%2Fapi%2Fv1&scope=tweet.read%20users.read&state=43234d3f45bdaf961b5e825ec00e3682&code_challenge=Log7h9POze7RvYaCdZoC1r_LqUtUBFc4qZbRCHhHUG8&code_challenge_method=S256


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