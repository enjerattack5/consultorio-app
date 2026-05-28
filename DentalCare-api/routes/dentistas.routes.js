const express = require("express")
const router = express.Router()
const DentistasController = require("../controllers/dentistas.controller")

router.get("/", DentistasController.obtenerDentistas)
router.post("/", DentistasController.crearDentista)
router.put("/:id", DentistasController.editarDentista)       
router.delete("/:id", DentistasController.eliminarDentista)  

module.exports = router