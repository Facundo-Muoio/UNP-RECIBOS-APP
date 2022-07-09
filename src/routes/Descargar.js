const { Router } = require("express")
const Descargar = Router()
const ejs = require('ejs');
const path = require("path")
const fs = require("fs")
let pdf = require("html-pdf")
let html = fs.readFileSync((path.join(__dirname, "../", "html","htmlToPdf.html")), "utf-8")
let options = { 
    format: 'A4',
};


Descargar.get("/descargar", (req, res) => {
    pdf.create(html, options).toFile(path.join(__dirname,"../","public","pdf","exelente.pdf"), function(err, res) {
        if (err) return console.log(err);
        console.log(res);
    });
    res.render("Descargar")
})

module.exports = Descargar