'use strict'

let { DataTypes } = require('sequelize');
let db = require('../database/db');

const Tarea = db.define('Tarea', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(300),
        defaultValue: '',
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    terminada: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
});

module.exports = Tarea;