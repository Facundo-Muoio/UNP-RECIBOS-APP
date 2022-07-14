const mongoose = require("mongoose")
require('dotenv').config()
const URL = `${process.env.MONGO_URL}` 

async function connectDB(){
    try{
        await mongoose.connect(URL)
        console.log(`Connected to DB`)
    } catch(err) {
        console.log(err)
    }
}

module.exports = connectDB