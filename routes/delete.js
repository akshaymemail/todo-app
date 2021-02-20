const express = require('express')

const ITEMS = require('../lib/items').default

const router = express.Router()

router.post('/delete', (req, res) => {
   const position =  ITEMS.indexOf(req.body.itemName)
   ITEMS.splice(position, 1)
   res.redirect('/')
})

module.exports = router