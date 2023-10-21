import express from "express"
import bodyParser from "body-parser"
import morgan from "morgan"
import ejs from "ejs"

let app = express()
let port = 3000

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static("public"));

let data = new Date()

let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

let allinfo = {
    date: data.getDate(),
    day: days[data.getDay() - 1],
    month: months[data.getMonth()],
    year: data.getFullYear(),
    today: ["Running", "Jumping", "Walking", "Sleeping", "Singing", "Writing", "Cooking", "Gaming"],
    work: ["Running", "Jumping", "Walking", "Dancing", "Singing", "Working", "Drawing", "Writing", "Cooking", "Gaming"]
}


app.set("view engine", "ejs")


app.get("/", (req, res) => {
    res.render("index.ejs", allinfo)
})

app.get("/today", (req, res) => {
    res.render("today.ejs", allinfo)
})

app.get("/work", (req, res) => {
    res.render("work.ejs", allinfo)
})

app.post("/ftoday", (req, res) => {
    switch (req.body.opt) {
        case "add":
            allinfo.today.push(req.body["item"])
            break
        case "del":
            let index = allinfo.today.indexOf(req.body["item"]);
            if (index > -1) {
                allinfo.today.splice(index, 1);
            }
            break
        default:
            break
    }
    res.redirect("/today")
})

app.post("/fwork", (req, res) => {
    switch (req.body.opt) {
        case "add":
            allinfo.work.push(req.body["item"])
            break
        case "del":
            let index = allinfo.work.indexOf(req.body["item"]);
            if (index > -1) {
                allinfo.work.splice(index, 1);
            }
            break
        default:
            break
    }
    res.redirect("/work")
})

app.listen(port, (req, res) => {
    console.log(`Listening to port ${port}`)
})