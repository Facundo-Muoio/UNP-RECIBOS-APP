const Employee = require("../models/Employee")
const Extras = require("../models/Extras")
const Day = require("../models/Fecha")
const numeroALetras = require("../controllers/numerosALetras")

async function getDate(){

    const dates = await Day.find({})
    const lastDate = dates[dates.length - 1]
    if(!lastDate){
        return { dia: "falta ingresar un dia", fecha: "falta ingresar una fecha" }
    }
    const dia = lastDate.day.toUpperCase()
    const fecha = lastDate.date
    const fechaArreglada = fecha.split("-").reverse().join("-")
    return { dia: dia, fecha: fechaArreglada }
}



async function generateHTML(){
    let template = ""
    template = `
    <style>
        
    * {
        box-sizing: border-box;
        padding: 0px;
        margin: 0px;
        font-size: 12px !important;
        font-family: 'Times New Roman', Times, serif !important;
    }
    
    .containerRecibos{
       width: 80vw;
       margin: 0px auto;
       display: flex;
       flex-direction: column;
       align-items: center;
    }
    
    .containerRecibo{
        border: 2px solid black;
        border-radius: 4px;
        padding: 4px 12px;
        margin-bottom: 1px;
        width: 690px !important;
        max-width: 690px !important;
        height: 277px !important;
        max-height: 277px !important;
    }
    .containerRecibo > h3{
        text-align: center;
    }
    .containerFecha {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
        margin-right: 12px;
        margin-bottom: 20px
    }
    .containerRecibo > p {
        border-bottom: 1px solid black;
    
    }
    .extras{
       padding: 10px;
    }
    .containerFirma{
        text-align: center;
        margin-top: 20px
    }
    .containerFirma p {
        margin-bottom: 1px;
    }
    </style>
    `
    const empleados = await Employee.find({})
    empleados.sort((a, b) => {
        if (a.concept > b.concept) {
          return 1;
        }
        if (a.concept < b.concept) {
          return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }
        return 0;
      });
      
    const extras = await Extras.find({})
    const { dia, fecha } = await getDate()
    empleados.forEach(e => {
        const newSalary = numeroALetras(e.salary, {
            plural: "PESOS",
            singular: "PESO",
            centPlural: "CENTAVOS",
            centSingular: "CENTAVO"
        })
        if(e.fridayHoursWorked && !e.SaturdayHoursWorked){
            let addtemplate = `
            <div class="containerRecibo">
                <h3>RECIBO DE PAGO</h3>
                <div class="containerFecha">
                    <span>${dia}</span>
                    <span>${fecha}</span>
                </div>
                <p><b>Nombre:</b> ${e.name.toUpperCase()}</p>
                <p><b>Recibi de:</b> DESENCHUFADOS S.R.L</p>
                <p><b>La cantidad de:</b> $ ${e.salary} ${newSalary} </p>
                
                <p><b>Por concepto de:</b> ${e.concept.toUpperCase()} ${e.fridayHoursWorked} HS VIERNES </p>
                <p class="extras"></p>
                
                <div class="containerFirma">
                    <p>Firma:</p>
                    <p>Aclaracion:</p>
                    <p>DNI:</p>
                </div>        
            </div>
            `
            template += addtemplate
        }else if (e.fridayHoursWorked && e.SaturdayHoursWorked){
            let addtemplate = `
            <div class="containerRecibo">
                <h3>RECIBO DE PAGO</h3>
                <div class="containerFecha">
                    <span>${dia}</span>
                    <span>${fecha}</span>
                </div>
                <p><b>Nombre:</b> ${e.name.toUpperCase()}</p>
                <p><b>Recibi de:</b> DESENCHUFADOS S.R.L</p>
                <p><b>La cantidad de:</b> $ ${e.salary} ${newSalary} </p>
                
                <p><b>Por concepto de:</b> ${e.concept.toUpperCase()} ${e.fridayHoursWorked} HS VIERNES + ${e.SaturdayHoursWorked} HS SABADO </p>
                <p class="extras"></p>
                
                <div class="containerFirma">
                    <p>Firma:</p>
                    <p>Aclaracion:</p>
                    <p>DNI:</p>
                </div>        
            </div>
            `
            template += addtemplate
        } else if (!e.fridayHoursWorked && e.SaturdayHoursWorked){
            let addtemplate = `
            <div class="containerRecibo">
                <h3>RECIBO DE PAGO</h3>
                <div class="containerFecha">
                    <span>${dia}</span>
                    <span>${fecha}</span>
                </div>
                <p><b>Nombre:</b> ${e.name.toUpperCase()}</p>
                <p><b>Recibi de:</b> DESENCHUFADOS S.R.L</p>
                <p><b>La cantidad de:</b> $ ${e.salary} ${newSalary} </p>
                
                <p><b>Por concepto de:</b> ${e.concept.toUpperCase()} ${e.SaturdayHoursWorked} HS SABADO </p>
                <p class="extras"></p>
                
                <div class="containerFirma">
                    <p>Firma:</p>
                    <p>Aclaracion:</p>
                    <p>DNI:</p>
                </div>        
            </div>
            `
            template += addtemplate
        }
    })
    extras.forEach(e => {
        const newSalary = numeroALetras(e.salary, {
            plural: "PESOS",
            singular: "PESO",
            centPlural: "CENTAVOS",
            centSingular: "CENTAVO"
        })
        let extraTemplate = `
        <div class="containerRecibo">
            <h3>RECIBO DE PAGO</h3>
            <div class="containerFecha">
                <span>${dia}</span>
                <span>${fecha}</span>
            </div>
            <p><b>Nombre:</b> ${e.name.toUpperCase()}</p>
            <p><b>Recibi de:</b> DESENCHUFADOS S.R.L</p>
            <p><b>La cantidad de:</b> $ ${e.salary} ${newSalary} </p>
            
            <p><b>Por concepto de:</b> ${e.concept.toUpperCase()} </p>
            <p class="extras"></p>
            
            <div class="containerFirma">
                <p>Firma:</p>
                <p>Aclaracion:</p>
                <p>DNI:</p>
            </div>        
        </div>
        `
        template += extraTemplate
    }) 
    return template
}


module.exports = { generateHTML }