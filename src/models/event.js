'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Event.associate = function(models) {
    Event.belongsToMany(models.Product, {
      through: "EventProduct",
      as: "products",
      foreignKey: "eventId",
    });
    Event.belongsToMany(models.Tag, {
      through: "EventTag",
      as: "tags",
      foreignKey: "eventId",
    });
    
  };
  return Event;
};