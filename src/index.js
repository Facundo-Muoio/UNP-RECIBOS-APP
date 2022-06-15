const express = require("express")
const app = express()
const path = require("path")
const connectDB = require("./db/database")
const router = require("./routes/router")

//settings
app.set("port", process.env.PORT || 3000) 
app.set("views", path.join(__dirname, "public", "views"))
app.set("view engine", "ejs")
// console.log(path.join(__dirname, "public"))

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")))

//routers
app.use(router)

//starting server 
connectDB()
app.listen(app.get("port"), () => console.log(`server listen on PORT: ${app.get("port")}`))

