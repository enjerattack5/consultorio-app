const express = require("express")
const router = express.Router()
const ContactoController = require("../controllers/contacto.controller")

router.post("/", ContactoController.enviarMensaje)

module.exports = router