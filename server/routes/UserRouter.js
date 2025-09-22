const express = require('express')
const router = express.Router()
const { registerUser, signInUser, gettingUserData, handleRefreshToken } = require('../controllers/UserController')
const protect = require('../middlewares/AuthMiddleware')

router.post("/auth/register/user", registerUser)
router.post("/auth/signin/user", signInUser)
router.get("/auth/userData/user", protect, gettingUserData)
router.get("/auth/refreshToken/user", handleRefreshToken)

module.exports = router