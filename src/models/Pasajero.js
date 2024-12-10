const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pasajero', {
    id: {
      type: DataTypes.UUID, //es un numero random con numeros y letras que no se va a repetir. Porq cuando mando los datos de la api asi no se van a pisar los id
      defaultValue: DataTypes.UUIDV4, //
      allowNull: false, //allownull dice que no te permito que no este en vacio. si le pongo false le digo que no este vacio.
      primaryKey: true //es la clave primaria osea el id.
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      //unique: esto me sirve para un mail por ejemplo. suponiendo que registro mi mail luque11@gmail.com si viene otro a querer regristrarse con el mismo mail no lo deja
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    telefono: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nacimiento: {//comparar con el pi breadkingbad hay que poner DataTypes.ENUM(...)
      type: DataTypes.STRING,
      allowNull: true
    },
    fecsalida: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    destino: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cantpersonas: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cantnoches: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pedidoadic: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdindb: {//sirve para llamar solo a lo que esta en bd. Esto sirve para cuando se hace una distincion en lo que esta en bd con lo que esta en la api. 
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, //esto esta seteado en true hay que hacerlo asi para que funcione
    }
  },
  { timestamps: false 
  });
};
