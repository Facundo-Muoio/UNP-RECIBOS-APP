const numeroALetras = require("./numerosALetras")

function makesEmployeesNew(arr){
    const newArr = arr.map(e => {
        const newSalary = numeroALetras(e.salary, {
            plural: "PESOS",
            singular: "PESO",
            centPlural: "CENTAVOS",
            centSingular: "CENTAVO"
          })
        let container = {}
        container.id = e._id
        container.name = e.name
        container.fridayCheckIn = e.fridayCheckIn
        container.fridayCheckOut = e.fridayCheckOut
        container.SaturdayCheckIn = e.SaturdayCheckIn
        container.SaturdayCheckOut = e.SaturdayCheckOut
        container.concept = e.concept
        container.extras = e.extras
        container.fridayHoursWorked = e.fridayHoursWorked
        container.SaturdayHoursWorked = e.SaturdayHoursWorked
        container.salary = "$" + e.salary + " " + newSalary
        return container
    })
    return newArr
}

function makesExtrasNew(arr){
    const newArr = arr.map(e => {
        const newSalary = numeroALetras(e.salary, {
            plural: "PESOS",
            singular: "PESO",
            centPlural: "CENTAVOS",
            centSingular: "CENTAVO"
          })
        let container = {}
        container.id = e._id
        container.name = e.name
        container.concept = e.concept
        container.salary = "$" + e.salary + " " + newSalary
        return container
    })
    return newArr
}


module.exports = { makesEmployeesNew, makesExtrasNew }