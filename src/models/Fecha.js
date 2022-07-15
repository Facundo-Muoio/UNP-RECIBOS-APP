const { Schema, model } = require("mongoose")

const fechaSchema = new Schema({
    day: {type:String, required: true},
    date: {type: String, required: true}
})

const Day = model("fecha", fechaSchema )

module.exports = Day