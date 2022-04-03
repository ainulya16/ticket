'use strict';
module.exports = (sequelize, DataTypes) => {
  const Merchant = sequelize.define('Merchant', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    coordinate: DataTypes.STRING,
    phone: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    userId: DataTypes.STRING
  }, {});
  Merchant.associate = function(models) {
    Merchant.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    Merchant.hasMany(models.Product, {
      foreignKey: 'merchantId',
      onDelete: 'cascade'
    });
  };
  return Merchant;
};