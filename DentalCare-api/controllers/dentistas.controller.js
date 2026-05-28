const Dentista = require("../models/Dentista")

const obtenerDentistas = async (req, res) => {
    try {
        const dentistas = await Dentista.find()
        res.json(dentistas)
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener dentistas" })
    }
}

const crearDentista = async (req, res) => {
    try {
        const dentista = new Dentista(req.body)
        await dentista.save()
        res.json({ mensaje: "Dentista creado correctamente" })
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear dentista" })
    }
}

// EDITAR 
const editarDentista = async (req, res) => {
    try {
        const id = req.params.id
        const dentista = await Dentista.findByIdAndUpdate(id, req.body, { new: true })
        res.json({ mensaje: "Dentista actualizado correctamente", dentista })
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar dentista" })
    }
}

// ELIMINAR 
const eliminarDentista = async (req, res) => {
    try {
        const id = req.params.id
        await Dentista.findByIdAndDelete(id)
        res.json({ mensaje: "Dentista eliminado correctamente" })
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar dentista" })
    }
}

module.exports = {
    obtenerDentistas,
    crearDentista,
    editarDentista,
    eliminarDentista
}