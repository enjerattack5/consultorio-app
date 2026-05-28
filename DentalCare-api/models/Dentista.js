const mongoose = require("mongoose")

const DentistaSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },

    especialidad: {
        type: String,
        required: true
    },

    horarios: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model("Dentista", DentistaSchema)