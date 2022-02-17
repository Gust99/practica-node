'use strict'

let app = require('./app');
let db = require('./database/db');

let port = 3000;

db.authenticate()
.then(async () => {
    await db.sync();
    
    app.listen(port, () => {
        console.log('Server up.');
    });
});