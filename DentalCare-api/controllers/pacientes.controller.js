const Paciente = require("../models/Paciente")

// OBTENER PACIENTES
const obtenerPacientes = async (req, res) => {

    try {

        const pacientes = await Paciente.find()

        res.json(pacientes)

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al obtener pacientes"
        })

    }

}

// CREAR PACIENTE
const crearPaciente = async (req, res) => {

    try {

        const paciente = new Paciente(req.body)

        await paciente.save()

        res.json({
            mensaje: "Paciente creado correctamente"
        })

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al crear paciente"
        })

    }

}
const eliminarPaciente = async (req, res) => {

    try {

        const id = req.params.id

        await Paciente.findByIdAndDelete(id)

        res.json({
            mensaje: "Paciente eliminado correctamente"
        })

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al eliminar paciente"
        })

    }
}
 const editarPaciente = async (req, res) => {

    try {

        const id = req.params.id

        const paciente = await Paciente.findByIdAndUpdate(id, req.body, { new: true })

        res.json({
            mensaje: "Paciente actualizado correctamente",
            paciente
        })

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al actualizar paciente"
        })

    }

}

module.exports = {
    obtenerPacientes,
    crearPaciente,
    eliminarPaciente,
    editarPaciente
}