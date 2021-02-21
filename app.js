// npm modules
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const session = require('express-session')
const passport = require('passport')

// custom modules
const User = require('./config/db')
const ITEMS = require('./lib/items')

// constants
const app = express()
const PORT = process.env.PORT || 3000

// bodyParser
app.use(bodyParser.urlencoded({
    extended: true
}))

// static public folder
app.use(express.static('public'))

//ejs view engine
app.set('view engine', 'ejs')

//session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 7 * 24 * 3600000 // 1 day 
    }
}))

//initialization
app.use(passport.initialize())
app.use(passport.session())

// routes
const login = require('./routes/login')
app.use('/', login)
app.use('/', require('./routes/register'))
app.use('/', require('./routes/logout'))
app.use('/', require('./routes/add'))
app.use('/', require('./routes/delete'))
app.use('/', require('./routes/createList'))
app.use('/', require('./routes/lists'))

// get root route
app.get('/', (req, res) => {
    // if user is authenticated
    if (req.isAuthenticated()) {
        // user is authenticated
        User.findOne({_id : login.user._id}, (err, user) => {
            res.render('home', {
                profile: user.firstName,
                isLogin: true,
                user: user,
                items: user.listItems
            })
        })
        
    } else {
        // user isnt authenticated
        res.render('home', {
            profile: 'Login',
            isLogin: false,
            items: ITEMS
        })

        // when default array element is empty
        if (ITEMS.length === 0) {
            ITEMS.push('Hi guest !')
            ITEMS.push('use + buttton to add new item')
            ITEMS.push('check the checkbox to delete item')
        }
    }

})

// listning to the server
app.listen(PORT, () => {
    console.log('listening on port : 3000');
})