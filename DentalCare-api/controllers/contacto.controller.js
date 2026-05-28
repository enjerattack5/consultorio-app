const Contacto = require("../models/Contacto")

const enviarMensaje = async (req, res) => {
    try {
        const contacto = new Contacto(req.body)
        await contacto.save()
        res.json({ mensaje: "Mensaje enviado correctamente" })
    } catch (error) {
        res.status(500).json({ mensaje: "Error al enviar mensaje" })
    }
}

module.exports = { enviarMensaje }