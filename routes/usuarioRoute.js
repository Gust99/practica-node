'use strict'

let express = require('express');
let api = express.Router();
let auth = require('../middlewares/auth');

//IMPORT CONTROLLERS
let usuarioController = require('../controllers/usuarioController');

//SET ROUTES AND ITS FUNCTIONS
api.use('/usuarios/add', (request, response) => {
    usuarioController.createUsuario(request, response);
});
api.use('/usuarios/update', (request, response, next) => {
    auth.ensureAuth(request, response, next);
}, (request, response) => {
    usuarioController.updateUsuario(request, response);
});
api.use('/usuarios/delete', (request, response, next) => {
    auth.ensureAuth(request, response, next);
}, (request, response) => {
    usuarioController.deleteUsuario(request, response);
});
api.use('/usuarios/login', (request, response) => {
    usuarioController.login(request, response);
});

//EXPORT ROUTER
module.exports = api;