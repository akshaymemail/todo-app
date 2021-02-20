const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const passport = require('passport')

const url = process.env.DB_STRING
const options = {
    useNewUrlParser : true,
    useUnifiedTopology : true
}
// creating connection
mongoose.connect(url, options).catch( error => {
    console.error(error)
})

// creating schema
const schema = new mongoose.Schema({
    firstName: String,
    lastName : String,
    gender : String,
    username : String,
    password : String,
    lists : {}
})

// plugins
schema.plugin(passportLocalMongoose)

// creating model
const User = mongoose.model('User', schema)

//creating strategy
passport.use(User.createStrategy())


//serializeUser and deserializeUser
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

module.exports = User
