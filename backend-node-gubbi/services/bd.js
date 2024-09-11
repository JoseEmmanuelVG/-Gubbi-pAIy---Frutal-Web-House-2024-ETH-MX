const mongoose = require('mongoose');

// Construir la cadena de conexión usando las variables de entorno
let cnxMongoose = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@gubbi.8sico.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
console.log('Conectando a MongoDB con la cadena:', cnxMongoose);

// Conectar a MongoDB Atlas
mongoose.connect(cnxMongoose, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexión exitosa a MongoDB Atlas'))
    .catch(err => console.error('Error al conectar a MongoDB Atlas:', err));

mongoose.set('useFindAndModify', false);

// Definir un esquema y un modelo de ejemplo
const Schema = mongoose.Schema;
const UserDetail = new Schema({
  username: String,
  password: String,
  publickey: String,
});

const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

// Exportar el módulo
module.exports = {
    mongoose,
    UserDetails,
};
