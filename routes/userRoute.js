'use strict'

let express = require('express');
let api = express.Router();

//IMPORT CONTROLLERS
let userController = require('../controllers/userController');

//SET ROUTES AND ITS FUNCTIONS
api.get('/holamundo', (request, response) => {
    userController.holaMundo(request, response);
});

//EXPORT ROUTER
module.exports = api;