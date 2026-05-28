const express = require("express")
const router = express.Router()
const CitasController = require("../controllers/citas.controller")

router.get("/", CitasController.obtenerCitas)
router.post("/", CitasController.crearCita)
router.put("/:id", CitasController.editarCita)      
router.delete("/:id", CitasController.eliminarCita) 

module.exports = router