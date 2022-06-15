const { Router } = require("express")
const fridayEmployee = require("../models/fridayEmployee")
const router = Router()

router.get("/recibos/viernes", async (req, res) => {
    const saludo = "hello world"
    const employees = await fridayEmployee.find({})
    res.render("index", { saludo, employees })
})

router.post("/recibos/viernes", async (req, res) => {
    const { name, checkIn, checkOut, extras, concept } = req.body
    const employee = new fridayEmployee({ name, checkIn, checkOut, extras, concept })
    employee.hoursWorkedCalc()
    employee.salaryCalc()
    await employee.save()
    res.redirect("/recibos/viernes")
})

module.exports = router