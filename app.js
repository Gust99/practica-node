'use strict'

let express = require('express');
let bodyparser = require('body-parser');
let cors = require('cors');

let app = express();

//IMPORT ROUTES
let usuarioRoute = require('./routes/usuarioRoute'); 
let tareaRoute = require('./routes/tareaRoute');

//MIDDLEWARES

//CORS
app.use(cors());

//BODYPARSER
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//USE ROUTES
app.use('/api', usuarioRoute);
app.use('/api', tareaRoute);

//EXPORT APP
module.exports = app;