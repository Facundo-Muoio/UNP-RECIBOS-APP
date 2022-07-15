const { Router } = require("express")
const Descargar = Router()
const path = require("path")
const pdf = require("html-pdf")
const fs = require("fs")
const { generateHTML } = require("../controllers/traerHtml")
let options = { 
    format: 'A4',
    border: {
        top: "1px",
        rigth: "40px",
        left: "50px"
    }, 
};


Descargar.get("/descargar", async (req, res) => {
    const html = await generateHTML() 
    console.log(path.join(__dirname, "../", "public", "pdf", "recibos.pdf"))
    fs.unlink(`${path.join(__dirname, "../", "public", "pdf", "recibos.pdf")}`, (error) => {
        if(error) throw error;
    })   
    pdf.create(html, options).toFile(path.join(__dirname,"../","public","pdf","recibos.pdf"), function(err, res) {
        if (err) return console.log(err);
        console.log(res);
    });
    res.render("Descargar")
})

module.exports = Descargar