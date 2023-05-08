const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El Nombre es obligatorio"],
      minLength: [2, "El largo minimo del nombre es de 2 caracteres"]
    },
    lastName: {
      type: String,
      required: [true, "El Apellido es obligatorio"],
      minLength: [2, "El largo minimo del apeliido es de 2 caracteres"]
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      minLength: [4, "El email debe ser de largo al menos 4"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minLength: [4, "La contraseña debe contener al menos 4 caracteres"]
    },
    code: {
      type: String,
      required: true,
      default: ""
    },
    status: {
      type: String,
      required: true,
      default: "UNVERIFIED"
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
