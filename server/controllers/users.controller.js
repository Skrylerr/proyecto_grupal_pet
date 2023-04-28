const User = require('../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {secretKey} = require('../config/jwt.config');

module.exports.registrar = (req, res) => {
    User.create(req.body)
    .then(User => {
        console.log(User);
        res.json({
            error: false,
            mensaje: 'El usuario se ha registrado exitosamente'
        })
    }).catch(e => {
        console.error(e);
        res.json({
            error: true,
            mensaje: 'Ha ocurrido un error'
        })
    });
}

module.exports.login = (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(user == null) {
                res.json({
                    error: true,
                    mensaje: 'Usuario o Contraseña no válido'
                });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valido => {
                        if(valido) {
                            const payload = {
                                _id: user._id,
                                name: user.name,
                                lastName: user.lastName,
                                email: user.email
                            }
                            const newJWT = jwt.sign(payload, secretKey);
                            res.cookie("usertoken", newJWT, secretKey, {
                                httpOnly: true
                            })
                            .json({ error: false, datos: payload});
                        } else {
                            res.json({
                                error: true,
                                mensaje: 'Usuario o Contraseña no válido'
                            });
                        }
                    })
            }
        })
}