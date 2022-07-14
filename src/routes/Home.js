const { Router } = require("express")
const Home = Router()

Home.get("/", (req, res) => {
    res.render("Home")
})

module.exports = Home
