const { Router } = require("express")
const Reset = Router()
const Employee  = require("../models/Employee")
const Extra = require("../models/Extras")
const Fecha = require("../models/Fecha")

Reset.get("/resetear", (req, res) => {
    res.render("reset")
})

Reset.delete("/resetear", async (req, res) => {
    await Fecha.deleteMany({})
    await Employee.deleteMany({})
    await Extra.deleteMany({})
    res.redirect("/")
})

module.exports = Reset