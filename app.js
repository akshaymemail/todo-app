const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const _ = require("lodash")
const date = require(__dirname + "/date.js")
const port = 3000

const app = express();
app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static("public"))
mongoose.connect("your application database connection", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const homeListSchema = {
    name: String
}

anonoymousSchema = {
    listName: {
        type: String
    },
    listItems: {
        type: [homeListSchema]
    }

}

const Items = mongoose.model("Item", homeListSchema)

const anonoymousList = mongoose.model("anonoymousList", anonoymousSchema)

const buyFood = new Items({
    name: "Welcome to my todo web app"
})

const eatFood = new Items({
    name: "Use + to add new items"
})

const payMoney = new Items({
    name: "Check the checkbox to delete item"
})

const home = date.getExternalDate()
app.get("/", function (req, res) {
    Items.find({}, function (err, items) {
        if (err) {
            console.log(err)
        } else {
            if (items.length === 0) {
                Items.insertMany([
                        buyFood,
                        eatFood,
                        payMoney
                    ],
                    function (err) {
                        if (err) {
                            console.log(err)
                        }
                    })
            }

            res.render("home", {
                listTitle: home,
                newListItem: items
            })
        }
    })
})

app.get("/:anonoymousRoute", function (req, res) {
    const anonoymousRoute = _.capitalize(req.params.anonoymousRoute)
    anonoymousList.findOne({
        listName: anonoymousRoute
    }, function (err, result) {
        if (!err) {
            if (!result) {
                // add the items in the list
                new anonoymousList({
                    listName: anonoymousRoute,
                    listItems: [buyFood, eatFood, payMoney]
                }).save()
                res.redirect("/" + anonoymousRoute)
            } else {
                // rednder the items from the list
                res.render("home", {
                    listTitle: result.listName,
                    newListItem: result.listItems
                })
            }

        }
    })

})

app.get("/about", function (req, res) {
    res.render("about")
})

app.post("/", function (req, res) {
    if (req.body.list === home) {
        // insert new item in homepage collection db
        new Items({
            name: req.body.newItem
        }).save()
        res.redirect('/')
    } else {
        // insert new item in anonoymous collection db
        anonoymousList.findOne({
            listName: req.body.list
        }, function (err, result) {
            if (!err) {
                result.listItems.push({
                    name: req.body.newItem
                })
                result.save() 
            }
            res.redirect("/" + req.body.list)
        })

    }

})

app.post("/delete", function (req, res) {

    if (req.body.listName === home) {
        // delete items from home collection database
        Items.findByIdAndRemove(
            req.body.itemId,
            function (err) {
                if (err) {
                    console.log(err)
                }
            })
        res.redirect("/")
    } else {
        // delete items from anonoymousList collection database
        anonoymousList.findOneAndUpdate({
            listName: req.body.listName
        }, {
            $pull: {
                listItems: {
                    _id: req.body.itemId
                }
            }
        }, function (err, result) {
            if (!err) {
                res.redirect("/" + req.body.listName)
            }
        })

    }
})

app.listen(process.env.PORT || port, function () {
    console.log("Server is running on port : " + port);
})
