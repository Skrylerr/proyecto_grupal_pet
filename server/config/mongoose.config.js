const mongoose = require('mongoose')

mongoose.connect('mongodb://0.0.0.0:27017/pet_shelter', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then (() => console.log("Se conectó correctamente a la Base de datos"))
.catch((err) => console.log("Hubo un error al conectarse a la Base de datos", err))

module.exports = mongoose;