const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El Nombre es obligatorio'],
        minLength: [2, 'El largo minimo del nombre es de 2 caracteres']
    },
    lastName: {
        type: String,
        required: [true, 'El Apellido es obligatorio'],
        minLength: [2, 'El largo minimo del apeliido es de 2 caracteres']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        minLength: [4, 'El email debe ser de largo al menos 4'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minLength: [4, 'La contraseña debe contener al menos 4 caracteres']
    },
}, {timestamps: true});


    // add this after UserSchema is defined
    UserSchema.virtual('confirmPassword')
        .get( () => this._confirmPassword )
        .set( value => this._confirmPassword = value );

        UserSchema.pre('validate', function(next) {
        if (this.password !== this.confirmPassword) {
            this.invalidate('confirmPassword', 'Las claves deben ser iguales');
        }
        next();
    });

    // this should go after 
    UserSchema.pre('save', function(next) {
        bcrypt.hash(this.password, 10)
            .then(hash => {
                this.password = hash;
                next();
            });
    });



const User = mongoose.model("User", UserSchema)
module.exports = User;