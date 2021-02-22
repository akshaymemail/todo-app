const express = require('express')

const ITEMS = require('../lib/items')
const User = require('../config/db')
const router = express.Router()

router.post('/add', (req, res) => {
    // is user authenticated?
    if (req.isAuthenticated()) {
        //fetching fresh data from the database
        User.findOne({_id : req.user.id}, (err, user) => {
            if(!err) {
                // there is no error;
                // add new item to the default list of current user
                user.listItems.push({
                    item : req.body.newItem
                })
                user.save(err => {
                    if(!err) {
                        // item added successfully
                        // redirect to to the root route
                        res.redirect('/')
                    }else{
                        console.log(err)
                    }
                })
            }else{
                console.log(err)
            }
        })
    } else {
        // user is not authenticated add items to the array list
        ITEMS.push(req.body.newItem)
        res.redirect('/')
    }
})

module.exports = router