const express = require('express')
const User = require('../config/db')
const passport = require('passport')
const defaultItems = require('../lib/items').default

const router = express.Router()

router.get('/register', (req, res) => {
    res.render('./auth', {
        profile:'Login',
        title: 'Register',
        heading : 'Enter you details to register',
        isRegister : true,
        button : 'Register',
        isLogin : false
    })
})

// listing post route to register user
router.post('/register', (req, res) => {
    User.register({
        firstName :req.body.fname,
        lastName :req.body.lname,
        gender :req.body.gender,
        username: req.body.username,
        lists: defaultItems
    }, req.body.password, (err, user) => {
        if(err) {
            console.log(err)
            res.render('./auth', {
                profile:'Login',
                title: 'Register',
                heading : err.message + ' ☹',
                isRegister : true,
                button : 'register',
                isLogin : false
            })
        }
        res.render('./auth', {
            profile:'Login',
            title: 'Register',
            heading : "You've successfully registered 😁",
            isRegister : true,
            button : 'register',
            isLogin : false
        })
    })
})

module.exports = router