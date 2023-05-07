const nodemailer = require('nodemailer');

const mail = {
    user: 'correo',
    pass: 'pass'
}

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: mail.user, // generated ethereal user
      pass: mail.pass, // generated ethereal password
    },
});

const sendEmail = async (email, subject, html) => {
    try {
        await transporter.sendMail({
            from: `Pet Society <${ mail.user }>`, // sender address
            to: email, // list of receivers
            subject, // Subject line
            text: "Correo de confirmacion", // plain text body
            html, // html body
        });

    } catch (error) {
        console.log('Algo no va bien con el email', error);
    }
}

const getTemplate = (name, token) => {
    return `
        <head>
            <link rel="stylesheet" href="./style.css">
        </head>
        
        <div id="email___content">
            <img src="https://i.imgur.com/iyFa1Mr.jpeg" alt="">
            <h2>Hola ${ name }</h2>
            <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
            <a
                href="http://localhost:8000/api/confirm/${ token }"
                target="_blank"
            >Confirmar Cuenta</a>
        </div>
    `;
}

module.exports = {
    sendEmail,
    getTemplate
}
