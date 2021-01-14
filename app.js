const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const date = require(__dirname + "/date.js")
const port = 3000

const app = express();
app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static("public"))
mongoose.connect("mongodb://localhost:27017/todolistDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const todoListSchema = new mongoose.Schema({
    name: String
})

const Items = mongoose.model("Item", todoListSchema)

const buyFood = new Items({
    name: "Buy Food"
})
const eatFood = new Items({
    name: "Eat Food"
})
const payMoney = new Items({
    name: "Pay Money"
})

let workItems = []

app.get("/", function (req, res) {
    let time = date.getExternalDate()

    Items.find({}, function (err, items) {
        if (err) {
            console.log(err)
        } else {
            if (items.length === 0) {
                Items.insertMany([buyFood, eatFood, payMoney], function (err){
                    if (err){
                        console.log(err)
                    }else{
                        console.log("Item added successfully")
                        res.redirect("/")
                    }
                })
            }

            res.render("home", {
                listTitle: time,
                newListItem: items
            })
        }
    })

    
})

app.get("/about", function (req, res) {
    res.render("about")
})

app.post("/", function (req, res) {
    if (req.body.list.replace(/\s+/g, '') === "WorkList") {
        workItems.push(req.body.newItem)
        res.redirect('/work')
    } else {
        new Items({
            name: req.body.newItem
        }).save()
        res.redirect('/')
    }

})

app.get("/work", function (req, res) {
    res.render("home", {
        listTitle: "Work List",
        newListItem: workItems
    })
})

app.post("/delete", function (req, res) {
    Items.findByIdAndRemove(req.body.itemId,function(err){
        if(!err) {
            console.log("deleted")
        }
    })
    res.redirect("/")
    //  console.log(req.body.itemId)
})

app.listen(process.env.PORT || port, function () {
    console.log("Server is running on port : " + port);
})