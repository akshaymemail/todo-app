const express = require('express')
const app = express()

const router = express.Router()

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router