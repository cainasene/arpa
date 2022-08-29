const express = require('express')
const router = express.Router()
const verifyToken = require('../lib/verify_token')

const controller = require('../controllers/user')

router.post('/', controller.create)
router.post('/login', controller.login)
router.post('/logout', verifyToken, controller.logout)

module.exports = router