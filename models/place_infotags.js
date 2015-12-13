'use strict';
module.exports = function(sequelize, DataTypes) {
  var place_infoTags = sequelize.define('place_infoTags', {
    place_infoId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return place_infoTags;
};