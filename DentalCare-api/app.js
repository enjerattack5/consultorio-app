const express = require("express")
const cors = require("cors")

const app = express()

// CONFIGURACIONES
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// RUTAS
const pacientesRoutes = require("./routes/pacientes.routes")
const dentistasRoutes = require("./routes/dentistas.routes")
const citasRoutes = require("./routes/citas.routes")
const contactoRoutes = require("./routes/contacto.routes")  
app.use("/api/contacto", contactoRoutes)                     
app.use("/api/pacientes", pacientesRoutes)
app.use("/api/dentistas", dentistasRoutes)
app.use("/api/citas", citasRoutes)

module.exports = app