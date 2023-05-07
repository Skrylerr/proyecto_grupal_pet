const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Key, getToken, getTokenData} = require("../config/jwt.config");
const { v4: uuidv4 } = require('uuid')
const { getTemplate, sendEmail } = require("../config/mail.config")


const registrar = async (req, res) => {
  try {

      // Obtener la data del usuario:
      const { name, lastName, email, password, confirmPassword } = req.body;

      // Verificar que el usuario no exista
      let user = await User.findOne({ email }) || null;

      if(user !== null) {
        return res.json({
          error: true,
          mensaje: 'Email ya existe'
        });
      }
      // Verificar que las contraseñas sean iguales
      if (password !== confirmPassword) {
        return res.json({
          error: true,
          mensaje: 'Las contraseñas no coinciden'
        });
      }

      // Generar el código
      const code = uuidv4();

      // Crear un nuevo usuario y encriptar contraseña
      const password_encriptado = await bcrypt.hash(password, 10)
      user = new User({ 
        name: name, 
        lastName: lastName, 
        email: email, 
        password: password_encriptado, 
        code: code });

      // Generar token
      const token = getToken({ email, code });

      // Obtener un template
      const template = getTemplate(name, token);

      // Enviar el email
      await sendEmail(email, 'Correo de confirmación', template);
      await user.save();
      console.log(user);

      res.json({
          error: false,
          mensaje: 'Registrado correctamente'
      });

  } catch (error) {
      console.log(error);
      return res.json({
          error: true,
          mensaje: 'Error al registrar usuario'
      });
  }
}

const login = (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    //Verificar si existe el usuario
    if (user == null) {
      res.json({
        error: true,
        mensaje: "Usuario o Contraseña no válido"
      });
      return;
    }
    //Validar que la cuanta este confirmada
    if(user.status == "UNVERIFIED") {
      return res.json({
        error: true,
        mensaje: 'Por favor revisar su correo, debe confirmar su cuenta.'
      });
    } else {
      bcrypt.compare(req.body.password, user.password).then((valido) => {
        if (valido) {
          const payload = {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email
          };
          const newJWT = jwt.sign(payload, Key);
          res
            .cookie("token", newJWT, Key, {
              httpOnly: true
            })
            .json({ error: false, datos: payload });
        } else {
          res.json({
            error: true,
            mensaje: "Usuario o Contraseña no válido"
          });
        }
      });
    }
  });
};

const confirmar = async (req, res) => {
  try {

    // Obtener el token
    const { token } = req.params;
    
    // Verificar la data
    const data = await getTokenData(token);

    if(data === null) {
      return res.json({
        error: true,
        mensaje: 'Error al obtener data'
      });
    }

    console.log(data);

    const { email, code } = data.data;

    // Verificar existencia del usuario
    const user = await User.findOne({ email }) || null;

    if(user === null) {
      return res.json({
        error: true,
        mensaje: 'Usuario no existe'
      });
    }

    // Verificar el código
    if(code !== user.code) {
      return res.redirect('/error.html');
    }

    // Actualizar status de usuario
    user.status = 'VERIFIED';
    await user.save();

    // Redireccionar a la confirmación
    return res.redirect('/confirm.html');
    
  } catch (error) {
    console.log(error);
    return res.json({
        error: true,
        mensaje: 'Error al confirmar usuario'
    });
  }
}

module.exports = {
  registrar,
  login,
  confirmar
}