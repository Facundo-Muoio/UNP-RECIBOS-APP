const { Router } = require("express")
const routerFecha = Router()
const Day = require("../models/Fecha")

routerFecha.get("/fecha", (req, res) => { 
    res.render("DiaFecha")
})

routerFecha.post("/fecha", async(req, res) => {
    const { day, date } = req.body
    const fecha = Day({ day, date})
    await fecha.save()  
    res.redirect("/home")
})

module.exports = routerFecha 