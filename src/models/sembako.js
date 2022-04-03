'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sembako = sequelize.define('Sembako', {
    name: DataTypes.STRING,
    unit: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {});
  Sembako.associate = function(models) {
  };
  return Sembako;
};