'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventTag = sequelize.define('EventTag', {
    eventId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {});
  EventTag.associate = function (models) {

  };
  return EventTag;
};