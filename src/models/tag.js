'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: DataTypes.STRING,
  }, {});
  Tag.associate = function(models) {
    Tag.belongsToMany(models.Event, {
      through: "EventTag",
      as: "events",
      foreignKey: "tagId",
    });
  };
  return Tag;
};