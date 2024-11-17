const express = require('express')
const router = express.Router()
const { registerUser, signInUser } = require('../controllers/UserController')

router.post("/auth/register/user", registerUser)
router.post("/auth/signin/user", signInUser)

module.exports = router