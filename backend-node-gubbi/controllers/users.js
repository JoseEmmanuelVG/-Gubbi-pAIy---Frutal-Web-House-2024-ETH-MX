/////////users.js

const mongoose    = require("mongoose");
const bcrypt      = require("bcrypt");
const jwt         = require("jsonwebtoken");
const User        = require("../models/users");
const morgan      = require('morgan');
const { ethers }  = require("ethers"); // Importa ethers.js

exports.user_login = (req, res, next) => {
  console.log('req.body', req.body);
  User.find({ username: req.body.username })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Falló la autorización"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Falló la autorización"
          });
        }
        if (result) {
          console.log('Usuario encontrado:', user[0]);
          const token = jwt.sign(
            {
              username: user[0].username,
              userId: user[0]._id,
              publickey: user[0].publickey,
              cellnumber: user[0].cellnumber
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Autorización exitosa",
            token: token,
            username: user[0].username,
            publickey: user[0].publickey,
            privatekey: user[0].privatekey,  // Incluir clave privada aquí
            cellnumber: user[0].cellnumber,
          });
          
        }
        res.status(401).json({
          message: "Falló la autorización"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

// SignUp un nuevo usuario con generación de claves usando ethers.js
exports.user_signup = (req, res, next) => {
  console.log('req.body', req.body);
  User.find({ username: req.body.username })
    .exec()
    .then(user => {
      if (user.length !== 0) {
        console.warn('Usuario ya existe');
        return res.status(500).json({ message: 'Usuario ya existe' });
      } else {
        // Generar una nueva billetera usando ethers.js
        const wallet = ethers.Wallet.createRandom();
        const publickey = wallet.address;
        const privatekey = wallet.privateKey;

        // Encriptar el password del usuario
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            console.log('Error en hashing', err);
            return res.status(500).json({
              error: err
            });
          } else {
            const cellnumber = req.body.cellnumber ?? '';

            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username: req.body.username,
              cellnumber: cellnumber,
              password: hash,  // Almacena el hash del password
              publickey: publickey,  // Clave pública generada
              privatekey: privatekey, // Clave privada generada
            });

            user.save()
              .then(result => {
                console.log('Usuario creado exitosamente:', result);
                return res.status(201).json({
                  message: "Usuario creado exitosamente",
                  user: {
                    username: result.username,
                    publickey: result.publickey,
                    cellnumber: result.cellnumber,
                  }
                });
              })
              .catch(err => {
                console.log(err);
                return res.status(500).json({
                  message: err
                });
              });
          }
        });
      }
    })
    .catch((error) => {
      console.warn(error);
      return res.status(500).json({ message: error });
    });
};



//////ethers.js
/////web3
/////https://docs.ethers.org/v6/
/////https://viem.sh/docs/installation
///Al guardar nombre de usuario y contraseña, se crea una cuenta de Core y/o avalanch para que se guarden en el backend las credenciales y con ellas firmar  


// OJO. Debido a que la sesion se maneja con un token jsonw web, el servidor no mantiene sesiones abiertas y es el cliente quien deb preservar el token durante la sesion
// a eleccion del programador del cliente puede almacenar el token para enviarlo en cada interaccion con el server y cuando quiera cerrar sesion deberia simplemente
// eliminar el token



