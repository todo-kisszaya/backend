const express = require('express')
const router = express.Router()

const {checkToken} = require('../controllers/token')

router.route('/').post(checkToken)

module.exports = router