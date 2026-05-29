import axios from "axios"

const API = "https://consultorio-api-kappa.vercel.app/api/citas"

const obtenerCitas = async () => await axios.get(API)
const crearCita = async (data) => await axios.post(API, data)
const editarCita = async (id, data) => await axios.put(`${API}/${id}`, data)
const eliminarCita = async (id) => await axios.delete(`${API}/${id}`)

export default { obtenerCitas, crearCita, editarCita, eliminarCita }