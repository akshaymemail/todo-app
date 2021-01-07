const express = require("express")
const bodyParser = require("body-parser")
const date = require(__dirname + "/date.js")
const port = 3000

const app = express();
app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static("public"))

let items = ["Buy food", "Make food", "Eat food"]
let workItems = []

app.get("/", function (req, res) {
    let time = date.getExternalDate()
    res.render("home", {
        listTitle: time,
        newListItem: items
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
        items.push(req.body.newItem)
        res.redirect('/')
    }

})

app.get("/work", function (req, res) {
    res.render("home", {
        listTitle: "Work List",
        newListItem: workItems
    })
})

app.listen(port, function () {
    console.log("Server is running on port : " + port);
})