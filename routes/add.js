const express = require('express')

const ITEMS = require('../lib/items')
const router = express.Router()

router.post('/add', (req, res) => {
    ITEMS.push(req.body.newItem)
    res.redirect('/')
})

module.exports = router