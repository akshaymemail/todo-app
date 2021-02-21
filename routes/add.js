const express = require('express')

const ITEMS = require('../lib/items')
const User = require('../config/db')
const login = require('./login')
const router = express.Router()

router.post('/add', (req, res) => {
    if (req.isAuthenticated()) {
        User.findOne({_id : login.user._id}, (err, user) => {
            if(!err) {
                user.list.listItems.push({
                    item : req.body.newItem
                })
                user.save(err => {
                    if(!err) {
                        res.redirect('/')
                    }
                })
            }else{
                console.log(err)
            }
        })
    } else {
        ITEMS.push(req.body.newItem)
        res.redirect('/')
    }
})

module.exports = router