/* const express = require("express");


const app = express();
app.use(express.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

require('./routes/pet.routes')(app)


const server = app.listen(8000, ()=>{
    console.log("Se levanto el servidor en el puerto 8000");
}) */

const express = require('express');
const app = express();
const cors = require('cors'); 
const cookieParser = require('cookie-parser');
const jwt = require ('jsonwebtoken');
const keys = require('../server/config/jwt.config')


app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));



require('./config/mongoose.config');
require('./routes/pet.routes')(app);
require('./routes/users.routes')(app);

app.set('Key',keys.Key)

const server = app.listen(8000, ()=>{
    console.log("Se levanto el servidor en el puerto 8000");
})