'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    merchantId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {});
  Product.associate = function(models) {
    Product.belongsTo(models.Merchant, {
      foreignKey: 'merchantId',
      as: 'merchant'
    });
    Product.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category'
    });
    Product.hasMany(models.Photo, {
      foreignKey: 'productId',
      as: 'photos',
      onDelete: 'cascade'
    });
    Product.belongsToMany(models.Event, {
      through: "EventProduct",
      as: "events",
      foreignKey: 'productId',
    });
  };
  return Product;
};