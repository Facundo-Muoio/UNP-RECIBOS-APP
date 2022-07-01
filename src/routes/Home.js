const { Router } = require("express")
const Home = Router()

Home.get("/home", (req, res) => {
    res.render("Home")
})

module.exports = Home