'use strict'

let { Op } = require('sequelize');
let usuarioModel = require('../models/usuario');
let bcrypt = require('bcrypt');
let jwt = require('../services/jwt');

async function createUsuario(request, response) {
    let newUser = request.body;

    let existingUser = await usuarioModel.findAll({
        where: {
            [Op.and]: [
                { user: newUser.user },
                { visible: true }
            ]
        }
    });

    if(existingUser.length > 0) {
        response.status(409).send({ message: 'User already exists' });
    } else {
        bcrypt.genSalt(3, function(err, salt) {
            bcrypt.hash(newUser.password, salt, async function(err, hash) {
                newUser.password = hash;
                let newUserCreated = await usuarioModel.create(newUser);
    
                response.status(201).send({ newUserCreated });
            });
        });
    }
}
async function updateUsuario(request, response) {
    let updatedRow = request.body;

    let oldRow = await usuarioModel.findAll({
        where: {
            [Op.and]: [
                { id: updatedRow.id },
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
        response.status(409).send({ message: 'User not found' });
    }
}
async function deleteUsuario(request, response) {
    let id = request.body.id;

    let targetRow = await usuarioModel.findAll({
        where: {
            [Op.and]: [
                { id: id },
                { visible: true}
            ]
        }
    });

    if(targetRow.length > 0) {
        targetRow = targetRow[0];

        targetRow.update({ visible: false });
        targetRow.save();

        response.status(200).send({ message: 'deleted' });
    } else {
        response.status(409).send({ message: 'User not found' });
    }
}
async function login(request, response) {
    let usuario = request.body;

    let rowFounded = await usuarioModel.findAll({
        where: {
            user: usuario.user
        }
    });

    if(rowFounded.length > 0) {
        rowFounded = rowFounded[0];

        bcrypt.compare(usuario.password, rowFounded.password, (err, res) => {
            if(res) {
                let token = jwt.createToken(rowFounded);

                response.status(200).send({ token });
            } else {
                response.status(409).send({ message: 'Invalid data' });
            }
        });
    } else {
        response.status(409).send({ message: 'Invalid data' });
    }
}

module.exports = {
    createUsuario,
    updateUsuario,
    deleteUsuario,
    login
}