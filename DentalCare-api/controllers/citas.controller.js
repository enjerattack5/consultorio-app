const Cita = require("../models/Cita")

const obtenerCitas = async (req, res) => {
    try {
        const citas = await Cita.find()
        res.json(citas)
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener citas" })
    }
}

const crearCita = async (req, res) => {
    try {
        const cita = new Cita(req.body)
        await cita.save()
        res.json({ mensaje: "Cita creada correctamente" })
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear cita" })
    }
}

// EDITAR 
const editarCita = async (req, res) => {
    try {
        const id = req.params.id
        const cita = await Cita.findByIdAndUpdate(id, req.body, { new: true })
        res.json({ mensaje: "Cita actualizada correctamente", cita })
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar cita" })
    }
}

// ELIMINAR 
const eliminarCita = async (req, res) => {
    try {
        const id = req.params.id
        await Cita.findByIdAndDelete(id)
        res.json({ mensaje: "Cita eliminada correctamente" })
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar cita" })
    }
}

module.exports = {
    obtenerCitas,
    crearCita,
    editarCita,
    eliminarCita
}