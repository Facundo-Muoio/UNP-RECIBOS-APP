const { Router } = require("express")
const Resumen = Router()
const Employee  = require("../models/Employee")
const Extra = require("../models/Extras")
const Fecha = require("../models/Fecha")

Resumen.get("/resumen", async (req, res) => {
    const empleados = await Employee.find({})
    const extras = await Extra.find({})
    const fecha = await Fecha.find({})
    if(empleados || extras){
        let sueldo = 0
        empleados.forEach(e => {
            sueldo += e.salary + Number(e.extras)
        })
        extras.forEach(e => {
           sueldo += e.salary
        })
        res.render("Resumen", {empleados, extras, fecha, sueldo})
    }
})

module.exports = Resumen