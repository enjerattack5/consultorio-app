import axios from "axios"

const API = "http://localhost:4000/api/contacto"

const enviarMensaje = async (data) => await axios.post(API, data)

export default { enviarMensaje }