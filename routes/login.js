const express = require('express');
const User = require('../config/db')
const passport = require('passport')

const router = express.Router()
let userDetails = {}

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

router.post('/login', (req, res) => {
    req.login(new User({
        username : req.body.username,
        password : req.body.password
    }), err =>{
        if(err){
            console.log('there was an error')
        }
        passport.authenticate('local', (err, user, info) =>{
            if(!err){
                if(user){
                    module.exports.user = user
                    res.redirect('/')
                }else{
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