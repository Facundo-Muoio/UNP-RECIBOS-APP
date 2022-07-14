const express = require("express")
const app = express()
const path = require("path")
const connectDB = require("./db/database")
const methodOverride = require("method-override")
const session = require("express-session")
const cors = require("cors")
require('dotenv').config()

//const rutas
const Mozos = require("./routes/Mozos")
const Bartenders = require("./routes/Bartenders")
const routerExtras = require("./routes/Extras")
const Cajeros = require("./routes/Cajeros")
const Boleteros = require("./routes/Boleteros")
const Anfitrionas = require("./routes/Anfitrionas")
const Cocineros = require("./routes/Cocineros")
const Runners = require("./routes/Runners")
const Presencias = require("./routes/Presencias")
const Home = require("./routes/home")
const Descargar = require("./routes/Descargar")
const routerFecha = require("./routes/Fecha")
const Reset = require("./routes/Reset")

//settings
app.set("port", process.env.PORT || process.env.YOUR_PORT) 
app.set("views", path.join(__dirname, "public", "views"))
app.set("view engine", "ejs")
app.set("json spaces", 2)
// console.log(path.join(__dirname, "public"))

//middlewares
app.use(methodOverride("_method"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")))
app.use(session({
    secret:"secreto",
    resave: true,
    saveUninitialized: true
}))
app.use(cors())

//routers
app.use(Mozos)
app.use(routerExtras)
app.use(Bartenders)
app.use(Cajeros)
app.use(Boleteros)
app.use(Anfitrionas)
app.use(Cocineros)
app.use(Runners)
app.use(Presencias)
app.use(Home)
app.use(routerFecha)
app.use(Descargar)
app.use(Reset)

//starting server 
connectDB()
app.listen(app.get("port"), () => console.log(`server listen on PORT: ${app.get("port")}`))

