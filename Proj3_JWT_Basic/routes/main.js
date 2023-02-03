const express = require('express')
const router = express.Router()
const authorizationMiddleWare = require('../middleware/auth')

const {login, dashboard} = require('../controllers/main')

router.route('/dashboard').get(authorizationMiddleWare, dashboard)
router.route('/login').post(login)

module.exports = router