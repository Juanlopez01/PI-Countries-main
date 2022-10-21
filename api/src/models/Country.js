const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id:{
      type: DataTypes.STRING(3),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/i
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    continent:{
      type: DataTypes.ENUM('Africa', 'Asia', 'Europe', 'Oceania', 'North America', 'South America', 'Antarctica'),
      allowNull: false,
      validate: {
        is: /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/i
      }
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/i
      }
    },
    sub_region:{
      type: DataTypes.STRING,
    },
    area: {
      type: DataTypes.STRING
    },
    population: {
      type: DataTypes.INTEGER
    }
  },{
    timestamps: false
  });
};
// ENUM('Africa', 'Americas', 'Asia', 'Europe', 'Oceania')