// npm packages
const express = require('express')

// custom modules
const User = require('../config/db')
const Login = require('../routes/login')

//constants
const router = express.Router()

router.post('/createlist', (req, res) => {
    res.send('A highly educated monkey is working on this feature')
})

module.exports = router