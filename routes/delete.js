// npm dependencies
const express = require('express')

// router
const router = express.Router()

//custom modules
const ITEMS = require('../lib/items')
const User = require('../config/db')

// delete post route
router.post('/delete', (req, res) => {
   // check if the user is authenticated
   if (req.isAuthenticated()) {
      // user is authenticated
      // delete item from the database for current user
      User.updateOne({
         _id: req.user.id
      }, {
         $pull: {
            listItems: {
               _id : req.body.itemId
            }
         }
      }, { multi: true}, (err, user) => {
         if (!err) {
            res.redirect('/')
            console.log(user)
         } else {
            console.log(err)
         }
      })
   } else {
      // user is not authenticated
      // delete items form the array
      const position = ITEMS.indexOf(req.body.itemName)
      ITEMS.splice(position, 1)
      res.redirect('/')
   }
})

module.exports = router