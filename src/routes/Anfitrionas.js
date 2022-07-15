const { Router } = require("express")
const Employee = require("../models/Employee")
const twoHours = require("../controllers/traerHoras.js")
const Anfitrionas = Router()

Anfitrionas.get("/anfitrionas", async (req, res) => {
    const employees = await Employee.find({})
    res.render("Anfitrionas", { employees })
})

Anfitrionas.post("/anfitrionas", async (req, res) => {
    const { name, fridayCheckIn, fridayCheckOut, SaturdayCheckIn, SaturdayCheckOut, extras, concept } = req.body
    const employee = new Employee({ name, fridayCheckIn, fridayCheckOut, SaturdayCheckIn, SaturdayCheckOut,  extras, concept })
    employee.hoursWorkedCalc()
    employee.salaryCalc(concept, extras)
    await employee.save()
    res.redirect("/anfitrionas")
})

Anfitrionas.put("/anfitrionas/:id", async (req, res) => {
    const { id } = req.params
    const { name, fridayCheckIn, fridayCheckOut, SaturdayCheckIn, SaturdayCheckOut, extras, concept, salary } = req.body
    const hoursWorked = twoHours(fridayCheckIn, fridayCheckOut, SaturdayCheckIn, SaturdayCheckOut)
    const [ fridayHoursWorked, SaturdayHoursWorked ] = hoursWorked
    const employee = await Employee.findByIdAndUpdate({ _id : id }, {name, fridayCheckIn, fridayCheckOut, fridayHoursWorked, SaturdayCheckIn, SaturdayCheckOut, SaturdayHoursWorked, extras, concept, salary})
    res.redirect("/anfitrionas")
})

Anfitrionas.delete("/anfitrionas/:id", async (req, res) => {
    let { id } = req.params
    await Employee.deleteOne({ _id: id })
    res.redirect("/anfitrionas")
})

module.exports = Anfitrionas