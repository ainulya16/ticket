'use strict';
module.exports = (sequelize, DataTypes) => {
  const PasarKreatif = sequelize.define('PasarKreatif', {
    productId: DataTypes.INTEGER
  }, {});
  PasarKreatif.associate = function(models) {
    PasarKreatif.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product',
    });
  };
  return PasarKreatif;
};