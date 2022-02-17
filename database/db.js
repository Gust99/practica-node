'use strict'

let { Sequelize } = require('sequelize');

let db = new Sequelize('postgres://postgres:system32@localhost:5432/practica');

module.exports = db;