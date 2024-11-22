const express = require('express')
const router = express.Router()
const { generateUrl, callbackRoute } = require('../controllers/SMDController')

router.post('/auth/twitter/start', generateUrl)
router.get('/auth/twitter/callback', callbackRoute)

module.exports = router