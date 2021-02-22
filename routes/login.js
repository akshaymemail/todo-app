const express = require('express');
const User = require('../config/db')
const passport = require('passport')

// creating router
const router = express.Router()

// default elements
let userDetails = {}

// listining the login route
router.get('/login', (req, res) => {
    res.render('./auth',{
        profile:'Login',
        title : "Log In",
        heading : 'Enter your credentials !',
        isRegister : false,
        button : 'login',
        isLogin : false
    })
})

// handling login post route
router.post('/login', (req, res) => {
    req.login(new User({
        username : req.body.username,
        password : req.body.password
    }), err =>{
        // checking the error
        if(err){
            // tere was an error
            console.log('there was an error')
        }
        // no error lets authenticate
        // authenticating local
        passport.authenticate('local', (err, user, info) =>{
            if(!err){
                // no any error check for valid user
                if(user){
                    // user is valid
                    res.redirect('/')
                }else{
                    // user is not valid
                    res.render('./auth',{
                        profile:'Login',
                        title : "Log In",
                        heading : info.message + '😡',
                        isRegister : false,
                        button : 'login',
                        isLogin : false
                    })
                }
            }else{
                // there was a problem check you connection
                res.render('./auth',{
                    profile:'Login',
                    title : "Log In",
                    heading : 'please check your internet connection',
                    isRegister : false,
                    button : 'login',
                    isLogin : false
                })
            }
            
        })(req, res)
    })
})
module.exports = router