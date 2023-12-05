require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');

const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/@${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
//aca guardamos la direccion de este archivo basename = C:\Users\Yo que se\Desktop\PI-Videogames-main\api\src\db.js
const basename = path.basename(__filename);

const modelDefiners = [];
// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
//__dirname = C:\Users\Yo que se\Desktop\PI-Videogames-main\api\src
//aca juntamos dirname con /models y leemos todos los modelos que hay en la carpeta. En este caso son 2
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    //aca agrego  a modelDefiners lo que hay en la direccion de cada archivo de la carpeta models
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
//en entries quedaria asi: [ [ 'Genre', Genre ], [ 'videogame', videogame ] ]
let entries = Object.entries(sequelize.models);
//con lo siguiente ponemos en mayuscula la primer letra de los modelos [ [ 'Genre', Genre ], [ 'Videogame', videogame ] ]
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Pasajero } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
//un genero de mi tabla de genero pertenece a muchos videogames de mi tabla de videogames
//un videogame de mi tabla de videogame pertenece a muchos generos de mi tabla de generos
//haciendo esto, estoy creando una tabla intermedia en db con un id perteneciente al genero y un id perteneciente al videogame 

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
