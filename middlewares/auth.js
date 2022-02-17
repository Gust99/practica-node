'use strict'

let jwt = require('jwt-simple');
let moment = require('moment');
let secret = 'abc123'

function ensureAuth(request, response, next) {
    if(!request.headers.authorization) {
        return response.status(403).send({ message: 'No authorization' });
    } else {
        let token = request.headers.authorization.replace(/['"]+/g,'');
        let data = jwt.decode(token, secret);
        if(data.exp <= moment().unix()) {
            return response.status(403).send({ message: 'Token expired' });
        } else {
            request.usuario = data;
        }
    }
    next();
}

module.exports = {
    ensureAuth
}