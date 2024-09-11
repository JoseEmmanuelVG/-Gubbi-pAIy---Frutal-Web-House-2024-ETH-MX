'use strict';

const dbconn = require('./dbconnstr');
const mongoose = require('mongoose');

mongoose.connect(dbconn)
    .then(() => console.log('Conexión exitosa a MongoDB Atlas'))
    .catch(err => console.error('Error al conectar a MongoDB Atlas:', err));
