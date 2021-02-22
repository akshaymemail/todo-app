//npm dependencies
const express = require('express')
const passport = require('passport')

// custom dependencies
const User = require('../config/db')

// constants
const router = express.Router()

// listning register get route
router.get('/register', (req, res) => {
    res.render('./auth', {
        profile: 'Login',
        title: 'Register',
        heading: 'Enter you details to register',
        isRegister: true,
        isDone:false,
        button: 'Register',
        isLogin: false
    })
})

// listing post route to register user
router.post('/register', (req, res) => {
    // registering the user
    User.register({
        firstName: req.body.fname,
        lastName: req.body.lname,
        gender: req.body.gender,
        username: req.body.username,
        listItems : [
            {item : `Welcome ${req.body.fname}`},
            {item : 'User + button to add new item'},
            {item : 'Check the checkbox to delete an item'}
        ]
        
    }, req.body.password, (err, user) => {
        // checking the error
        if (err) {
            // there wa an error
            console.log(err)
            res.render('./auth', {
                profile: 'Login',
                title: 'Register',
                heading: err.message + ' ☹',
                isRegister: true,
                isDone:false,
                button: 'register',
                isLogin: false
            })
        } else {
            res.render('./auth', {
                profile: 'Login',
                title: 'Register',
                heading: "You've successfully registered! Redirecting... 😁",
                isDone:true,
                isRegister: true,
                button: 'register',
                isLogin: false
            })
        }
    })
})

module.exports = router