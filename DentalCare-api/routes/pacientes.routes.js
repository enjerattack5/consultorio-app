const express = require("express")

const router = express.Router()

const PacientesController = require("../controllers/pacientes.controller")

// GET
router.get("/", PacientesController.obtenerPacientes)

// POST
router.post("/", PacientesController.crearPaciente)

//editar
router.put("/:id", PacientesController.editarPaciente)

//DELETE
router.delete("/:id", PacientesController.eliminarPaciente)
module.exports = router