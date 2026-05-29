import axios from "axios"

const API = "https://consultorio-api-kappa.vercel.app/api/contacto"

const enviarMensaje = async (data) => await axios.post(API, data)

export default { enviarMensaje }