'use strict'

let express = require('express');
let api = express.Router();
let auth = require('../middlewares/auth');

let tareaController = require('../controllers/tareaController');

api.post('/tareas/add', (request, response, next) => {
    auth.ensureAuth(request, response, next);
}, (request, response) => {
    tareaController.createTarea(request, response);
});
api.put('/tareas/update/:id', (request, response, next) => {
    auth.ensureAuth(request, response, next);
}, (request, response) => {
    tareaController.updateTarea(request, response);
});
api.delete('/tareas/delete/:id', (request, response, next) => {
    auth.ensureAuth(request, response, next);
}, (request, response) => {
    tareaController.deleteTarea(request, response);
});
api.get('/tareas/all', (request, response) => {
    tareaController.getAllTareas(request, response);
});
api.get('/tareas/:id', (request, response) => {
    tareaController.getTarea(request, response);
});
api.get('/tareas/:nombre', (request, response, next) => {
    auth.ensureAuth(request, response, next);
}, (request, response) => {
    tareaController.getTareaByNombre(request, response);
});
api.get('/tareas/user', (request, response, next) => {
    auth.ensureAuth(request, response, next);
}, (request, response) => {
    tareaController.getTareasByUser(request, response);
});

module.exports = api;