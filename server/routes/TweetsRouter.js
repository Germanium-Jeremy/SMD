const express = require('express')
const router = express.Router()
const { generateUrl, callbackRoute } = require('../controllers/SMDController')
const { TwitterTweets } = require('../controllers/GettingTweets')

router.post('/auth/twitter/start', generateUrl)
router.get('/auth/twitter/callback', callbackRoute)
router.get('/tweets/twitter/get', TwitterTweets)

module.exports = router