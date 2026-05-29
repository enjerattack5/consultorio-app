import axios from "axios"

const API = "https://consultorio-api-kappa.vercel.app/api/pacientes"

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