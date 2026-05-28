import axios from "axios"

const API = "http://localhost:4000/api/dentistas"

const obtenerDentistas = async () => await axios.get(API)
const crearDentista = async (data) => await axios.post(API, data)
const editarDentista = async (id, data) => await axios.put(`${API}/${id}`, data)
const eliminarDentista = async (id) => await axios.delete(`${API}/${id}`)

export default { obtenerDentistas, crearDentista, editarDentista, eliminarDentista }