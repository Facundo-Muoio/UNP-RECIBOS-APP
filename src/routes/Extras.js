const { Router } = require("express")
const Extras = require("../models/Extras")
const routerExtras = Router()

routerExtras.get("/extras", async (req, res) => {
    const extras = await Extras.find({})
    res.render("Extras", { extras })
})

routerExtras.post("/extras", async (req, res) => {
    const { name, concept, extra, salary} = req.body
    const extras = new Extras({ name, concept, extra, salary})
    await extras.save()
    res.redirect("/extras")
})

routerExtras.put("/extras/:id", async (req, res) => {
    const { id } = req.params
    const { name, concept, extra, salary } = req.body
    const extras = await Extras.findByIdAndUpdate({ _id : id }, {name, concept, extra, salary})
    res.redirect("/extras")
})

routerExtras.delete("/extras/:id", async (req, res) => {
    let { id } = req.params
    await Extras.deleteOne({ _id: id })
    res.redirect("/extras")
})

module.exports = routerExtras