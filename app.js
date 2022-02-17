'use strict'

let express = require('express');
let bodyparser = require('body-parser');

let app = express();

//IMPORT ROUTES
let userRoute = require('./routes/userRoute'); 
let tareaRoute = require('./routes/tareaRoute');

//MIDDLEWARES

//CORS

//BODYPARSER
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//USE ROUTES
app.use('/api', userRoute);
app.use('/api', tareaRoute);

//EXPORT APP
module.exports = app;