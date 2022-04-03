'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    productId: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {});
  Photo.associate = function(models) {
    Photo.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product'
    });
  };
  return Photo;
};