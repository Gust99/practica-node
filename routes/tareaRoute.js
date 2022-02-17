'use strict'

let express = require('express');
let api = express.Router();

let tareaController = require('../controllers/tareaController');

api.post('/tareas/add', (request, response) => {
    tareaController.createTarea(request, response);
});

module.exports = api;