'use strict'

let jwt = require('jwt-simple');
let moment = require('moment');
let secret = 'abc123';

exports.createToken = (userData) => {
    userData.exp = moment().add(30,'days').unix;

    return jwt.encode(jwt, secret);
}