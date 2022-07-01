const { Router } = require("express")
const Employee = require("../models/Employee")
const twoHours = require("../controllers/traerHoras.js")
const Cocineros = Router()

Cocineros.get("/cocineros", async (req, res) => {
    const employees = await Employee.find({})
    res.render("Cocineros", { employees })
})

Cocineros.post("/cocineros", async (req, res) => {
    const { name, fridayCheckIn, fridayCheckOut, SaturdayCheckIn, SaturdayCheckOut, extras, concept } = req.body
    const employee = new Employee({ name, fridayCheckIn, fridayCheckOut, SaturdayCheckIn, SaturdayCheckOut,  extras, concept })
    employee.hoursWorkedCalc()
    employee.salaryCalc(concept, extras)
    await employee.save()
    res.redirect("/cocineros")
})

Cocineros.put("/cocineros/:id", async (req, res) => {
    const { id } = req.params
    const { name, fridayCheckIn, fridayCheckOut, SaturdayCheckIn, SaturdayCheckOut, extras, concept, salary } = req.body
    const hoursWorked = twoHours(fridayCheckIn, fridayCheckOut, SaturdayCheckIn, SaturdayCheckOut)
    const [ fridayHoursWorked, SaturdayHoursWorked ] = hoursWorked
    const employee = await Employee.findByIdAndUpdate({ _id : id }, {name, fridayCheckIn, fridayCheckOut, fridayHoursWorked, SaturdayCheckIn, SaturdayCheckOut, SaturdayHoursWorked, extras, concept, salary})
    res.redirect("/cocineros")
})

Cocineros.delete("/cocineros/:id", async (req, res) => {
    let { id } = req.params
    await Employee.deleteOne({ _id: id })
    res.redirect("/cocineros")
})

module.exports = Cocineros