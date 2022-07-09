const { Router } = require("express")
const Previsualizacion = Router()
const Employee = require("../models/Employee")
const Extras = require("../models/Extras")
const {makesEmployeesNew, makesExtrasNew } = require("../controllers/previsualizacion")
const fixDate = require("../controllers/corregirFecha")

Previsualizacion.get("/previsualizacion", async (req, res) => {
    const employees = await Employee.find({})
    const extras = await Extras.find({})
    const employeesNew = makesEmployeesNew(employees)
    const extrasNew = makesExtrasNew(extras)
    const day = req.session.day ? req.session.day.toUpperCase() : "falta poner un dia" 
    const date = req.session.date ? fixDate(req.session.date) : "falta poner una fecha"
    res.render("Previsualizacion", {employeesNew, extrasNew, day, date})
})

Previsualizacion.get("/fecha", (req, res) => {  
    res.render("DiaFecha")
})

Previsualizacion.post("/fecha", (req, res) => {
    const {day, date} = req.body
    req.session.day = day 
    req.session.date = date
    res.redirect("/home")
})

module.exports = Previsualizacion