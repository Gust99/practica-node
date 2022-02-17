'use strict'

let { Op } = require('sequelize');
let tareaModel = require('../models/tarea');

async function createTarea(request, response) {
    let inputData = request.body;

    let createdRow = await tareaModel.create(inputData);

    response.status(200).send({ createdRow });
}
async function updateTarea(request, response) {
    let id = request.params.id;
    let updatedRow = request.body;

    let oldRow = await tareaModel.findAll({
        where: {
            [Op.and]: [
                { id: id },
                { visible: true }
            ]
        }
    });

    if(oldRow.length > 0) {
        oldRow = oldRow[0];
    
        oldRow.update(updatedRow);
        await oldRow.save();
        
        response.status(200).send({ oldRow });
    } else {
        response.status(409).send({ message: 'Tarea not found' });
    }
}
async function deleteTarea(request, response) {
    let id = request.params.id;

    let targetRow = await tareaModel.findAll({
        where: {
            [Op.and]: [
                { id: id },
                { visible: true }
            ]
        }
    });

    if(targetRow.length > 0) {
        targetRow = targetRow[0];

        targetRow.update({ visible: false });
        targetRow.save();
    
        response.status(200).send({ message: 'deleted' });
    } else {
        response.status(409).send({ message: 'Tarea not found' });
    }
}
async function getAllTareas(request, response) {
    let allRows = await tareaModel.findAll({
        where: {
            visible: {
                [Op.eq]: true
            }
        }
    });

    response.status(200).send({ allRows });
}
async function getTarea(request, response) {
    let id = request.params.id;

    let selectedRow = await tareaModel.findAll({
        where: {
            [Op.and]: [
                { id: id },
                { visible: true }
            ]
        }
    });

    if(selectedRow.length > 0) {
        selectedRow = selectedRow[0];

        response.status(200).send({ selectedRow });
    } else {
        response.status(409).send({ message: 'Tarea not found' });
    }
}
async function getTareaByNombre(request, response) {
    let nombre = request.params.nombre;

    let rowsFounded = await tareaModel.findAll({
        where: {
            [Op.and]: [
                {
                    nombre: {
                        [Op.like]: `%${nombre}%`
                    }
                },
                { visible: true }
            ]
        }
    });

    if(rowsFounded.length > 0) {
        response.status(200).send(rowsFounded);
    } else {
        response.status(409).send({ message: 'Tarea not found' });
    }
}
async function getTareasByUser(request, response) {
    let user_id = request.body.user_id;

    let rowsFounded = await tareaModel.findAll({
        where: {
            [Op.and]: [
                { user_id: user_id },
                { visible: true }
            ]
        }
    });

    response.status(200).send({ rowsFounded });
}

module.exports = {
    createTarea,
    updateTarea,
    deleteTarea,
    getAllTareas,
    getTarea,
    getTareaByNombre,
    getTareasByUser
}