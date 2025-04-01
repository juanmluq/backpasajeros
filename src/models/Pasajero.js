const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pasajero', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, //
      allowNull: false, 
      primaryKey: true 
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: false
    },
    telefono: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nacimiento: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    fecsalida: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    destino: {
      type: DataTypes.STRING(60),
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
