const mongoose = require("mongoose")
const app = require("./app")

mongoose.connect("mongodb://127.0.0.1:27017/dentalcare")
.then(() => {

    console.log("Base de datos conectada")

    app.listen(4000, () => {
        console.log("Servidor corriendo en puerto 4000")
    })

})
.catch((error) => {
    console.log(error)
})