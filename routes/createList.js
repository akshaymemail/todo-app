const express = require('express')
const User = require('../config/db')
const Login = require('../routes/login')

const router = express.Router()

router.post('/createlist', (req, res) => {
    res.send(Login.user.lists)
})

module.exports = router