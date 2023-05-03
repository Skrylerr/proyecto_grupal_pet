const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema(
  {
    petName: {
      type: String,
      required: [true, "El nombre de la mascota es requerido"],
      minlength: [3, "El largo minimo del nombre es de 3 caracteres "]
    },
    type: {
      type: String,
      required: [true, "El tipo de mascota es requerido"]
    },
    gender: {
      type: String,
      required: [true, "El sexo de la mascota es requerido"]
    },
    born: {
      type: Date,
      required: [true, "La fecha de nacimiento de la mascota es requerido"]
    },
    description: {
      type: String,
      required: [true, "La descripcion de la mascota es requerido"],
      minlength: [
        5,
        "El largo minimo de la descripcion de la mascota es de 5 caracteres"
      ]
    },
    vacunado: {
      type: Boolean,
      default: false
    },
    desparasitado: {
      type: Boolean,
      default: false
    },
    esterilizado: {
      type: Boolean,
      default: false
    },
    microchip: {
      type: Boolean,
      default: false
    },
    identificado: {
      type: Boolean,
      default: false
    },
    linkimagen: {
      type: String,
      required: [true, "La imagen de la mascota es requerida."]
    },
    linkimagen2: {
      type: String,
      required: [true]
    },
    linkimagen3: {
      type: String,
      required: [true]
    },
    linkimagen4: {
      type: String,
      required: [true]
    },
    ubicacion: {
      type: String,
      required: [true, "La ubicación es requerida."]
    },
    coordenadas: {
      type: Object
    }
  },
  { timestamps: true }
);

const Pet = mongoose.model("Pet", PetSchema);
module.exports = Pet;
