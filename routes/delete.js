// npm dependencies
const express = require('express')

// router
const router = express.Router()

//custom modules
const ITEMS = require('../lib/items')
const Login = require('./login')
const User = require('../config/db')

// delete post route
router.post('/delete', (req, res) => {
   const position =  ITEMS.indexOf(req.body.itemName)
   ITEMS.splice(position, 1)
   res.redirect('/')
})

module.exports = router