const { Router } = require('express');
//const { path } = require('../app');
const axios = require('axios');
const {Pasajero} = require ("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const users = [
  {id: 1, name: 'Franco', email: 'Franco@gmail.com', password: '1234'},
  {id: 2, name: 'Matias', email: 'Matias@gmail.com', password: '1234'}
]

const isAuthenticated = (req, res, next) => {
  const { userId } = req.cookies;
  const user = users.find(user => user.id.toString() == userId);
  if ( user ) return res.redirect('/home');
  next();
};

const isNotAuthenticated = (req, res, next) => {
  const { userId } = req.cookies;
  const user = users.find(user => user.id.toString() == userId);
  if ( !user ) return res.redirect('/login');
  next();
};



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//const YOUR_API_KEY = a256b5f8e0754e568482f7d8ef4cf6d8;

const getDbInfo = async () => {// esta funcion me trae la info de la base de datos
    return await Pasajero.findAll({})
}

const getAllPasajeros = async () => { //aca JUNTO LA DB Y LA INFO DE LA API
    const dbInfo = await getDbInfo();
    return dbInfo
}

          

router.get("/pasajeros", async (req, res) => {
    const name = req.query.name
    let pasajerosTotal = await getAllPasajeros();
    if(name) {//si hay un name que me pasen por query
        let pasajeroName = await pasajerosTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))//agarra el name y fijate si incluye lo
        // que le pase por query en este caso name. tambien convierte a minuscula para comparar que sea igual indistinto si hay mayusculas. El include es 
        // para hacer una busqueda mas global (si pongo === deberia ser exactamente lo mismo).
        pasajeroName.length ? //si existe videogameName devolver ese videogameName:
        res.status(200).send(pasajeroName) : //sino hacer:
        res.status(404).send("No esta el pasajero");
    } else { //si no me pasan name por query hacer:
        res.status(200).send(pasajerosTotal)
    }
    })


 router.post("/pasajero", async (req, res) => {
    let { 
        name,
        email,
        telefono,
        nacimiento,
        fecsalida,
        destino,
        cantpersonas,
        cantnoches,
        pedidoadic,
        createdindb //esto es para ver si esta creado en db
    } = req.body
 

    let pasajeroCreated = await Pasajero.create ({
      name,
      email,
      telefono,
      nacimiento,
      fecsalida,
      destino,
      cantpersonas,
      cantnoches,
      pedidoadic,
      createdindb //no se pone genres porque es una relacion aparte
    })
   
  console.log(pasajeroCreated); 
  res.send("Pasajero creado con exito")
 });

 router.get("/pasajeros/:id", async (req, res) => {
    const id = req.params.id; //es lo mismo que hacer const {id}: req.params
    const pasajerosTotal = await getAllPasajeros();
    if(id) {
        let pasajeroId = await pasajerosTotal.filter(el => el.id == id)
        pasajeroId.length ?
        res.status(200).json(pasajeroId) :
        res.status(404).send("no encontre ese pasajero");
    }
});

router.delete("/pasajeros/:id", async (req,res) => {
    
  try{
      let id = req.params.id;
      await Pasajero.destroy({
          where: {
              id,
          },
      });
      res.status(200).send("Usuario eliminado correctamente!")
  } catch(error){
      res.status(400).send("No se pudo eliminar el usuario")
  }
  })

module.exports = router;
