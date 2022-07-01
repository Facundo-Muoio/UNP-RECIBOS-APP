const { Schema, model } = require("mongoose")

const extrasSchema = new Schema({
    name: {type:String, required: true},
    concept: {type:String, required:true},
    extras: String,
    salary: Number
})

const Extras = model("extra", extrasSchema)

module.exports = Extras