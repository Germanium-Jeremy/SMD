const express = require('express')
const router = express.Router()
const { generateUrl, callbackRoute, TwitterTweets, XConnectionsStatus } = require('../controllers/XController')
const protect = require('../middlewares/AuthMiddleware')

router.get('/auth/twitter/authorize', protect, generateUrl)
router.get('/auth/twitter/callback', callbackRoute)
router.get('/tweets/twitter/get', protect, TwitterTweets)
router.get('/tweets/twitter/status', protect, XConnectionsStatus)

module.exports = router