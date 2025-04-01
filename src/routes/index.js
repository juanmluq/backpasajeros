const { Router } = require('express');
const axios = require('axios');
const {Pasajero} = require ("../db");
const router = Router();

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

const getDbInfo = async () => {
    return await Pasajero.findAll({})
}

const getAllPasajeros = async () => {
    const dbInfo = await getDbInfo();
    return dbInfo
}     

router.get("/pasajeros", async (req, res) => {
    const name = req.query.name
    let pasajerosTotal = await getAllPasajeros();
      if(name) {
        let pasajeroName = await pasajerosTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))//selecciona el name y detecta si incluye lo
        // que le pase por query, en este caso name. Tambien convierte a minuscula para comparar que sea igual indistinto si hay mayusculas. El include es 
        // para hacer una busqueda mas global (si pongo === deberia ser exactamente lo mismo).
        pasajeroName.length ? 
        res.status(200).send(pasajeroName) : 
        res.status(404).send("No esta el pasajero");
      } else {
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
        createdindb
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
      createdindb 
    })
   
  console.log(pasajeroCreated); 
  res.send("Pasajero creado con exito")
 });

 router.get("/pasajeros/:id", async (req, res) => {
    const id = req.params.id; // const {id}: req.params
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
