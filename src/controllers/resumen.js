const Employee  = require("../models/Employee")
const Extra = require("../models/Extras")
const Fecha = require("../models/Fecha")
let sueldos 

async function getDate(){
    const dates = await Fecha.find({})
    const lastDate = dates[dates.length - 1]
    if(!lastDate){
        return { dia: "falta ingresar un dia", fecha: "falta ingresar una fecha" }
    }
    const dia = lastDate.day.toUpperCase()
    const fecha = lastDate.date
    const fechaArreglada = fecha.split("-").reverse().join("-")
    return { dia: dia, fecha: fechaArreglada }
}

async function getEmployees(){
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
    return empleados 
}

async function getExtras(){
    const extras = await Extra.find({})
    return extras
}

async function resumenHTML(){
    const arrEmpleados = await getEmployees()
const arrExtras = await getExtras()
const fecha = await getDate()


const html = `
    <h3>${fecha.dia} ${fecha.fecha}</h3>
    <table class="table table-hover tableResumen">
    <thead>
      <tr>
        <th scope="col">NOMBRE</th>
        <th scope="col">CONCEPTO</th>
        <th scope="col">H.VIERNES</th>
        <th scope="col">H.SABADO</th>
        <th scope="col">EXTRAS</th>
        <th scope="col">SUELDO</th>
      </tr>
    </thead>
    <tbody class="tbodyResumen">
        ${arrEmpleados.forEach(e  => {
            `
            <tr>
                <td>${e.name}</td>
                <td>${e.concept}</td>
                <td>${e.fridayHoursWorked}</td>
                <td>${e.SaturdayHoursWorked}</td>
                <td>${(e.extras)}</td>
                <td>${e.salary}</td>
            </tr>
            ${sueldos += e.salary + Number(e.extras)}
            `
        })}
        ${arrExtras.forEach(e  => {
            `
            <tr>
                <td>${e.name}</td>
                <td>${e.concept}</td>
                <td>${e.fridayHoursWorked}</td>
                <td>${e.SaturdayHoursWorked}</td>
                <td>${e.extras}</td>
                <td>${e.salary}</td>
            </tr>
            ${sueldos += e.salary + Number(e.extras)}
            `
        })}
    </tbody>
</table>
<h3>total a pagar = ${sueldos}</h3>
`
return html
}


module.exports = { resumenHTML }