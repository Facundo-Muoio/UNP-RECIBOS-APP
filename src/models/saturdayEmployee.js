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

employeeSchema.methods.hoursWorkedCalc = () => {
    let horaIngreso = this.checkIn.split(":")
    let horaEgreso = this.checkOut.split(":")
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
    } else {
        minutes = (c - d) / 60
    }
    this.hoursWorked = hours + minutes
}

employeeSchema.methods.salaryCalc = () => {
    if(this.concept === "mozo"){
        let salary = (this.hoursWorked * 275) + 12.5
        this.salary = salary
    }
}

const saturdayEmployee = model("sabados", employeeSchema)

module.exports = saturdayEmployee