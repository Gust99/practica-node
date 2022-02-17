'use strict'

function holaMundo(request, response) {
    response.status(200).send({ message: 'Hola mundo' });
}

module.exports = {
    holaMundo
}