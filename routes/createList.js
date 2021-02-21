// npm packages
const express = require('express')

// custom modules
const User = require('../config/db')
const Login = require('../routes/login')

//constants
const router = express.Router()

router.post('/createlist', (req, res) => {
    console.log('form was submitted')
})

module.exports = router