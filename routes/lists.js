const express = require('express')

const router = express.Router()

router.post('/lists', (req, res) => {
    res.send('list form was submitted')
})

module.exports = router