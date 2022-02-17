'use strict'

let tareaModel = require('../models/tarea');

async function createTarea(request, response) {
    let inputData = request.body;

    let createdRow = await tareaModel.create(inputData);

    response.status(200).send({ createdRow });
}

module.exports = {
    createTarea
}