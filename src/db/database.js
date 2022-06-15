const mongoose = require("mongoose")
const URL = "mongodb://localhost:27017/recibos"

async function connectDB(){
    try{
        await mongoose.connect(URL)
        console.log(`Connected to DB`)
    } catch(err) {
        console.log(err)
    }
}

module.exports = connectDB