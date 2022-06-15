const { Schema, model } = require("mongoose")

const employeeSchema = new Schema({
    name: {type:String, required: true},
    checkIn: {type:String, required: true},
    checkOut: {type:String, required: true},
    hoursWorked: String,
    concept: {type:String, required:true},
    extras: String,
    salary: Number
})

employeeSchema.methods.hoursWorkedCalc = function() {
    x = this.checkIn
    y = this.checkOut
    horaIngreso = x.split(":")
    horaEgreso = y.split(":")
    let a = Number(horaIngreso[0])
    let b = Number(horaEgreso[0])
    let c = Number(horaIngreso[1])
    let d = Number(horaEgreso[1])
    let hours
    let minutes
    if(a <= b){
        hours = b - a 
    } else {
        let count = 0
        for(let i = a; i < b + 24 ; i++){
          count++
        }
        hours = count
    }
    if (c <= d) {
        minutes = (d - c) / 60 
        this.hoursWorked = hours + minutes
    } else {
        minutes = (d + 60  - c)  / 60
        this.hoursWorked = hours - 1 + minutes
    }
    console.log(hours, minutes)
    console.log(this.hoursWorked)
}

employeeSchema.methods.salaryCalc = function() {
    console.log(this.hoursWorked)
    if(this.concept === "mozo"){
        let salary = (this.hoursWorked * 275) + 12.5
        this.salary = Number(salary)
    }
}

const fridayEmployee = model("viernes", employeeSchema)

module.exports = fridayEmployee