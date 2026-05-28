import axios from "axios"

const API = "http://localhost:4000/api/pacientes"

const obtenerPacientes = async () => {
    return await axios.get(API)
}

const crearPaciente = async (data) => {
    return await axios.post(API, data)
}

const eliminarPaciente = async (id) => {
    return await axios.delete(`${API}/${id}`)
}
const editarPaciente = async (id, data) => {
    return await axios.put(`${API}/${id}`, data)
}
export default {
    obtenerPacientes,
    crearPaciente,
    eliminarPaciente,
    editarPaciente
}