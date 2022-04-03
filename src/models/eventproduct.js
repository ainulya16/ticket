'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventProduct = sequelize.define('EventProduct', {
    eventId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {});
  EventProduct.associate = function(models) {
  };
  return EventProduct;
};